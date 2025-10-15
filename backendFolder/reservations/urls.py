from django.urls import path
from .views import CreateReservationView,ViewReservationView,DeleteReservationView,AdminManageReservationView


urlpatterns =[
    path('create',CreateReservationView.as_view(),name="create_reservation"),
    path('',ViewReservationView.as_view(),name='view_reservation'),
    path('delete/<int:pk>/',DeleteReservationView.as_view(),name='delete_reservation'),
    path('admin/reservations/', AdminManageReservationView.as_view(),name='admin-create'),             # GET (view all), POST (create)
    path('admin/reservations/<int:pk>/', AdminManageReservationView.as_view(),name='admin-reassign'),    # PATCH (reassign), DELETE (cancel)


]