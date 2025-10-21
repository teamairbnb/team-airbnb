from rest_framework  import serializers
from .models import Reservation
from car_inventories.models import Car
from accounts.models import CustomUser
from car_inventories.serializers import CarSerializer



class ReservationSerializer(serializers.ModelSerializer):
    car = CarSerializer(read_only=True)
    car_id = serializers.PrimaryKeyRelatedField(
        queryset=Car.objects.all(), source='car', write_only=True
    )
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(), source='user', write_only=True
    )

    class Meta:
        model = Reservation
        fields = ["id", "car", "car_id","status", "expires_at", "created_at"]
        read_only_fields = ["id", "status", "expires_at", "created_at"]