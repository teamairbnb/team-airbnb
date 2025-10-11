from django.db import models
from django.conf import settings
from django.utils import timezone
import uuid
from django.core.validators import MinValueValidator
import secrets
from django.db.models import Sum
from django.core.exceptions import ValidationError

# Create your models here.



class PaymentMethod(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # A simple token representing the stored payment method
    token = models.CharField(max_length=64, unique=True, default=lambda: uuid.uuid4().hex)
    card_brand = models.CharField(max_length=50, blank=True)
    last4 = models.CharField(max_length=4, blank=True)
    exp_month = models.PositiveSmallIntegerField(null=True, blank=True)
    exp_year = models.PositiveSmallIntegerField(null=True, blank=True)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return f"{self.user} - {self.card_brand} ****{self.last4} ({self.token})"


class Payment(models.Model):
    STATUS_CHOICES = [
        ("created", "Created"),
        ("authorized", "Authorized"),
        ("succeeded", "Succeeded"),
        ("failed", "Failed"),
    ]

    TYPE_CHOICES = [
        ("deposit", "Deposit"),
        ("full", "Full"),
        ("refund", "Refund"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    """
    # I WROTE THIS TWO LINES TO LINK PAYMENT TO BOOKING AND RENTAL, SEDAN IS THE ONE HANDLING THE BOOKING/RESERVATION APP, SO ANYTHING HE CALLS HIS MODEL WILL BE USED HERE. 

    # booking = models.ForeignKey('bookings.Booking', on_delete=models.CASCADE, related_name='payments')
    # rental = models.ForeignKey('rentals.Rental', on_delete=models.CASCADE, related_name='payments')
    """
    
    reference = models.CharField(max_length=64, unique=True, default=lambda: uuid.uuid4().hex)
    client_secret = models.CharField(max_length=128, unique=True, default=lambda: secrets.token_urlsafe(32))
    amount = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    currency = models.CharField(max_length=5, default="usd", editable=False)
    payment_method = models.ForeignKey(PaymentMethod, null=True, blank=True, on_delete=models.SET_NULL)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="created")
    type = models.CharField(max_length=30, choices=TYPE_CHOICES, default="full")
    metadata = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def clean(self):    
        if self.booking and self.booking.status in ['cancelled', 'completed']:
            raise ValidationError("Cannot create payment for cancelled or completed bookings")

    def refundable_amount(self) -> int:
        refunded = self.refund_set.filter(status="succeeded").aggregate(
            total=Sum('amount')
        )['total'] or 0
    
        return max(0, self.amount - refunded)

    def __str__(self) -> str:
            return f"Payment {self.reference} - {self.user} - {self.amount} {self.currency} ({self.status})"
    



class Refund(models.Model):
    STATUS = [
        ("pending", "Pending"),
        ("succeeded", "Succeeded"),
        ("failed", "Failed"),
    ]

    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    reason = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=30, choices=STATUS, default="pending")
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return f"Refund {self.id} for payment {self.payment_id} - {self.amount} ({self.status})"
