from django.db import models
from django.utils import timezone
from datetime import timedelta
from accounts.models import CustomUser
from car_inventories.models import Car

STATUS_CHOICES = [
    ('soft','Soft Reservation'),
    ('firm','Firm Reservation'),
    ('cancelled','Cancelled'),
    ('expired','Expired'),
]
class Reservation(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name="reservations")
    car = models.ForeignKey(Car,on_delete=models.CASCADE,related_name="reservations")
    status=models.CharField(max_length=50,choices=STATUS_CHOICES,default='soft')
    expires_at = models.DateTimeField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True) 

    def is_expired(self):
        return self.expires_at and timezone.now() > self.expires_at
    
    def save(self, *args, **kwargs):
        # Auto-handle expiry time for guests
        if  self.user.is_guest and not self.expires_at:
            # guest reservations expires in 3 days
            self.expires_at = timezone.now() + timedelta(days=3)
        super().save(*args,**kwargs)

    def __str__(self):
        return f"{self.user.username} reserved {self.car}"        
