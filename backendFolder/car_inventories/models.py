from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
import datetime
from cloudinary.models import CloudinaryField



CAR_MAKE_CHOICES = [
    ('toyota', 'Toyota'),
    ('honda', 'Honda'),
    ('ford', 'Ford'),
    ('bmw', 'BMW'),
    ('mercedes', 'Mercedes'),
]

CAR_MODEL_CHOICES = [
    ('corolla', 'Corolla'),
    ('civic', 'Civic'),
    ('mustang', 'Mustang'),
    ('x5', 'X5'),
    ('c-class', 'C-Class'),
]


CAR_TYPE_CHOICES = [
    ('suv', 'SUV'),
    ('sedan', 'Sedan'),
    ('hatchback', 'Hatchback'),
    ('coupe', 'Coupe'),
    ('convertible', 'Convertible'),
]

TRANSMISSION_TYPE_CHOICES = [
    ('automatic', 'Automatic'),
    ('manual', 'Manual'),
]

FUEL_TYPE_CHOICES = [
    ('petrol', 'Petrol'),
    ('diesel', 'Diesel'),
    ('electric', 'Electric'),
    ('hybrid', 'Hybrid'),
]

AVAILABILITY_STATUS_CHOICES = [
    ('available', 'Available'),
    ('rented', 'Rented'),
    ('maintenance', 'Maintenance'),
    ('unavailable', 'Unavailable'),
]

current_year = datetime.datetime.now().year

class Car(models.Model):
    make = models.CharField(max_length=50, choices=CAR_MAKE_CHOICES, db_index=True)
    model = models.CharField(max_length=50, choices=CAR_MODEL_CHOICES, db_index=True)
    year = models.PositiveIntegerField(db_index=True, validators=[
        MinValueValidator(2000),
        MaxValueValidator(current_year + 1)
    ])
    car_type = models.CharField(max_length=50, choices=CAR_TYPE_CHOICES, db_index=True)
    color = models.CharField(max_length=30, db_index=True)
    seats = models.PositiveIntegerField(db_index=True)
    transmission = models.CharField(max_length=20, choices=TRANSMISSION_TYPE_CHOICES, db_index=True)
    fuel_type = models.CharField(max_length=20, choices=FUEL_TYPE_CHOICES, db_index=True)
    has_ac = models.BooleanField(default=True, db_index=True)
    has_gps = models.BooleanField(default=False, db_index=True)
    hourly_rate = models.DecimalField(max_digits=8, decimal_places=2)
    deposit_amount = models.DecimalField(max_digits=8, decimal_places=2)
    is_available = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    availability_status = models.CharField(max_length=20, choices=AVAILABILITY_STATUS_CHOICES, default='available')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    images = CloudinaryField('images')

    def __str__(self):
        return f"{self.make} {self.model} ({self.year})"
    
