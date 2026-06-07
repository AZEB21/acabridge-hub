from django.contrib import admin
from .models import Lesson, LessonProgress, Enrollment, Assignment, Submission, LiveClassAttendance


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display  = ('title', 'module', 'order', 'estimated_minutes')
    list_filter   = ('module__track',)
    ordering      = ('module__order', 'order')
    search_fields = ('title', 'module__title')


@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display  = ('user', 'lesson', 'completed', 'completed_at')
    list_filter   = ('completed',)
    search_fields = ('user__email', 'lesson__title')


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display  = ('user', 'track', 'enrolled_at', 'is_active')
    list_filter   = ('is_active', 'track')
    search_fields = ('user__email', 'track__name')


@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display  = ('title', 'module', 'due_date', 'created_at')
    list_filter   = ('module__track',)
    search_fields = ('title', 'module__title')
    ordering      = ('due_date',)


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display  = ('user', 'assignment', 'status', 'submitted_at', 'grade')
    list_filter   = ('status',)
    search_fields = ('user__email', 'assignment__title')
    ordering      = ('-submitted_at',)


@admin.register(LiveClassAttendance)
class LiveClassAttendanceAdmin(admin.ModelAdmin):
    list_display  = ('user', 'live_class', 'attended', 'joined_at')
    list_filter   = ('attended',)
    search_fields = ('user__email', 'live_class__title')
