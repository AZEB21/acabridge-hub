from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Step 1 — Register
    path('auth/register/', views.RegisterView.as_view(), name='register'),

    # Step 2 — Verify email OTP
    path('auth/verify-otp/', views.VerifyOTPView.as_view(), name='verify_otp'),
    path('auth/resend-otp/', views.ResendOTPView.as_view(), name='resend_otp'),

    # JWT token refresh (shared utility)
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Step 3 — Profile setup (requires auth)
    path('onboarding/profile/', views.ProfileSetupView.as_view(), name='profile_setup'),

    # Step 4 — Choose track & submit application (requires auth)
    path('onboarding/tracks/', views.TrainingTracksView.as_view(), name='training_tracks'),
    path('onboarding/submit/', views.SubmitApplicationView.as_view(), name='submit_application'),

    # Current user info
    path('auth/me/', views.MeView.as_view(), name='me'),
]
