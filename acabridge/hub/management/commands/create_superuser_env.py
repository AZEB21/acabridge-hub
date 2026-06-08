"""
Management command: create_superuser_env
Creates or fully resets superuser(s) on every deploy.

Priority 1: env vars DJANGO_SUPERUSER_EMAIL / PASSWORD / NAME
Priority 2: hardcoded fallback for superadmin@africaagility.org / 12345678
"""
import os
from django.core.management.base import BaseCommand
from hub.models import User


HARDCODED_SUPERUSERS = [
    {
        'email': 'superadmin@africaagility.org',
        'full_name': 'Super Admin',
        'password': '12345678',
    },
]


class Command(BaseCommand):
    help = 'Create or reset superuser(s) on every deploy'

    def _ensure_superuser(self, email, full_name, password):
        """Create the superuser if missing, or fully reset their flags and password."""
        user, created = User.objects.get_or_create(
            email=email,
            defaults={'full_name': full_name},
        )

        # Always enforce all required flags
        user.full_name        = full_name
        user.is_superuser     = True
        user.is_staff         = True
        user.is_active        = True   # superadmin must always be active
        user.is_email_verified = True

        # Always reset the password so the hardcoded credentials always work
        user.set_password(password)
        user.save()

        action = 'Created' if created else 'Updated'
        self.stdout.write(self.style.SUCCESS(
            f'[superuser] {action}: {email}'
        ))

    def handle(self, *args, **kwargs):
        # Optional env-var override
        email    = os.environ.get('DJANGO_SUPERUSER_EMAIL')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')
        name     = os.environ.get('DJANGO_SUPERUSER_NAME', 'Admin')
        if email and password:
            self._ensure_superuser(email, name, password)

        # Hardcoded superadmin — always runs
        for su in HARDCODED_SUPERUSERS:
            self._ensure_superuser(su['email'], su['full_name'], su['password'])
