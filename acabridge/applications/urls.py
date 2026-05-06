from django.urls import path
from .views import (
    ApplicationCreateView,
    AdminApplicationListView,
    ApplicationUpdateStatusView
)

urlpatterns = [
    path("", ApplicationCreateView.as_view(), name="apply"),
    path("admin/", AdminApplicationListView.as_view(), name="admin-applications"),
    path("<int:pk>/status/", ApplicationUpdateStatusView.as_view(), name="update-status"),
]