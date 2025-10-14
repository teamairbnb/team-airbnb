from django.db import models
from accounts.models import CustomUser
from car_inventories.models import Car
from reservations.models import Reservation

BOOKING_STATUS = [
    ('pending', 'Pending'),
    ('confirmed', 'Confirmed'),
    ('cancelled', 'Cancelled'),
    ('completed', 'Completed'),
]
class Booking(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    reservation = models.OneToOneField(Reservation, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=BOOKING_STATUS, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    
    def __str__(self):
        return f"Booking for {self.user} - {self.car}"
