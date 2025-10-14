from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Booking
from reservations.models import Reservation
from .serializers import BookingSerializer
from django.shortcuts import get_object_or_404
from django.utils import timezone
from datetime import timedelta

class CreateBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        reservation_id = request.data.get("reservation_id")
        reservation = get_object_or_404(Reservation, id=reservation_id, user=request.user)

        # Check if reservation is valid
        if reservation.status not in ["soft", "firm","booked","expired","cancelled"]:
            return Response({"error": "Invalid reservation status"}, status=status.HTTP_400_BAD_REQUEST)

        if reservation.is_expired():
            return Response({"error": "Reservation has expired"}, status=status.HTTP_400_BAD_REQUEST)

        car = reservation.car

        # Check if car is already booked
        if not car.is_available:
            return Response({"error": "Car is no longer available"}, status=status.HTTP_400_BAD_REQUEST)

        # Create booking
        booking = Booking.objects.create(
            user=request.user,
            car=car,
            reservation=reservation,
            start_date=timezone.now(),
            end_date=timezone.now() + timedelta(days=3)  # example duration
        )

        # Update reservation and car
        reservation.status = "booked"
        reservation.save()

        car.is_available = False
        car.availability_status = "rented"
        car.save()
        serializer = BookingSerializer(booking)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

        # return Response(
        #     {"message": "Booking confirmed", "booking_id": booking.id},
        #     status=status.HTTP_201_CREATED
        # )
