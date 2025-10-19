from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import (
    PaymentMethodSerializer,
    PaymentDetailSerializer,
    RefundSerializer,
    DirectPaymentCreateSerializer,
    DirectPaymentDummySerializer, PaymentSerializer

)
from .models import PaymentMethod, Payment, Refund
from django.core.mail import send_mail
from django.conf import settings
import uuid
from bookings.models import Booking




def send_payment_confirmation_email(payment: Payment):
    """Send a simple confirmation email to the user associated with the payment.
    Uses Django EMAIL settings (DEFAULT_FROM_EMAIL)."""
    user = payment.user
    to_email = getattr(user, "email", None)
    if not to_email:
        return

    subject = f"Payment confirmation — {payment.reference}"
    amount_display = f"${payment.amount / 100:.2f}"
    message = (
        f"Hello {getattr(user, 'first_name', '')},\n\n"
        f"Your payment with reference {payment.reference} for {amount_display} has been received and confirmed.\n\n"
        f"Status: {payment.status}\n"
        "Thank you for using our service.\n"
    )

    send_mail(subject, message, getattr(settings, 'DEFAULT_FROM_EMAIL', None), [to_email], fail_silently=True)



class DirectProcessPaymentView(APIView):
    """Single-call payment that accepts only a tokenized payment method reference."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = DirectPaymentCreateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        booking_id = data["booking_id"]
        amount = data["amount"]
        payment_type = data["payment_type"]
        token = data.get["payment_method_token"]
        

        try:
            payment_method = PaymentMethod.objects.get(token=token, user=request.user)
        except PaymentMethod.DoesNotExist:
            return Response({"detail": "Unknown or unauthorized payment token."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Validate booking exists and belong to user
        booking = get_object_or_404(Booking, id=booking_id, user=request.user)

        payment = Payment.objects.create(
            user=request.user,
            booking_id=booking,
            amount=amount,
            payment_method=payment_method,
            status="succeeded",
            type=payment_type,
        )

        try:
            send_payment_confirmation_email(payment)
        except Exception:
            pass

        return Response(PaymentSerializer(payment).data,
        status=status.HTTP_201_CREATED)


class DirectProcessDummyView(APIView):
    """Accept dummy card details, validate them, do not store raw data, optionally save masked token."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = DirectPaymentDummySerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        # Payment details
        booking_id = data["booking_id"]
        amount = data["amount"]
        payment_type = data["payment_type"]
        save_card = data.get("save_method", False)

        # Card details
        card_number = data.get("card_number")
        last4 = card_number.replace(" ", "")[-4:]
        exp_month = data.get("expiry_month")
        exp_year = data.get("expiry_year")
        card_brand = self.detect_card_brand(card_number)


        # Validate if booking exists and belongs to user
        booking = get_object_or_404(Booking, id=booking_id, user=request.user)
        if booking.status not in ['pending', 'confirmed']:
            return Response(
                {"detail": "Booking cannot be paid"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        payment_method = None
        if save_card:
            payment_method = PaymentMethod.objects.create(
                user=request.user,
                token=uuid.uuid4().hex,
                card_brand=card_brand,
                last4=last4,
                exp_month=exp_month,
                exp_year=exp_year,
                is_default=False
            )

        # payments record
        payment = Payment.objects.create(
            user=request.user,
            amount=amount,
            payment_method=payment_method,
            status="succeeded",
            type=payment_type,
        )

        try:
            send_payment_confirmation_email(payment)
        except Exception:
            pass

        response_data = PaymentSerializer(payment).data
        response_data['message'] = "Payment successful!"
        
        return Response(response_data, status=status.HTTP_201_CREATED)
    
    @staticmethod
    def detect_card_brand(card_number: str) -> str:
        """Detect card brand from card number"""
        num = card_number.replace(" ", "")
        
        if num.startswith('4'):
            return 'Visa'
        elif num.startswith(('51', '52', '53', '54', '55')):
            return 'Mastercard'
        elif num.startswith(('34', '37')):
            return 'American Express'
        elif num.startswith('6'):
            return 'Discover'
        else:
            return 'Unknown'



class VerifyPaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, reference: str):
        try:
            payment = Payment.objects.get(reference=reference, user=request.user)
        except Payment.DoesNotExist:
            return Response({"detail": "Payment not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = PaymentSerializer(payment)
        return Response(serializer.data)



class PaymentMethodListView(APIView):  
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        methods = PaymentMethod.objects.filter(user=request.user)
        serializer = PaymentMethodSerializer(methods, many=True)
        return Response(serializer.data)
    

class ListPaymentsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        payments = Payment.objects.filter(user=request.user).order_by("-created_at")
        serializer = PaymentDetailSerializer(payments, many=True)
        return Response(serializer.data)


class PaymentDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, reference: str):
        try:
            payment = Payment.objects.get(reference=reference, user=request.user)
        except Payment.DoesNotExist:
            return Response({"detail": "Payment not found."}, status=status.HTTP_404_NOT_FOUND)

        from .serializers import PaymentDetailSerializer

        serializer = PaymentDetailSerializer(payment)
        return Response(serializer.data)


class RefundByReferenceView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, reference: str):
        from .serializers import RefundByReferenceSerializer

        try:
            payment = Payment.objects.get(reference=reference, user=request.user)
        except Payment.DoesNotExist:
            return Response({"detail": "Payment not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = RefundByReferenceSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        amount = data.get("amount") or payment.refundable_amount()

        if amount <= 0 or amount > payment.refundable_amount():
            return Response({"detail": "Invalid refund amount."}, status=status.HTTP_400_BAD_REQUEST)

        refund = Refund.objects.create(payment=payment, amount=amount, reason=data.get("reason", ""), status="succeeded")

        payment.refundable_amount()

        return Response({"refund_id": refund.id, "status": refund.status}, status=status.HTTP_200_OK)


class RefundView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = RefundSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        payment = get_object_or_404(Payment, pk=data["payment_id"], user=request.user)
        amount = data.get("amount") or payment.refundable_amount()

        if amount <= 0 or amount > payment.refundable_amount():
            return Response({"detail": "Invalid refund amount."}, status=status.HTTP_400_BAD_REQUEST)

        refund = Refund.objects.create(payment=payment, amount=amount, reason=data.get("reason", ""), status="succeeded")

        # update payment status
        payment.refundable_amount()
        return Response({"refund_id": refund.id, "status": refund.status}, status=status.HTTP_200_OK)
