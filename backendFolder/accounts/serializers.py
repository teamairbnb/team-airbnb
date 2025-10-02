from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import CustomUser

class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = (
            "id",
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "phone_number",
            "country",
            "state",
            "address",
            "is_guest",
        )
        read_only_fields = ("id", "is_guest")


class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = CustomUser
        fields = (
            "id", "username", "email",
            "first_name", "last_name",
            "phone_number", "license_number", "license_expiry",
            "country", "state", "address",
            "is_guest",
        )        