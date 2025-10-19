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
        image=request.FILES["images"] # to specify that we are getting file
        res = supabase.storage.from_("airbnb users").upload(
            f"images/{image.name}",
            image.read(),
            {"content-type":image.content_type}
        ) # storage - shows we are storing
        #    from_(bucket name)- the file location on supabase
        #   images/{image.name} - creates a folder call images and stores the images in there by their names
        #   content-type - description of the image(optional)

        image_url=supabase.storage.from_("airbnb users").get_public_url(f"images/{image.name}")
        # get image url from supabase 
        data = request.data # get the request sent by the user
        data['images']=image_url # point to the image request and stores the image url there 

        serializer = CarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            car = Car.objects.first()
            return Response({"car": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"Error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    # def post(self,request):
    #     data = request.data
    #     images = request.FILES["images"]
        

    #     # image=request.FILES["post_images"]

        
    #     res = supabase.storage.from_('car inventories').upload(
    #         f"car_images/{images.name}",
    #         images.read(),
    #         {"content-type": images.content_type}
    #     )

    #     url = supabase.storage.from_('car inventories').get_public_url(f"car_images/{images.name}")
        

    #     data['images'] = url
    #     # clean_data = {}
    #     # for key,value in data.lists():
    #     #     if len(value) == 1:
    #     #         clean_data[key] = value[0]
    #     #     else:
    #     #         clean_data[key] = value

    #     # if "year" in clean_data:
    #     #     clean_data["year"] = int(clean_data["year"])
    #     # if "deposit_amount" in clean_data:
    #     #     clean_data["deposit_amount"] = float(clean_data["deposit_amount"])

    #     serializer = CarSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=201)
    #     return Response(serializer.errors, status=400)    
                        

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
