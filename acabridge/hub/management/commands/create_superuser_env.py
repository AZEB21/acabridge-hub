"""
Management command: create_superuser_env
Creates a superuser from environment variables if one doesn't exist yet.
Add to Render build command:
  python manage.py create_superuser_env
Set these env vars on Render:
  DJANGO_SUPERUSER_EMAIL    = admin@example.com
  DJANGO_SUPERUSER_PASSWORD = yourpassword
  DJANGO_SUPERUSER_NAME     = Admin
"""
import os
from django.core.management.base import BaseCommand
from hub.models import User


class Command(BaseCommand):
    help = 'Create superuser from environment variables'

    def handle(self, *args, **kwargs):
        email    = os.environ.get('DJANGO_SUPERUSER_EMAIL')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')
        name     = os.environ.get('DJANGO_SUPERUSER_NAME', 'Admin')

        if not email or not password:
            self.stdout.write('[superuser] DJANGO_SUPERUSER_EMAIL or PASSWORD not set — skipping.')
            return

        if User.objects.filter(email=email).exists():
            self.stdout.write(f'[superuser] {email} already exists — skipping.')
            return

        User.objects.create_superuser(
            email=email,
            full_name=name,
            password=password,
        )
        self.stdout.write(f'[superuser] Created superuser: {email}')
