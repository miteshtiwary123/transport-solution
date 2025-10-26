from django.urls import path
from .views import *

urlpatterns = [
    # Truck Owners
    path('v1/truck-owners/', TruckOwnerListCreateAPI.as_view(), name='truck-owner-list'),
    path('v1/truck-owners/<int:pk>/', TruckOwnerDetailAPI.as_view(), name='truck-owner-detail'),

    # Truck Drivers
    path('v1/truck-drivers/', TruckDriverListCreateAPI.as_view(), name='truck-driver-list'),
    path('v1/truck-drivers/<int:pk>/', TruckDriverDetailAPI.as_view(), name='truck-driver-detail'),

    # Trucks
    path('v1/', TruckListCreateAPI.as_view(), name='truck-list'),
    path('v1/<int:pk>/', TruckDetailAPI.as_view(), name='truck-detail'),
]