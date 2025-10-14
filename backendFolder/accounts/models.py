from django.db import models
from django.contrib.auth.models import AbstractUser
# from django.contrib.auth.models import User

# User authentication system

# class User(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     first_name = models.CharField(max_length=30)
#     last_name = models.CharField(max_length=30)
#     phone_number = models.CharField(max_length=15, unique=True)
#     license_number = models.CharField(max_length=20, unique=True, null=True, blank=True)
#     license_expiry = models.DateField(null=True, blank=True)
#     country = models.CharField(max_length=50, null=True, blank=True)
#     state = models.CharField(max_length=50, null=True, blank=True)
#     address = models.CharField(max_length=255, null=True, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)


#     def __str__(self):
#         return f"{self.first_name} {self.last_name}"


class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, unique=True)
    license_number = models.CharField(max_length=20, unique=True, null=True, blank=True)
    license_expiry = models.DateField(null=True, blank=True)
    country = models.CharField(max_length=50, null=True, blank=True)
    state = models.CharField(max_length=50, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    is_guest = models.BooleanField(default=False) # flag for guest users
    avatar = models.TextField()

    def __str__(self):
        return self.username
