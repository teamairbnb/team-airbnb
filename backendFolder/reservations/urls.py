from django.urls import path
from .views import CreateReservationView,ViewReservationView,DeleteReservationView


urlpatterns =[
    path('create',CreateReservationView.as_view(),name="create_reservation"),
    path('',ViewReservationView.as_view(),name='view_reservation'),
    path('delete/<int:pk>/',DeleteReservationView.as_view(),name='delete_reservation')


]