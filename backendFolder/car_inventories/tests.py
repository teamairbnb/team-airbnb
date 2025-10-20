import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from accounts.models import CustomUser
from .models import Car


@pytest.fixture
def client():
    return APIClient()

pytestmark = pytest.mark.django_db

@pytest.fixture
def business_owner_data():
    return {
        "username": "businessowner",
        "email": "businessowner@example.com",
        "password": "testpassword",
        "first_name": "Business",
        "last_name": "Owner",
        "phone_number": "0987654321",
        "is_business_owner": True,
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


class TestCarInventories:
    def test_admin_operations(self, client, business_owner_data, car_data):
        business_owner = CustomUser.objects.create_user(**business_owner_data)
        client.force_authenticate(user=business_owner)

        # Create a new car
        url = reverse("admin-cars-list")
        response = client.post(url, car_data)
        assert response.status_code == status.HTTP_201_CREATED
        car_id = response.data["id"]

        # Retrieve the car
        url = reverse("admin-cars-detail", args=[car_id])
        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["make"] == car_data["make"]

        # Update the car
        update_data = {"color": "black"}
        response = client.patch(url, update_data)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["color"] == "black"

        # Delete the car
        response = client.delete(url)
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not Car.objects.filter(id=car_id).exists()


    def test_user_operations(self, client, car_data):
        Car.objects.create(**car_data)

        # List available cars
        url = reverse("user-cars-list")
        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) > 0

        # Retrieve an available car
        car_id = response.data['results'][0]["id"]
        url = reverse("user-cars-detail", args=[car_id])
        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["id"] == car_id