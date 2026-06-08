from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from .views import RegisterView, MeView, ForgotPasswordView, ResetPasswordView, CountriesListView, TrainingTracksView, SubmitApplicationView, CohortViewSet  

urlpatterns = [
    # ── Auth ──────────────────────────────────────────────────────────────────
    path('auth/register/',      views.RegisterView.as_view(),   name='register'),
    path('auth/verify-otp/',    views.VerifyOTPView.as_view(),  name='verify_otp'),
    path('auth/resend-otp/',    views.ResendOTPView.as_view(),  name='resend_otp'),
    path('auth/signin/',        views.SignInView.as_view(),     name='signin'),
    path('auth/signout/',       views.SignOutView.as_view(),    name='signout'),
    path('auth/token/refresh/', TokenRefreshView.as_view(),    name='token_refresh'),
    path('auth/me/',            views.MeView.as_view(),         name='me'),

    # ── Admin auth ────────────────────────────────────────────────────────────
    path('admin/register/',  views.AdminRegisterView.as_view(),  name='admin_register'),
    path('admin/login/',     views.AdminLoginView.as_view(),     name='admin_login'),

    # ── Admin dashboard & stats ───────────────────────────────────────────────
    path('admin/dashboard/', views.AdminDashboardView.as_view(), name='admin_dashboard'),
    path('countries/', CountriesListView.as_view(), name='countries'),
    path('tracks/', TrainingTracksView.as_view(), name='training_tracks'),
    path('cohorts/', CohortViewSet.as_view({'get': 'list', 'post': 'create'}), name='cohort_list_create'),

    # ── Admin cohort CRUD ─────────────────────────────────────────────────────
    path('admin/cohorts/',        views.CohortListCreateView.as_view(), name='admin_cohorts'),
    path('admin/cohorts/<int:pk>/', views.CohortDetailView.as_view(),   name='admin_cohort_detail'),

    # ── Admin application management ──────────────────────────────────────────
    path('admin/applications/',              views.AdminApplicationsView.as_view(),      name='admin_applications'),
    path('admin/applications/<int:pk>/',     views.AdminApplicationDetailView.as_view(), name='admin_application_detail'),
    path('admin/applications/<int:pk>/status/', views.AdminApplicationDetailView.as_view(), name='admin_application_status'),

    # ── Superuser — manage admin users ────────────────────────────────────────
    path('admin/users/',           views.AdminUserListView.as_view(),   name='admin_users'),
    path('admin/users/<int:pk>/',  views.AdminUserDetailView.as_view(), name='admin_user_detail'),

    # ── Password reset ────────────────────────────────────────────────────────
    path('forgot-password/',                   views.ForgotPasswordView.as_view(), name='forgot_password'),
    path('reset-password/<uidb64>/<token>/',   views.ResetPasswordView.as_view(),  name='reset_password'),

    # ── Reference data ────────────────────────────────────────────────────────
    path('countries/',       views.CountryListView.as_view(),      name='countries'),
    path('tracks/',          views.TrainingTrackListView.as_view(), name='training_tracks'),

    # ── Onboarding ────────────────────────────────────────────────────────────
    path('onboarding/profile/', views.ProfileSetupView.as_view(),   name='profile_setup'),
    path('onboarding/tracks/',  views.TrainingTracksView.as_view(), name='onboarding_tracks'),
    path('onboarding/submit/',  views.SubmitApplicationView.as_view(), name='submit_application'),
]
