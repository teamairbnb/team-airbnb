from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Car
from .serializers import CarSerializer
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

    def get_supabase(self):
        return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

    def perform_create(self, serializer):
        car = serializer.save()
        file = self.request.FILES.get('images')
        if file:
            supabase = self.get_supabase()
            file_path = f"car_images/{file.name}"
            res = supabase.storage.from_('car inventories').upload(file_path, file)

            if not res.error:
                public_url = supabase.storage.from_('car inventories').get_public_url(file_path)
                car.images = public_url
                car.save() 
            else:
                print("Error uploading file to Supabase:", res.error.message)

        def perform_update(self, serializer):
            car = serializer.save()
            file = self.request.FILES.get('images')
            if file:
                supabase = self.get_supabase()
                file_path = f"car_images/{file.name}"
                res = supabase.storage.from_('car inventories').upload(file_path, file)

                if not res.error:
                    public_url = supabase.storage.from_('car inventories').get_public_url(file_path)
                    car.images = public_url
                    car.save() 
                else:
                    print("Error uploading file to Supabase:", res.error.message)                          

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
