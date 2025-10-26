from rest_framework import serializers
from .models import TruckOwner, TruckDriver, Truck


class TruckOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = TruckOwner
        fields = '__all__'


class TruckDriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = TruckDriver
        fields = '__all__'


class TruckSerializer(serializers.ModelSerializer):

    class Meta:
        model = Truck
        fields = '__all__'