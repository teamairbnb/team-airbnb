from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Car
from .serializers import CarSerializer
from .config import supabase
from rest_framework.response import Response
from rest_framework import status
from supabase import create_client
from django.conf import settings
from accounts.permissions import IsBusinessOwner
from drf_spectacular.utils import extend_schema, OpenApiParameter


# Create your views here.


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

@extend_schema(
    tags=['Admin Cars'],
    description="Admin can create, update, delete, and list cars.",
    parameters=[
        OpenApiParameter(name='make', description='Filter by car make', required=False, type=str),
        OpenApiParameter(name='model', description='Filter by car model', required=False, type=str),
    ],
    responses={200: CarSerializer(many=True)}
)

class AdminCarViewSet(viewsets.ModelViewSet):
    queryset =  Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrReadOnly,IsBusinessOwner]

    def post(self, request):

        data = request.data
        print(data)

        images = request.FILES.getlist("images")
        image_url = []


        for image in images:
            res = supabase.storage.from_("airbnb users").upload(
                f"car_images/{image.name}",
                image.read(),
                {"content-type":image.content_type}
            )

            url = supabase.storage.from_("airbnb users").get_public_url(f"car_images/{image.name}")
            image_url.append(url)

        data["images"] = image_url
        clean_data = {}
        for key, value in data.lists():
            if len(value) == 1:
                clean_data[key] = value[0]
            else:
                clean_data[key] = value

        
        clean_data["is_available"] = str(clean_data.get("is_available", "")).lower() in ["true", "1", "yes"]
        if "year" in clean_data:
            clean_data["year"] = int(clean_data["year"])
        if "deposit_amount" in clean_data:
            clean_data["deposit_amount"] = float(clean_data["deposit_amount"])

        serializer = CarSerializer(data=clean_data)
        print(clean_data)


        if serializer.is_valid():
            serializer.save(user= request.user)

                        

@extend_schema(
    tags=['User Cars'],
    description="Users can list and retrieve available cars.",
    parameters=[
        OpenApiParameter(name='make', description='Filter by car make', required=False, type=str),
        OpenApiParameter(name='model', description='Filter by car model', required=False, type=str),
    ],
    responses={200: CarSerializer(many=True)}
)
class UserCarViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Car.objects.filter(is_active=True, is_available=True)
    serializer_class = CarSerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ['make', 'model', 'year', 'car_type', 'color', 'seats', 'transmission', 'fuel_type', 'has_ac', 'has_gps',]
    ordering = ['-created_at']
