from django.db import models


class TruckOwner(models.Model):
    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=15, unique=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class TruckDriver(models.Model):
    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=15, unique=True)
    license_number = models.CharField(max_length=50, unique=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.license_number})"


class Truck(models.Model):
    truck_number = models.CharField(max_length=20, unique=True)
    model_name = models.CharField(max_length=100, null=True, blank=True)
    capacity_in_tons = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    owner = models.ForeignKey(TruckOwner, on_delete=models.CASCADE, related_name='trucks')
    driver = models.ForeignKey(TruckDriver, on_delete=models.SET_NULL, null=True, blank=True, related_name='trucks')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.truck_number
