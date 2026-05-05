# Backend — AcaBridge HUB

Django backend for the AcaBridge student onboarding portal.

See the root [README](../README.md) for full setup instructions and project overview.

## Quick Start

```bash
py -3.13 -m pip install -r requirements.txt
cp .env.example .env
py -3.13 manage.py makemigrations hub
py -3.13 manage.py migrate
py -3.13 manage.py createsuperuser
py -3.13 manage.py runserver
```
