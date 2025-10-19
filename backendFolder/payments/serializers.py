import datetime
from rest_framework import serializers
from .models import PaymentMethod, Payment
from bookings.models import Booking


def check_expiry_month(value):
    if not 1 <= int(value) <= 12:
        raise serializers.ValidationError("Invalid expiry month.")


def check_expiry_year(value):
    today = datetime.datetime.now()
    if not int(value) >= today.year:
        raise serializers.ValidationError("invalid expiry year")



def check_cvc(value):
    cvc_str =  str(value)
    if not cvc_str.isdigit() or not 3 <= len(cvc_str) <= 4:
        raise serializers.ValidationError("Invalid CVC number.")


def check_card_number(value):
    # Basic validation: numeric + length + Luhn checksum
    num = str(value).replace(" ", "")
    if not num.isdigit() or not 13 <= len(num) <= 19:
        raise serializers.ValidationError("Invalid card number length or format.")

    # Luhn algorithm
    def luhn_checksum(card_number: str) -> bool:
        total = 0
        reverse_digits = card_number[::-1]
        for i, ch in enumerate(reverse_digits):
            digit = int(ch)
            if i % 2 == 1:
                digit *= 2
                if digit > 9:
                    digit -= 9
            total += digit
        return total % 10 == 0

    if not luhn_checksum(num):
        raise serializers.ValidationError("Invalid card number.")


class DirectPaymentCreateSerializer(serializers.Serializer):
    # This serializer is used when user pays with a saved card
    booking_id = serializers.IntegerField(required=True)
    payment_method_token = serializers.CharField(max_length=128, required=True)
    amount = serializers.IntegerField(min_value=1)
    payment_type = serializers.ChoiceField(choices=['deposit', 'full'], default="full")
    metadata = serializers.JSONField(required=False)

    def validate_payment_method_token(self, value):

        """Ensure that token exists and belongs to user"""
        try:
            PaymentMethod.objects.get(token=value)
        except PaymentMethod.DoesNotExist:
            raise serializers.ValidationError("Invalid payment method token")
        return value

    def validate(self, data):
        """Validate expiry date and amount against booking"""
        #Check if card is not expired
        today = datetime.datetime.now()
        expiry_date = datetime.datetime(
            year=data["expiry_year"], month=data['expiry_month'], day=1
        )
        if expiry_date < today:
            raise serializers.ValidationError("Card has expired")
        
    
        #  Validate booking exists and amount matches


        try:
            booking = Booking.objects.get(id=data["booking_id"])
        except Booking.DoesNotExist:
            raise serializers.ValidationError('Booking not found')
        

        #  Check if amount matches booking
        if data["payment_type"] == 'full':
            if data["amount"] != booking.total_price:
                raise serializers.ValidationError(
                    f"Full payment must be {booking.total_price} cents"
                    f"Full payment amount must be {booking.total_price} cents."
                )
        elif data['payment_type'] == 'deposit':
            if data['amount'] >= booking.total_price:
                if data['amount'] != booking.deposit_amount:
                    raise serializers.ValidationError(
                        "Deposit must be less than total price"
                        f"Deposit amount must be {booking.deposit_amount} cents."
                )

        data['booking'] = booking
        return data


class DirectPaymentDummySerializer(serializers.Serializer):
    # Accept dummy card fields, validate them, do not store raw card data
    # Card details
    card_number = serializers.CharField(max_length=32, required=True, validators=[check_card_number])
    expiry_month = serializers.IntegerField(required=True, validators=[check_expiry_month])
    expiry_year = serializers.IntegerField(required=True, validators=[check_expiry_year])
    cvc = serializers.CharField(max_length=4, required=True, validators=[check_cvc])

    # payment details
    booking_id = serializers.IntegerField(required=True)
    amount = serializers.IntegerField(min_value=1)
    payment_type = serializers.ChoiceField(choices=['deposit', 'full'], default="full")
    save_method = serializers.BooleanField(default=False)

    def validate(self, data):
        """Validate expiry date and amount against booking"""
        #Check if card is not expired
        today = datetime.datetime.now()
        expiry_date = datetime.datetime(
            year=data["expiry_year"], month=data['expiry_month'], day=1
        )
        if expiry_date < today:
            raise serializers.ValidationError("Card has expired")
        
    
        #  Validate booking exists and amount matches


        try:
            booking = Booking.objects.get(id=data["booking_id"])
        except Booking.DoesNotExist:
            raise serializers.ValidationError('Booking not found')
        

        #  Check if amount matches booking
        if data["payment_type"] == 'full':
            if data["amount"] != booking.total_price:
                raise serializers.ValidationError(
                    f"Full payment must be {booking.total_price} cents"
                    f"Full payment amount must be {booking.total_price} cents."
                )
        elif data['payment_type'] == 'deposit':
            if data['amount'] >= booking.total_price:
                if data['amount'] != booking.deposit_amount:
                    raise serializers.ValidationError(
                        "Deposit must be less than total price"
                        f"Deposit amount must be {booking.deposit_amount} cents."
                )

        #  Store booking for use in view
        data['booking'] = booking
        return data



class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ["id", "token", "card_brand", "last4", "exp_month", "exp_year", "is_default", "created_at"]



class PaymentSerializer(serializers.ModelSerializer):
    card_last4 = serializers.CharField(source='payment_method.last4', read_only=True)
    card_brand = serializers.CharField(source='payment_method.card_brand', read_only=True)
    
    class Meta:
        model = Payment
        fields = [
            "id", "reference", "user", "booking", "amount", 
            "status", "type", "card_last4", "card_brand", "created_at"
        ]


class RefundSerializer(serializers.Serializer):
    payment_id = serializers.IntegerField()
    amount = serializers.IntegerField(min_value=1, required=False)
    reason = serializers.CharField(max_length=255, required=False)

    def validate_payment_id(self, value):
        try:
         payment = Payment.objects.get(id=value)
        except Payment.DoesNotExist:
         raise serializers.ValidationError("Payment not found")
    
        if payment.status != 'succeeded':
            raise serializers.ValidationError("Can only refund succeeded payments")
    
        return value
    

    def validate(self, data):            
            payment = Payment.objects.get(id=data['payment_id'])
            amount = data.get('amount', payment.amount)
    
            if amount > payment.refundable_amount():
                raise serializers.ValidationError(
                    f"Cannot refund {amount}. Only {payment.refundable_amount()} available.")
    
            data['amount'] = amount
            return data


class PaymentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ["reference", "user", "booking", "amount", "card_last4", "currency", "status", "type", "metadata", "created_at", "payment_method"]


class RefundByReferenceSerializer(serializers.Serializer):
    amount = serializers.IntegerField(min_value=1, required=False)
    reason = serializers.CharField(max_length=255, required=False)
