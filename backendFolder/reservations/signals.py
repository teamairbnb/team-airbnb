from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Reservation
from notifications.models import Notification

print("✅ Reservations signals loaded!")  # Debug line to confirm Django loaded this file

@receiver(post_save, sender=Reservation)
def notify_guest_on_override(sender, instance, **kwargs):
    print(f"🚀 Signal triggered for reservation ID {instance.id}, status: {instance.status}")

    if instance.status == 'cancelled' and instance.user.is_guest:
        print(f"✅ Creating notification for {instance.user.username}")
        Notification.objects.create(
            user=instance.user,
            message=f"Your reservation for {instance.car} has been overridden by another user."
        )
