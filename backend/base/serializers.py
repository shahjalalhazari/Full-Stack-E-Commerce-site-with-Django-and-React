from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product


class UserSerializers(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ["id","_id", "username", "email", "name", "isAdmin"]

    # primary id as _id
    def get__id(self, obj):
        return obj.id
    
    # is user staff or not
    def get_isAdmin(self, obj):
        return obj.is_staff

    # get user first name as full name
    def get_name(self, obj):
        name = obj.first_name
        # if user doesn't have name, then take the email as name
        if name == "":
            name = obj.email
        return name



"""User Serializer with refresh token"""
class UserSerializerWithToken(UserSerializers):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id","_id", "username", "email", "name", "isAdmin", "token"]

    # get current user token
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"