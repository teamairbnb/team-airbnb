from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user', 'first_name', 'last_name', 'phone_number']
        read_only_fields = ['id', 'created_at']