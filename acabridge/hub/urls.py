from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [

    # ── Auth ──────────────────────────────────────────────────────────────────
    path('auth/register/',      views.RegisterView.as_view(),  name='register'),
    path('auth/verify-otp/',    views.VerifyOTPView.as_view(), name='verify_otp'),
    path('auth/resend-otp/',    views.ResendOTPView.as_view(), name='resend_otp'),
    path('auth/signin/',        views.SignInView.as_view(),    name='signin'),
    path('auth/signout/',       views.SignOutView.as_view(),   name='signout'),
    path('auth/token/refresh/', TokenRefreshView.as_view(),   name='token_refresh'),
    path('auth/me/',            views.MeView.as_view(),        name='me'),

    # ── Onboarding ────────────────────────────────────────────────────────────
    path('onboarding/profile/', views.ProfileSetupView.as_view(), name='profile_setup'),
    # path('onboarding/tracks/',  views.TrainingTracksView.as_view(),    name='training_tracks'),
    # path('onboarding/submit/',  views.SubmitApplicationView.as_view(), name='submit_application'),

]
