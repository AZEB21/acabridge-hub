from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [

    # ── AZEB'S ENDPOINTS — Auth ───────────────────────────────────────────────
    path('auth/register/',      views.RegisterView.as_view(),  name='register'),
    path('auth/verify-otp/',    views.VerifyOTPView.as_view(), name='verify_otp'),
    path('auth/resend-otp/',    views.ResendOTPView.as_view(), name='resend_otp'),
    path('auth/signin/',        views.SignInView.as_view(),    name='signin'),
    path('auth/signout/',       views.SignOutView.as_view(),   name='signout'),
    path('auth/token/refresh/', TokenRefreshView.as_view(),   name='token_refresh'),
    path('auth/me/',            views.MeView.as_view(),        name='me'),
    path('admin/register/', views.RegisterView.as_view(), name='admin_register'),
    path('admin/login/',    TokenObtainPairView.as_view(), name='admin_login'),
    path('admin/dashboard/', views.AdminDashboardView.as_view(), name='admin_dashboard'),

    # ── AUSTA'S ENDPOINTS — add below this line ───────────────────────────────
    # path('onboarding/profile/', views.ProfileSetupView.as_view(),     name='profile_setup'),
    # path('onboarding/tracks/',  views.TrainingTracksView.as_view(),   name='training_tracks'),
    # path('onboarding/submit/',  views.SubmitApplicationView.as_view(),name='submit_application'),
    # path('application/status/', views.ApplicationStatusView.as_view(),name='application_status'),
    # path('application/preview/',views.PreviewApplicationView.as_view(),name='preview_application'),
    # path('application/edit/',   views.EditApplicationView.as_view(),  name='edit_application'),
    # path('dashboard/',          views.DashboardView.as_view(),        name='dashboard'),

]
