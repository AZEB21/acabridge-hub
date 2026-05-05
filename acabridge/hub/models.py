from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
import random


# ─── AZEB'S MODELS ───────────────────────────────────────────────────────────

class UserManager(BaseUserManager):
    def create_user(self, email, full_name, password=None):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, full_name=full_name)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, password):
        user = self.create_user(email, full_name, password)
        user.is_staff = True
        user.is_superuser = True
        user.is_email_verified = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model — email is the username."""
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    # Profile fields — updated by Austa's PATCH /api/onboarding/profile/
    profile_photo = models.ImageField(upload_to='profiles/', blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    nationality = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=255, blank=True)
    bio = models.TextField(max_length=200, blank=True)
    career_goal = models.TextField(blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.email

    @property
    def first_name(self):
        return self.full_name.split()[0] if self.full_name else ''


class OTPCode(models.Model):
    """Stores 6-digit email verification codes."""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='otp_codes')
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def is_valid(self):
        from django.conf import settings
        expiry = getattr(settings, 'OTP_EXPIRY_MINUTES', 10)
        return (
            not self.is_used and
            (timezone.now() - self.created_at).seconds < expiry * 60
        )

    @classmethod
    def generate(cls, user):
        """Invalidate old codes and create a fresh one."""
        cls.objects.filter(user=user, is_used=False).update(is_used=True)
        code = str(random.randint(100000, 999999))
        return cls.objects.create(user=user, code=code)

    def __str__(self):
        return f'{self.user.email} - {self.code}'


class Cohort(models.Model):
    """A training cohort e.g. Cohort 9.0"""
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    applications_open = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class TrainingTrack(models.Model):
    """Available training tracks e.g. Product Management"""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Application(models.Model):
    """
    Links a student to a cohort and training track.
    Created by Azeb's POST /api/onboarding/submit/
    Read and updated by Austa's application endpoints.
    """
    STATUS_APPLIED = 'applied'
    STATUS_REVIEWED = 'reviewed'
    STATUS_ACCEPTED = 'accepted'
    STATUS_ENROLLED = 'enrolled'

    STATUS_CHOICES = [
        (STATUS_APPLIED, 'Applied'),
        (STATUS_REVIEWED, 'Reviewed'),
        (STATUS_ACCEPTED, 'Accepted'),
        (STATUS_ENROLLED, 'Enrolled'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='application')
    cohort = models.ForeignKey(Cohort, on_delete=models.SET_NULL, null=True)
    training_track = models.ForeignKey(TrainingTrack, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_APPLIED)
    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.email} - {self.cohort} - {self.status}'


# ─── AUSTA'S MODELS — add below this line ────────────────────────────────────

class Module(models.Model):
    """Course modules linked to a training track."""
    track = models.ForeignKey(TrainingTrack, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class ModuleProgress(models.Model):
    """Tracks which modules a student has completed."""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='module_progress')
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'module')


class LiveClass(models.Model):
    """Scheduled live sessions linked to a cohort."""
    cohort = models.ForeignKey(Cohort, on_delete=models.CASCADE, related_name='live_classes')
    title = models.CharField(max_length=255)
    scheduled_at = models.DateTimeField()
    meeting_link = models.URLField(blank=True)

    class Meta:
        ordering = ['scheduled_at']

    def __str__(self):
        return self.title
