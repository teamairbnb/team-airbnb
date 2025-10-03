from django.contrib import admin
from .models import Car

# Register your models here.

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('make', 'model', 'year', 'car_type', 'color', 'availability_status', 'is_active', 'is_available')
    list_filter = ('make', 'model', 'car_type', 'availability_status', 'is_active', 'is_available')
    search_fields = ('make', 'model', 'year', 'color')