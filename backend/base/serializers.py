from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]




class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"