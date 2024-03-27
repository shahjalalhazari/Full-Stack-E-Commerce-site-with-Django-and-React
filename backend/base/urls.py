from rest_framework_simplejwt.views import (
    TokenObtainPairView
)
from django.urls import path
from . import views

app_name = "base"

urlpatterns = [
    path('user/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("", views.getRoutes, name="routes"),
    path("products/", views.getProducts, name="products"),
    path("products/<str:pk>/", views.getProduct, name="product"),
]