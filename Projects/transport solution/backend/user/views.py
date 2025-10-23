from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.shortcuts import get_object_or_404
from .models import User
from .serializers import UserSerializer, UserCreateSerializer, UserUpdateSerializer


# ---------- Permissions ----------
class IsAdminOrSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type in ['admin', 'superadmin']


# ---------- Create (Register) ----------
class UserCreateAPI(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User created successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ---------- List Users (Admin only) ----------
class UserListAPI(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminOrSuperAdmin]

    def get(self, request):
        users = User.objects.all().order_by('-id')
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# ---------- Retrieve Single User ----------
class UserDetailAPI(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        # Only admin/superadmin or the user himself can view details
        if request.user.user_type not in ['admin', 'superadmin'] and request.user.id != user.id:
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


# ---------- Update User ----------
class UserUpdateAPI(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        # Only admin/superadmin or the user himself can update
        if request.user.user_type not in ['admin', 'superadmin'] and request.user.id != user.id:
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User updated successfully", "data": serializer.data},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ---------- Delete User ----------
class UserDeleteAPI(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminOrSuperAdmin]

    def delete(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        user.delete()
        return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
