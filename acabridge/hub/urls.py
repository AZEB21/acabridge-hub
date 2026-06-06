from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views
from .views import RegisterView, MeView, ForgotPasswordView, ResetPasswordView, CountryListView, TrainingTrackListView, SubmitApplicationView    

urlpatterns = [

    # ── Auth ──────────────────────────────────────────────────────────────────
    path('auth/register/',      views.RegisterView.as_view(),  name='register'),
    path('auth/verify-otp/',    views.VerifyOTPView.as_view(), name='verify_otp'),
    path('auth/resend-otp/',    views.ResendOTPView.as_view(), name='resend_otp'),
    path('auth/signin/',        views.SignInView.as_view(),    name='signin'),
    path('auth/signout/',       views.SignOutView.as_view(),   name='signout'),
    path('auth/token/refresh/', TokenRefreshView.as_view(),   name='token_refresh'),
    path('auth/me/',            views.MeView.as_view(),        name='me'),
    path("auth/user/", MeView.as_view()),
    path("auth/login/", TokenObtainPairView.as_view()),
    path("auth/refresh/", TokenRefreshView.as_view()),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('reset-password/<uidb64>/<token>/', ResetPasswordView.as_view(), name='reset_password'),
    path('admin/register/', views.RegisterView.as_view(), name='admin_register'),
    path('admin/login/',    TokenObtainPairView.as_view(), name='admin_login'),
    path('admin/dashboard/', views.AdminDashboardView.as_view(), name='admin_dashboard'),
    path('countries/', CountryListView.as_view(), name='countries'),
    path('tracks/', TrainingTrackListView.as_view(), name='training_tracks'),

# AUTH SYSTEM
path("auth/user/", MeView.as_view()),
path("auth/login/", TokenObtainPairView.as_view()),
path("auth/refresh/", TokenRefreshView.as_view()),

# ADMIN SYSTEM
path('admin/register/', views.RegisterView.as_view(), name='admin_register'),
path('admin/login/', TokenObtainPairView.as_view(), name='admin_login'),
path('admin/dashboard/', views.AdminDashboardView.as_view(), name='admin_dashboard'),

# PASSWORD RESET
path('forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
path('reset-password/<uidb64>/<token>/', ResetPasswordView.as_view(), name='reset_password'),

    # ── Onboarding ────────────────────────────────────────────────────────────
   # path('onboarding/profile/', views.ProfileSetupView.as_view(), name='profile_setup'),
    #path('onboarding/countries/', views.CountriesListView.as_view(), name='countries_list'),
    #path('onboarding/tracks/', views.TrainingTracksView.as_view(), name='training_tracks'),
    #path('onboarding/submit/', views.SubmitApplicationView.as_view(), name='submit_application'),
]
