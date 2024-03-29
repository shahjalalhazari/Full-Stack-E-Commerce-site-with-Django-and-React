from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializers, UserSerializers
from .products import products



# SIMPLE JET
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    """This is how we can customize info of token inside"""
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

        data["username"] = self.user.username
        data["email"] = self.user.email
        # these infos comes with "access" & "refresh" token

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer





# Create your views here.
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


# Single User View
@api_view(["GET"])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializers(user, many=False)
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