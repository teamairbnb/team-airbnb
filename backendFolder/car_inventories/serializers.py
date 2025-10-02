from rest_framework import serializers
from .models import Car
from drf_spectacular.utils import extend_schema_serializer



@extend_schema_serializer(
    examples=[
        {
            "make": "toyota",
            "model": "corolla",
            "year": 2020,
            "car_type": "sedan",
            "color": "blue",
            "seats": 5,
            "transmission": "automatic",
            "fuel_type": "petrol",
            "has_ac": True,
            "has_gps": False,
            "hourly_rate": "20.00",
            "deposit_amount": "100.00",
            "is_available": True,
            "is_active": True,
            "availability_status": "available",
            "created_at": "2025-10-02T12:00:00Z",
            "updated_at": "2025-10-02T12:00:00Z"
        }
    ]
)
class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'