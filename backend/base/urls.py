from django.urls import path
from . import views

app_name = "base"

urlpatterns = [
    path('user/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("", views.getRoutes, name="routes"),
    path("products/", views.getProducts, name="products"),
    path("products/<str:pk>/", views.getProduct, name="product"),
]