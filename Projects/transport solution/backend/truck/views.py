from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.shortcuts import get_object_or_404
from .models import TruckOwner, TruckDriver, Truck
from .serializers import TruckOwnerSerializer, TruckDriverSerializer, TruckSerializer


# ---------- Permissions ----------
class IsAdminOrSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type in ['admin', 'superadmin']


# =====================================================
#               TRUCK OWNER CRUD
# =====================================================
class TruckOwnerListCreateAPI(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminOrSuperAdmin]

    def get(self, request):
        owners = TruckOwner.objects.all().order_by('-id')
        serializer = TruckOwnerSerializer(owners, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TruckOwnerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Truck owner created", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TruckOwnerDetailAPI(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminOrSuperAdmin]

    def get(self, request, pk):
        owner = get_object_or_404(TruckOwner, pk=pk)
        serializer = TruckOwnerSerializer(owner)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        owner = get_object_or_404(TruckOwner, pk=pk)
        serializer = TruckOwnerSerializer(owner, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Truck owner updated", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        owner = get_object_or_404(TruckOwner, pk=pk)
        owner.delete()
        return Response({"message": "Truck owner deleted"}, status=status.HTTP_204_NO_CONTENT)


# =====================================================
#               TRUCK DRIVER CRUD
# =====================================================
class TruckDriverListCreateAPI(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminOrSuperAdmin]

    def get(self, request):
        drivers = TruckDriver.objects.all().order_by('-id')
        serializer = TruckDriverSerializer(drivers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TruckDriverSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Truck driver created", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TruckDriverDetailAPI(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminOrSuperAdmin]

    def get(self, request, pk):
        driver = get_object_or_404(TruckDriver, pk=pk)
        serializer = TruckDriverSerializer(driver)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        driver = get_object_or_404(TruckDriver, pk=pk)
        serializer = TruckDriverSerializer(driver, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Truck driver updated", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        driver = get_object_or_404(TruckDriver, pk=pk)
        driver.delete()
        return Response({"message": "Truck driver deleted"}, status=status.HTTP_204_NO_CONTENT)


# =====================================================
#               TRUCK CRUD
# =====================================================
class TruckListCreateAPI(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminOrSuperAdmin]

    def get(self, request):
        trucks = Truck.objects.select_related('owner', 'driver').all().order_by('-id')
        serializer = TruckSerializer(trucks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = TruckSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Truck created", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TruckDetailAPI(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminOrSuperAdmin]

    def get(self, request, pk):
        truck = get_object_or_404(Truck.objects.select_related('owner', 'driver'), pk=pk)
        serializer = TruckSerializer(truck)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        truck = get_object_or_404(Truck, pk=pk)
        owner_data = request.data.get('owner')
        driver_data = request.data.get('driver')

        if owner_data:
            owner, _ = TruckOwner.objects.get_or_create(
                mobile=owner_data['mobile'],
                defaults={'name': owner_data['name'], 'address': owner_data.get('address')}
            )
            truck.owner = owner

        if driver_data:
            driver, _ = TruckDriver.objects.get_or_create(
                mobile=driver_data['mobile'],
                defaults={
                    'name': driver_data['name'],
                    'license_number': driver_data['license_number'],
                    'address': driver_data.get('address')
                }
            )
            truck.driver = driver

        truck.truck_number = request.data.get('truck_number', truck.truck_number)
        truck.model_name = request.data.get('model_name', truck.model_name)
        truck.capacity_in_tons = request.data.get('capacity_in_tons', truck.capacity_in_tons)
        truck.is_active = request.data.get('is_active', truck.is_active)
        truck.save()

        serializer = TruckSerializer(truck)
        return Response({"message": "Truck updated", "data": serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        truck = get_object_or_404(Truck, pk=pk)
        truck.delete()
        return Response({"message": "Truck deleted"}, status=status.HTTP_204_NO_CONTENT)
