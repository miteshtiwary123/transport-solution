from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *

urlpatterns = [
    path('v1/', UserListAPI.as_view(), name='user-list'),
    path('v1/create/', UserCreateAPI.as_view(), name='user-create'),
    path('v1/<int:pk>/', UserDetailAPI.as_view(), name='user-detail'),
    path('v1/<int:pk>/update/', UserUpdateAPI.as_view(), name='user-update'),
    path('v1/<int:pk>/delete/', UserDeleteAPI.as_view(), name='user-delete'),
    path('v1/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
