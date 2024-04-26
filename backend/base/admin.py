from django.contrib import admin
from .models import Product, Order, ShippingAddress, OrderItem, Review

# Register your models here.
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(ShippingAddress)
admin.site.register(OrderItem)
admin.site.register(Review)