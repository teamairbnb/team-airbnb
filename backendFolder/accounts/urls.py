from django.urls import path
from .views import UserProfileView,UpdateUserProfileView

urlpatterns = [
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('profile/update/', UpdateUserProfileView.as_view(), name='update-user-profile'),

]