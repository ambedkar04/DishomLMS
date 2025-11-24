from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, PasswordResetRequestView, UserProfileView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('password/reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('me/', UserProfileView.as_view(), name='user_profile'),
]