from django.urls import path
from .views import DashboardView, CoursesView, AssignmentsView

urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='lms-dashboard'),
    path('courses/',   CoursesView.as_view(),   name='lms-courses'),
    path('assignments/', AssignmentsView.as_view(), name='lms-assignments'),
]
