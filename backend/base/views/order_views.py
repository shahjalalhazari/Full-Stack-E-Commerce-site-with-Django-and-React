from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.serializers import OrderSerializer
from base.models import Order, OrderItem, ShippingAddress, Product

from rest_framework import status


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data["orderItems"]

    if orderItems and len(orderItems) == 0:
        return Response({"detail": "No Order Items Found"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # (1) Create order
        order = Order.objects.create(
            user = user,
            paymentMethod = data["paymentMethod"],
            shippingPrice = data["shippingPrice"],
            taxPrice = data["taxPrice"],
            totalPrice = data["totalPrice"]
        )

        # (2) Create shipping address
        shipping = ShippingAddress.objects.create(
            order = order,
            address = data["shippingAddress"]["address"],
            city = data["shippingAddress"]["city"],
            postalCode = data["shippingAddress"]["postalCode"],
            country = data["shippingAddress"]["country"],
            shippingPrice = data["shippingPrice"],
        )

        # (3) Create order items and set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i["product"])

            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                quantity = i["quantity"],
                price = i["price"],
                image = product.image.url
            )
            
            # (4) Update stock
            if product.countInStock >= 1:
                product.countInStock -= item.quantity
            else:
                product.countInStock = 0
            product.save()
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


# get single order bu id
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user

    try:
        order = Order.objects.get(_id=pk)

        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response(
                {"detail": "Not authorized to view this order"},
                status=status.HTTP_400_BAD_REQUEST
                )
    except Order.DoesNotExist:
        return Response(
            {"detail": "Order does not exist"},
            status=status.HTTP_400_BAD_REQUEST
            )
