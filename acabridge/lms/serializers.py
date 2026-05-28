"""
LMS serializers — powers the /api/dashboard/, /api/courses/, /api/assignments/ endpoints.
"""
from django.utils import timezone
from rest_framework import serializers

from hub.models import Module, LiveClass
from .models import Lesson, LessonProgress, Assignment, Submission, Enrollment


# ─── Dashboard serializers ────────────────────────────────────────────────────

class DashboardLiveClassSerializer(serializers.ModelSerializer):
    """Compact live-class card for the dashboard (max 3 upcoming)."""
    status = serializers.SerializerMethodField()
    scheduled_at = serializers.DateTimeField(format='%a, %b %d · %I:%M %p %Z')

    class Meta:
        model = LiveClass
        fields = ['id', 'title', 'scheduled_at', 'status', 'meeting_link']

    def get_status(self, obj):
        now = timezone.now()
        # Consider a class "live" if it started within the last 2 hours
        delta = now - obj.scheduled_at
        if 0 <= delta.total_seconds() <= 7200:
            return 'live_now'
        return 'upcoming'


class DashboardAssignmentSerializer(serializers.Serializer):
    """Recent assignment card for the dashboard (last 3)."""
    id          = serializers.IntegerField()
    title       = serializers.CharField()
    module_name = serializers.CharField()
    status      = serializers.CharField()   # pending / submitted / graded


class DashboardModuleSerializer(serializers.Serializer):
    """Module row in the 'My Learning' section of the dashboard."""
    id             = serializers.IntegerField()
    title          = serializers.CharField()
    lessons_count  = serializers.IntegerField()
    progress_pct   = serializers.IntegerField()


# ─── Courses serializers ──────────────────────────────────────────────────────

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'order', 'estimated_minutes']


class CourseModuleSerializer(serializers.Serializer):
    """
    Full module card for GET /api/courses/.
    Built manually (not ModelSerializer) because it merges Module fields
    with per-student progress computed in the view.
    """
    id               = serializers.IntegerField()
    order            = serializers.IntegerField()
    title            = serializers.CharField()
    status           = serializers.CharField()   # done / inprogress / not_started
    lessons_count    = serializers.IntegerField()
    estimated_hours  = serializers.FloatField()
    progress_pct     = serializers.IntegerField()
    completed_count  = serializers.IntegerField()
    is_locked        = serializers.BooleanField()


class TrackInfoSerializer(serializers.Serializer):
    """Track banner data for GET /api/courses/."""
    title            = serializers.CharField()
    total_modules    = serializers.IntegerField()
    total_lessons    = serializers.IntegerField()
    estimated_weeks  = serializers.IntegerField()
    overall_progress = serializers.IntegerField()


# ─── Assignments serializers ──────────────────────────────────────────────────

class AssignmentListSerializer(serializers.Serializer):
    """
    Row in the assignments table for GET /api/assignments/.
    Merges Assignment + the student's Submission (if any).
    """
    id          = serializers.IntegerField()
    title       = serializers.CharField()
    module_name = serializers.CharField()
    due_date    = serializers.DateField(allow_null=True)
    status      = serializers.CharField()   # pending / submitted / graded
    action      = serializers.CharField()   # 'submit' or 'view'
