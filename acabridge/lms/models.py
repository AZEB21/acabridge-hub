"""
LMS models — all new, never touching hub/models.py.

Relationships to existing models (read-only references):
  hub.User            → AUTH_USER_MODEL
  hub.TrainingTrack   → track that a Lesson/Assignment belongs to
  hub.Module          → existing module model (we extend with Lesson)
  hub.LiveClass       → existing live class model (we extend with attendance)
  hub.Application     → used to find a student's enrolled track/cohort
"""
from django.db import models
from django.conf import settings
from django.utils import timezone


# ─── Lesson ───────────────────────────────────────────────────────────────────

class Lesson(models.Model):
    """
    A single lesson inside a hub.Module.
    Admins create lessons; students complete them.
    """
    module = models.ForeignKey(
        'hub.Module',
        on_delete=models.CASCADE,
        related_name='lessons',
    )
    title = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)
    estimated_minutes = models.PositiveIntegerField(
        default=30,
        help_text='Estimated time to complete in minutes',
    )

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.module.title} — {self.title}'


# ─── LessonProgress ───────────────────────────────────────────────────────────

class LessonProgress(models.Model):
    """Tracks whether a student has completed a specific lesson."""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='lesson_progress',
    )
    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.CASCADE,
        related_name='progress_records',
    )
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'lesson')

    def save(self, *args, **kwargs):
        if self.completed and not self.completed_at:
            self.completed_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.user.email} — {self.lesson.title} — {"done" if self.completed else "pending"}'


# ─── Enrollment ───────────────────────────────────────────────────────────────

class Enrollment(models.Model):
    """
    Explicit enrollment record linking a student to a TrainingTrack.
    Created when an Application reaches 'enrolled' status.
    Admins can also create these directly.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='enrollments',
    )
    track = models.ForeignKey(
        'hub.TrainingTrack',
        on_delete=models.CASCADE,
        related_name='enrollments',
    )
    enrolled_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('user', 'track')

    def __str__(self):
        return f'{self.user.email} → {self.track.name}'


# ─── Assignment ───────────────────────────────────────────────────────────────

class Assignment(models.Model):
    """
    An assignment attached to a hub.Module.
    Visible to all students enrolled in the corresponding track.
    """
    module = models.ForeignKey(
        'hub.Module',
        on_delete=models.CASCADE,
        related_name='assignments',
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['due_date', 'created_at']

    def __str__(self):
        return f'{self.title} ({self.module.title})'


# ─── Submission ───────────────────────────────────────────────────────────────

class Submission(models.Model):
    """A student's submission for an Assignment."""

    STATUS_PENDING   = 'pending'
    STATUS_SUBMITTED = 'submitted'
    STATUS_GRADED    = 'graded'

    STATUS_CHOICES = [
        (STATUS_PENDING,   'Pending'),
        (STATUS_SUBMITTED, 'Submitted'),
        (STATUS_GRADED,    'Graded'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='submissions',
    )
    assignment = models.ForeignKey(
        Assignment,
        on_delete=models.CASCADE,
        related_name='submissions',
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_PENDING,
    )
    file = models.FileField(upload_to='submissions/', blank=True, null=True)
    notes = models.TextField(blank=True)
    submitted_at = models.DateTimeField(null=True, blank=True)
    graded_at = models.DateTimeField(null=True, blank=True)
    grade = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    feedback = models.TextField(blank=True)

    class Meta:
        unique_together = ('user', 'assignment')
        ordering = ['-submitted_at']

    def save(self, *args, **kwargs):
        if self.status == self.STATUS_SUBMITTED and not self.submitted_at:
            self.submitted_at = timezone.now()
        if self.status == self.STATUS_GRADED and not self.graded_at:
            self.graded_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.user.email} — {self.assignment.title} — {self.status}'


# ─── LiveClassAttendance ──────────────────────────────────────────────────────

class LiveClassAttendance(models.Model):
    """Records whether a student attended a hub.LiveClass session."""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='attendance_records',
    )
    live_class = models.ForeignKey(
        'hub.LiveClass',
        on_delete=models.CASCADE,
        related_name='attendance_records',
    )
    attended = models.BooleanField(default=False)
    joined_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'live_class')

    def __str__(self):
        return f'{self.user.email} — {self.live_class.title} — {"attended" if self.attended else "absent"}'
