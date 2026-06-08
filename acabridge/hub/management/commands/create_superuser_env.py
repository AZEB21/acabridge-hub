"""
Management command: create_superuser_env
Creates superuser(s) on deploy.

Priority 1: env vars DJANGO_SUPERUSER_EMAIL / PASSWORD / NAME
Priority 2: hardcoded fallback for superadmin@africaagility.org
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
    help = 'Create superuser(s) from environment variables and hardcoded defaults'

    def _create(self, email, full_name, password):
        if User.objects.filter(email=email).exists():
            # Make sure existing user has superuser rights
            user = User.objects.get(email=email)
            updated = False
            if not user.is_superuser:
                user.is_superuser = True
                updated = True
            if not user.is_staff:
                user.is_staff = True
                updated = True
            if not user.is_email_verified:
                user.is_email_verified = True
                updated = True
            if updated:
                user.save()
                self.stdout.write(f'[superuser] Updated privileges for: {email}')
            else:
                self.stdout.write(f'[superuser] Already exists: {email}')
            return

        User.objects.create_superuser(
            email=email,
            full_name=full_name,
            password=password,
        )
        self.stdout.write(self.style.SUCCESS(f'[superuser] Created: {email}'))

    def handle(self, *args, **kwargs):
        # From env vars (optional override)
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')
        name = os.environ.get('DJANGO_SUPERUSER_NAME', 'Admin')
        if email and password:
            self._create(email, name, password)

        # Hardcoded superadmins
        for su in HARDCODED_SUPERUSERS:
            self._create(su['email'], su['full_name'], su['password'])
