from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path("", views.getUsers, name="users"),
    path("profile/", views.getUserProfile, name="user-profile"),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
]