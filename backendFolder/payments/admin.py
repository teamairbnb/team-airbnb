from django.contrib import admin
from .models import PaymentMethod, Payment, Refund


@admin.register(PaymentMethod)
class PaymentMethodAdmin(admin.ModelAdmin):
	list_display = ("user", "card_brand", "last4", "is_default", "created_at")
	search_fields = ("user__email", "last4", "token")


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
	list_display = ("id", "user", "amount", "currency", "status", "created_at")
	search_fields = ("user__email", "id")


@admin.register(Refund)
class RefundAdmin(admin.ModelAdmin):
	list_display = ("id", "payment", "amount", "status", "created_at")
	search_fields = ("payment__id",)
