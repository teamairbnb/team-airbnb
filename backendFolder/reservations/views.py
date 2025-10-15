from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.utils import timezone
from .models import Reservation
from accounts.models import CustomUser
from car_inventories.models import Car
from .serializers import ReservationSerializer
from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404
from accounts.permissions import IsBusinessOwner


class CreateReservationView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(request=ReservationSerializer, responses=ReservationSerializer)
    def post(self, request):
        serializer = ReservationSerializer(data=request.data)

        if serializer.is_valid():
            car = serializer.validated_data['car']

            # Check for existing reservations
            existing_res = Reservation.objects.filter(
                car=car,
                status__in=['soft', 'firm']
            ).first()

            if existing_res:
                if existing_res.status == 'firm':
                    return Response({"error": "Car already firmly reserved"}, status=status.HTTP_400_BAD_REQUEST)

                if existing_res.status == 'soft':
                    if request.user.is_guest:
                        return Response({"error": "Car temporarily reserved by another guest"}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        # Normal user overrides guest reservation
                        existing_res.status = 'cancelled'
                        existing_res.save()

            # Create new reservation
            reservation = Reservation.objects.create(
                user=request.user,
                car=car,
                status="soft" if request.user.is_guest else "firm"
            )

            respond_data = ReservationSerializer(reservation).data
            return Response({"message": respond_data}, status=status.HTTP_201_CREATED)

        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ViewReservationView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(responses=ReservationSerializer(many=True))
    def get(self, request):
        user = request.user
        reservations = Reservation.objects.filter(user=user)

        # Handle expired guest reservations
        for reservation in reservations:
            if reservation.is_expired() and reservation.status == 'soft':
                reservation.status = 'expired'
                reservation.save()

        serializer = ReservationSerializer(reservations, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class DeleteReservationView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        user = request.user
        reservation = get_object_or_404(Reservation, id=pk, user=user)
        reservation.delete()

        return Response({"message": "Reservation deleted"}, status=status.HTTP_200_OK)
    

 # Admin can cancel and reassign existing reservations


class AdminManageReservationView(APIView):
    permission_classes = [IsBusinessOwner]

    # View all reservations
    def get(self, request):
        reservations = Reservation.objects.all().select_related('user', 'car')
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Cancel an existing reservation
    def delete(self, request, pk):
        reservation = get_object_or_404(Reservation, id=pk)
        reservation.status = 'cancelled'
        reservation.car.is_available = True
        reservation.car.availability_status = 'available'
        reservation.car.save()
        reservation.save()
        return Response({"message": "Reservation cancelled successfully"}, status=status.HTTP_200_OK)

    # Reassign reservation to another user
    def patch(self, request, pk):
        reservation = get_object_or_404(Reservation, id=pk)
        new_user_id = request.data.get("new_user_id")

        if not new_user_id:
            return Response({"error": "new_user_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        new_user = get_object_or_404(CustomUser, id=new_user_id)
        reservation.user = new_user
        reservation.save()
        return Response({"message": f"Reservation reassigned to {new_user.username}"}, status=status.HTTP_200_OK)

    # Create a reservation manually
    def post(self, request):
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            car = serializer.validated_data['car']
            user = serializer.validated_data['user']
            status_type = serializer.validated_data.get('status', 'firm')

            # Create directly
            reservation = Reservation.objects.create(
                user=user,
                car=car,
                status=status_type
            )
            car.is_available = False
            car.save()

            return Response(ReservationSerializer(reservation).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


