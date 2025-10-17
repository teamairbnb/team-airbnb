from django.urls import path
from .views import UserProfileView,UpdateUserProfileView,ChangePasswordView,GuestSignupView,run_cron_task,BusinessOwnerSignupView

urlpatterns = [
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('profile/update/', UpdateUserProfileView.as_view(), name='update-user-profile'),
    path('profile/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('guest-signup/', GuestSignupView.as_view(), name='guest-signup'),
    path('run-cron-task/', run_cron_task, name='run-cron-task'),
    path('business-owner', BusinessOwnerSignupView.as_view(), name="business-owner-signup"),

]