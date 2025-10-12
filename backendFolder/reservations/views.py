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

class CreateReservationView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(request=ReservationSerializer, responses=ReservationSerializer)
    def post(self,request):
        serializer = ReservationSerializer(data=request.data)

        if serializer.is_valid():
            car = serializer.validated_data['car']

            # check for existing reservations 

            existing_res = Reservation.objects.filter(
                car= car,
                status__in=['soft','firm']
            ).first()

            if existing_res:
                if existing_res.status == 'firm':
                    return Response({"error":"Car already firmly reserved"}, status=status.HTTP_400_BAD_REQUEST)

                if existing_res.status == 'soft':
                    if request.user.is_guest:
                        return Response({"errors":"Car already temporarily reserved by another guest user"}) 
                    else:
                        existing_res.status = 'cancelled'
                        existing_res.save()
                        reservation = Reservation.objects.create(
                            user = request.user,
                            car = car,
                            status = 'firm'
                        )
                        car.is_available = False
                        car.availability_status = 'rented'
                        car.save()
                        respond_data = ReservationSerializer(reservation).data
                        return Response({"message":respond_data},status=status.HTTP_201_CREATED)
                    
                return Response({"errors":"Car already reserved"},status=status.HTTP_400_BAD_REQUEST)

            # create new reservation 
            reservation = Reservation.objects.create(
                user=request.user,
                car=car,
                status="soft" if request.user.is_guest else "firm"
            ) 
            car.is_available= False
            car.availability_status ='rented'
            car.save()
 


            respond_data = ReservationSerializer(reservation).data
            return Response({"message":respond_data},status=status.HTTP_201_CREATED)
        return Response({"errors":serializer.errors},status=status.HTTP_400_BAD_REQUEST)
    

class ViewReservationView(APIView):
    permission_classes = [IsAuthenticated]
    @extend_schema(responses=ReservationSerializer(many=True))
    def get(self, request):
        profile = CustomUser.objects.get(id=request.user.id)
        reservations = Reservation.objects.filter(user=profile)
        for reservation in reservations:
            if reservation.is_expired() and reservation.status == 'soft':
                reservation.status = 'expired'
                reservation.car.is_available = True
                reservation.car.availability_status = 'available'
                reservation.car.save()
                reservation.save()
        serializer = ReservationSerializer(reservations,many=True)
        return Response({"data":serializer.data},status=status.HTTP_200_OK)

class DeleteReservationView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self,request,pk):
        profile= CustomUser.objects.get(id=request.user.id)
        try:
            reservation=get_object_or_404(Reservation, id=pk, user=profile)
        except:
            return Response({"error":"No matching reservation in the database"},status=status.HTTP_400_BAD_REQUEST)
        
        reservation.delete()
        reservation.car.is_available = True
        reservation.car.availability_status='available'
        reservation.car.save()
        return Response({"message":"Reservation Deleted"},status=status.HTTP_200_OK)     
       
