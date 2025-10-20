import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import CustomUser
import os
import uuid
from django.core.files.uploadedfile import SimpleUploadedFile


@pytest.fixture
def client():
    return APIClient()

pytestmark = pytest.mark.django_db


@pytest.fixture
def regular_user_data():
    return {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "testpassword",
        "first_name": "Test",
        "last_name": "User",
        "phone_number": "1234567890",
    }


@pytest.fixture
def business_owner_data():
    return {
        "username": "businessowner",
        "email": "businessowner@example.com",
        "password": "testpassword",
        "first_name": "Business",
        "last_name": "Owner",
        "phone_number": "0987654321",
    }


class TestAccounts:
    # Test creating a regular user
    def test_create_regular_user(self, client, regular_user_data):
        url = reverse("business-owner-signup")
        response = client.post(url, regular_user_data)
        assert response.status_code == status.HTTP_201_CREATED
        assert CustomUser.objects.filter(username=regular_user_data["username"]).exists()

    # Test creating a business owner
    def test_create_business_owner(self, client, business_owner_data):
        url = reverse("business-owner-signup")
        response = client.post(url, business_owner_data)
        assert response.status_code == status.HTTP_201_CREATED
        user = CustomUser.objects.get(username=business_owner_data["username"])
        assert user.is_business_owner is True

    # Test creating a guest user
    def test_create_guest_user(self, client):
        url = reverse("guest-signup")
        response = client.post(url)
        assert response.status_code == status.HTTP_200_OK
        assert "access" in response.data
        assert "refresh" in response.data
        guest_user = CustomUser.objects.get(username=response.data["username"])
        assert guest_user.is_guest is True

 
    def test_user_login(self, client, regular_user_data):
        CustomUser.objects.create_user(**regular_user_data)
        url = reverse("jwt-create")
        
        response = client.post(url, {"username": regular_user_data["username"], "password": regular_user_data["password"]})
        assert response.status_code == status.HTTP_200_OK
        assert "access" in response.data
        assert "refresh" in response.data

    
    def test_get_user_profile(self, client, regular_user_data):
        user = CustomUser.objects.create_user(**regular_user_data)
        client.force_authenticate(user=user)
        url = reverse("user-profile")
        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["username"] == regular_user_data["username"]

    
    def test_update_user_profile(self, client, regular_user_data):
        user = CustomUser.objects.create_user(**regular_user_data)
        client.force_authenticate(user=user)
        url = reverse("update-user-profile")
        
        # Create a dummy image for testing avatar upload
        image_name = f"{uuid.uuid4()}.jpg"
        image_path = image_name
        with open(image_path, "wb") as f:
            f.write(os.urandom(1024))

        with open(image_path, "rb") as f:
            image_file = SimpleUploadedFile(image_name, f.read(), content_type="image/jpeg")

        update_data = {
            "first_name": "Updated",
            "last_name": "Name",
            "avatar": image_file,
        }
        
        response = client.put(url, update_data, format='multipart')
        
        
        os.remove(image_path)
        
        assert response.status_code == status.HTTP_200_OK
        user.refresh_from_db()
        assert user.first_name == "Updated"
        assert user.last_name == "Name"

    # Test changing user password
    def test_change_password(self, client, regular_user_data):
        user = CustomUser.objects.create_user(**regular_user_data)
        client.force_authenticate(user=user)
        url = reverse("change-password")
        password_data = {
            "current_password": regular_user_data["password"],
            "new_password": "newtestpassword",
        }
        response = client.put(url, password_data)
        assert response.status_code == status.HTTP_200_OK
        user.refresh_from_db()
        assert user.check_password("newtestpassword") is True