from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from .models import Product
from .serializers import ProductSerializers, UserSerializers, UserSerializerWithToken
from .products import products

# SIMPLE JWT
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """This is how we can customize data of token inside"""
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)
    #     # Add custom claims
    #     token['username'] = user.username
    #     token['message'] = "Login Successfully!"
    #     return token

    """Now this is method where we can customize the sending data"""
    def validate(self, attrs):
        data = super().validate(attrs)

        """
        data["username"] = self.user.username
        data["email"] = self.user.email
        # these infos comes with "access" & "refresh" token
        """

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Create your views here.

# User Register view
@api_view(["POST"])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name = data["name"],
            email = data["email"],
            username = data["email"],
            password = make_password(data["password"])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {"detail": "User with this email already exists."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


"""
@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/api/products/",
        "/api/products/create/",

        "/api/products/upload/",

        "/api/products/<id>/reviews/",

        "/api/products/top/",
        "/api/products/<id>/",

        "/api/products/delete/<id>/",
        "/api/products/update/<id>/",
    ]
    return Response(routes)
"""

# Single User View
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializers(user, many=False)
    return Response(serializer.data)

# All User View
@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializers(users, many=True)
    return Response(serializer.data)


# All Products View
@api_view(["GET"])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializers(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializers(product, many=False)
    return Response(serializer.data)