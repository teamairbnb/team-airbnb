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


from rest_framework.decorators import api_view

@api_view(['GET'])  # or ['POST'] if you prefer
def run_cron_task(request):
    # Example task: print something or trigger a function
    # You can also call any helper function here
    print("Cron job executed successfully!")

    # Return a 200 OK response
    return Response({"status": "success"}, status=status.HTTP_200_OK)



@extend_schema(request=CustomUserSerializer, responses=CustomUserSerializer)
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = CustomUserSerializer(request.user)
        return Response(serializer.data)


@extend_schema(
    request={
        'application/json': {
            'type': 'object',
            'properties': {
                'first_name': {'type': 'string', 'description': 'First name of the user.'},
                'last_name': {'type': 'string', 'description': 'Last name of the user.'},
                'email': {'type': 'string', 'description': 'Email address.'},
                'phone_number': {'type': 'string', 'description': 'Phone number.'},
                'country': {'type': 'string', 'description': 'Country.'},
                'state': {'type': 'string', 'description': 'State.'},
                'address': {'type': 'string', 'description': 'Address.'},
                'avatar': {'type': 'string', 'format': 'binary', 'description': 'Avatar image file.'}
            },
            'required': ['avatar']
        },
        'multipart/form-data': {
            'type': 'object',
            'properties': {
                'first_name': {'type': 'string', 'description': 'First name of the user.'},
                'last_name': {'type': 'string', 'description': 'Last name of the user.'},
                'email': {'type': 'string', 'description': 'Email address.'},
                'phone_number': {'type': 'string', 'description': 'Phone number.'},
                'country': {'type': 'string', 'description': 'Country.'},
                'state': {'type': 'string', 'description': 'State.'},
                'address': {'type': 'string', 'description': 'Address.'},
                'avatar': {'type': 'string', 'format': 'binary', 'description': 'Avatar image file.'}
            },
            'required': ['avatar']
        }
    },
    responses={
        200: CustomUserSerializer,
        400: {
            'type': 'object',
            'properties': {
                'detail': {'type': 'string', 'example': 'Invalid data.'}
            }
        }
    },
    description="""
    Updates the user's profile. Accepts avatar image upload and other profile fields.\nFor guest users, only limited fields may be editable. The avatar field should be sent as a file in multipart/form-data.
    """
)
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
        
@extend_schema(
    request={
        'application/json': {
            'type': 'object',
            'properties': {
                'current_password': {'type': 'string', 'description': 'Current password of the user.'},
                'new_password': {'type': 'string', 'description': 'New password to set.'}
            },
            'required': ['current_password', 'new_password']
        }
    },
    responses={
        200: {
            'type': 'object',
            'properties': {
                'detail': {'type': 'string', 'example': 'Password updated successfully.'}
            }
        },
        400: {
            'type': 'object',
            'properties': {
                'detail': {'type': 'string', 'example': 'Current password is incorrect.'}
            }
        }
    },
    description="""
    Changes the user's password. Requires the current password and the new password as parameters.
    """
)
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

@extend_schema(
    request=None,
    responses={
        200: {
            'type': 'object',
            'properties': {
                'id': {'type': 'integer', 'description': 'Guest user ID.'},
                'username': {'type': 'string', 'description': 'Generated guest username.'},
                'is_guest': {'type': 'boolean', 'description': 'True if user is a guest.'},
                'access': {'type': 'string', 'description': 'JWT access token.'},
                'refresh': {'type': 'string', 'description': 'JWT refresh token.'}
            },
            'required': ['id', 'username', 'is_guest', 'access', 'refresh']
        }
    },
    description="""
    Creates a guest user account.\n- Returns JWT access and refresh tokens for authentication.\n- Guest users have limited access and reservations expire in 3 days.\n- No password or email required.\n- The response includes the guest user's ID, username, is_guest flag, and JWT tokens.
    """
)
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









