from rest_framework  import serializers
from .models import Reservation


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ["car",'status','expires_at','created_at']
        read_only_fields =["status","expires_at","created_at"]