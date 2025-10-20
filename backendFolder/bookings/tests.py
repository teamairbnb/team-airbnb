import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from accounts.models import CustomUser
from car_inventories.models import Car
from reservations.models import Reservation
from .models import Booking


@pytest.fixture
def client():
    return APIClient()

pytestmark = pytest.mark.django_db

@pytest.fixture
def user_data():
    return {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "testpassword",
        "first_name": "Test",
        "last_name": "User",
        "phone_number": "1234567890",
    }


@pytest.fixture
def car_data():
    return {
        "make": "toyota",
        "model": "corolla",
        "year": 2023,
        "car_type": "sedan",
        "color": "white",
        "seats": 5,
        "transmission": "automatic",
        "fuel_type": "petrol",
        "hourly_rate": 100.00,
        "deposit_amount": 500.00,
        "is_available": True,
    }


class TestBookings:

    def test_create_booking(self, client, user_data, car_data):
        user = CustomUser.objects.create_user(**user_data)
        client.force_authenticate(user=user)

        car = Car.objects.create(**car_data)

        # Create a reservation
        reservation = Reservation.objects.create(
            user=user,
            car=car,
            status="soft",
        )

        # Create a booking from the reservation
        url = reverse("create_booking")
        data = {"reservation_id": reservation.id}
        response = client.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Booking.objects.filter(reservation=reservation).exists()

        
        reservation.refresh_from_db()
        assert reservation.status == "booked"


        car.refresh_from_db()
        assert car.is_available is False