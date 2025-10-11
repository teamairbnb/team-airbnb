from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminCarViewSet, UserCarViewSet

admin_router = DefaultRouter()
admin_router.register(r'cars', AdminCarViewSet, basename='admin-cars')

user_router = DefaultRouter()
user_router.register(r'cars', UserCarViewSet, basename='user-cars')

urlpatterns = [
    path('admin/', include(admin_router.urls)),  # api/v1/admin/cars/
    path('', include(user_router.urls)),         # api/v1/cars/
]