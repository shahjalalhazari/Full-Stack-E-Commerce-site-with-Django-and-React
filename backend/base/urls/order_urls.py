from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path("add-order/", views.addOrderItems, name="addOrder"),
    path("<str:pk>/", views.getOrderById, name="user-order"),
]