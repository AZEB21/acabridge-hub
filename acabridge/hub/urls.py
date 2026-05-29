from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views
from .views import RegisterView, UserDetailView, ForgotPasswordView, ResetPasswordView

urlpatterns = [

    # ── AZEB'S ENDPOINTS — Auth ───────────────────────────────────────────────
    path('auth/register/',      views.RegisterView.as_view(),  name='register'),
    path('auth/verify-otp/',    views.VerifyOTPView.as_view(), name='verify_otp'),
    path('auth/resend-otp/',    views.ResendOTPView.as_view(), name='resend_otp'),
    path('auth/signin/',        views.SignInView.as_view(),    name='signin'),
    path('auth/signout/',       views.SignOutView.as_view(),   name='signout'),
    path('auth/token/refresh/', TokenRefreshView.as_view(),   name='token_refresh'),
    path('auth/me/',            views.MeView.as_view(),        name='me'),
    path("auth/user/", UserDetailView.as_view()),
    path("auth/login/", TokenObtainPairView.as_view()),
    path("auth/refresh/", TokenRefreshView.as_view()),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('reset-password/<uidb64>/<token>/', ResetPasswordView.as_view(), name='reset_password'),


    # ── AUSTA'S ENDPOINTS — add below this line ───────────────────────────────
    # path('onboarding/profile/', views.ProfileSetupView.as_view(),     name='profile_setup'),
    # path('onboarding/tracks/',  views.TrainingTracksView.as_view(),   name='training_tracks'),
    # path('onboarding/submit/',  views.SubmitApplicationView.as_view(),name='submit_application'),
    # path('application/status/', views.ApplicationStatusView.as_view(),name='application_status'),
    # path('application/preview/',views.PreviewApplicationView.as_view(),name='preview_application'),
    # path('application/edit/',   views.EditApplicationView.as_view(),  name='edit_application'),
    # path('dashboard/',          views.DashboardView.as_view(),        name='dashboard'),

]
