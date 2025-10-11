from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import CustomUser
from .serializers import CustomUserSerializer
import uuid
from django.utils.crypto import get_random_string
from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema
from car_rental_app.config import supabase


@extend_schema(request=CustomUserSerializer, responses=CustomUserSerializer)
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = CustomUserSerializer(request.user)
        return Response(serializer.data)


class UpdateUserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        image=request.FILES["avatar"]
        res = supabase.storage.from_("airbnb users").upload(
            f"images/{image.name}",
            image.read(),
            {"content-type":image.content_type}
        )

        image_url = supabase.storage.from_("airbnb users").get_public_url(f"image/{image.name}")
        data = request.data
        data['avatar']=image_url
        
        serializer = CustomUserSerializer(
            request.user, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
        
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")

        if not user.check_password(current_password):
            return Response({"detail": "Current password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({"detail": "Password updated successfully."}, status=status.HTTP_200_OK)  


# Guest user views

class GuestSignupView(APIView):
    permission_classes = []  # open endpoint

    def post(self, request):
        # Generate random username
        username = f"guest_{uuid.uuid4().hex[:8]}"
        # Generate random password (never shown to user)
        password = get_random_string(12)

        # Create the guest user
        guest = CustomUser.objects.create_user(
            username=username,
            password=password,
            is_guest=True,
            phone_number=f"guest_{uuid.uuid4().hex[:8]}"
        )

        # Issue JWT tokens
        refresh = RefreshToken.for_user(guest)
        access_token = str(refresh.access_token)

        return Response({
            "id": guest.id,
            "username": guest.username,
            "is_guest": guest.is_guest,
            "access": access_token,
            "refresh": str(refresh),
        })

    



    



