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
    total_price = models.PositiveIntegerField(help_text="Total price in cents", default=0)
    deposit_amount = models.PositiveIntegerField(help_text="Deposit amount in cents", default=0)
    status = models.CharField(max_length=20, choices=BOOKING_STATUS, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    
    def __str__(self):
        return f"Booking for {self.user} - {self.car}"
