from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.serializers import UserSerializers, UserSerializerWithToken

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



# Single Profile User View
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializers(user, many=False)
    return Response(serializer.data)


# Update Single Profile User View
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    # submitted data
    data = request.data
    user.first_name = data["name"]
    user.username = data["email"]
    user.email = data["email"]
    # if user try to change password & password field isn't blank.
    if data["password"] != "":
        user.password = make_password(data["password"])
    
    user.save()
    return Response(serializer.data)


# All User View
@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializers(users, many=True)
    return Response(serializer.data)