import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from accounts.models import CustomUser
from car_inventories.models import Car
from bookings.models import Booking
from reservations.models import Reservation
from django.contrib.auth.models import AnonymousUser
from .rules import get_response, get_available_cars, get_user_bookings


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


class TestChatbots:

    def test_get_response(self):
        assert "Hi there!" in get_response("hello")
        assert "I can help with that." in get_response("booking")
        assert "Our pricing varies" in get_response("pricing")
        assert "You can reach our support team" in get_response("contact")
        assert "I'm sorry, I don't understand" in get_response("unknown")

    
    def test_get_available_cars(self, car_data):
        Car.objects.create(**car_data)
        response = get_available_cars()
        assert "Here are a few of our available cars:" in response
        assert "toyota corolla" in response.lower()

        # Test with no available cars
        Car.objects.all().delete()
        response = get_available_cars()
        assert "I'm sorry, no cars are available" in response

    # Test the get_user_bookings function
    def test_get_user_bookings(self, client, user_data, car_data):
        user = AnonymousUser()
        response = get_user_bookings(user)
        assert "Please login" in response

        # Test with authenticated user with no bookings
        user = CustomUser.objects.create_user(**user_data)
        client.force_authenticate(user=user)
        response = get_user_bookings(user)
        assert "you don't have any bookings yet" in response

        # Test with authenticated user with bookings
        car = Car.objects.create(**car_data)
        reservation = Reservation.objects.create(user=user, car=car)
        Booking.objects.create(user=user, car=car, reservation=reservation, start_date="2025-10-20", end_date="2025-10-25")
        response = get_user_bookings(user)
        assert "Here are your most recent bookings:" in response
        assert "toyota corolla" in response.lower()

    # Test the ChatbotEndpoint view
    def test_chatbot_endpoint(self, client, user_data):
        # Create a user and authenticate
        user = CustomUser.objects.create_user(**user_data)
        client.force_authenticate(user=user)

        url = reverse("chatbot_endpoint")
        data = {"message": "hello"}
        response = client.post(url, data)
        assert response.status_code == status.HTTP_200_OK
        assert "reply" in response.data
        assert "Hi there!" in response.data["reply"]