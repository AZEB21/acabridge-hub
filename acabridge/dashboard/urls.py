from django.urls import path
from .views import (
    DashboardView,
    NotificationListView,
    NotificationMarkReadView,
    NotificationMarkAllReadView,
)

urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
    path('notifications/', NotificationListView.as_view(), name='notifications'),
    path('notifications/read-all/', NotificationMarkAllReadView.as_view(), name='notifications-read-all'),
    path('notifications/<int:pk>/read/', NotificationMarkReadView.as_view(), name='notification-read'),
]
