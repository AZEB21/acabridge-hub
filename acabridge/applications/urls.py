from django.urls import path
from .views import (
    ApplicationCreateView,
    MyApplicationView,
    AdminApplicationListView,
    ApplicationUpdateStatusView,
)

urlpatterns = [
    path('', ApplicationCreateView.as_view(), name='apply'),
    path('mine/', MyApplicationView.as_view(), name='my-application'),
    path('admin/', AdminApplicationListView.as_view(), name='admin-applications'),
    path('<int:pk>/status/', ApplicationUpdateStatusView.as_view(), name='update-status'),
]
