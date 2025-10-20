import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from accounts.models import CustomUser
from car_inventories.models import Car
from bookings.models import Booking
from reservations.models import Reservation
from .models import Payment, PaymentMethod, Refund


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

# Test data for creating a booking
@pytest.fixture
def booking_data(user_data, car_data):
    user = CustomUser.objects.create_user(**user_data)
    car = Car.objects.create(**car_data)
    reservation = Reservation.objects.create(user=user, car=car)
    booking = Booking.objects.create(user=user, car=car, reservation=reservation, start_date="2025-10-20", end_date="2025-10-25", total_price=10000, deposit_amount=2000)
    return user, car, reservation, booking


class TestPayments:
    def test_payment_with_dummy_card(self, client, booking_data):
        user, car, reservation, booking = booking_data
        client.force_authenticate(user=user)

        url = reverse("process-payment-dummy")
        data = {
            "booking_id": booking.id,
            "amount": 10000,
            "payment_type": "full",
            "card_number": "4242 4242 4242 4242",
            "expiry_month": 12,
            "expiry_year": 2025,
            "cvc": "123",
        }
        response = client.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Payment.objects.filter(booking=booking).exists()

    # Test payment with saved card
    def test_payment_with_saved_card(self, client, booking_data):
        user, car, reservation, booking = booking_data
        client.force_authenticate(user=user)

        payment_method = PaymentMethod.objects.create(user=user, card_brand="visa", last4="4242")

        url = reverse("process-payment-direct")
        data = {
            "booking_id": booking.id,
            "amount": 10000,
            "payment_type": "full",
            "payment_method_token": payment_method.token,
        }
        response = client.post(url, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Payment.objects.filter(booking=booking).exists()

    
    def test_list_payment_methods(self, client, user_data):
        user = CustomUser.objects.create_user(**user_data)
        client.force_authenticate(user=user)

        PaymentMethod.objects.create(user=user, card_brand="visa", last4="4242")

        url = reverse("payment-methods")
        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) > 0

    
    def test_list_payments(self, client, booking_data):
        user, car, reservation, booking = booking_data
        client.force_authenticate(user=user)

        Payment.objects.create(user=user, booking=booking, amount=10000)

        url = reverse("payment-list")
        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) > 0

    
    def test_verify_payment(self, client, booking_data):
        user, car, reservation, booking = booking_data
        client.force_authenticate(user=user)

        payment = Payment.objects.create(user=user, booking=booking, amount=10000)

        url = reverse("payments-verify", args=[payment.reference])
        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["reference"] == payment.reference

    
    def test_refund_payment(self, client, booking_data):
        user, car, reservation, booking = booking_data
        client.force_authenticate(user=user)

        payment = Payment.objects.create(user=user, booking=booking, amount=10000, status="succeeded")

        url = reverse("payments-refund", args=[payment.reference])
        data = {"amount": 5000}
        response = client.post(url, data)
        assert response.status_code == status.HTTP_200_OK
        assert Refund.objects.filter(payment=payment).exists()