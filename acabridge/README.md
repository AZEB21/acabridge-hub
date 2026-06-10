# AcaBridge HUB — Backend API

Django REST Framework backend for AcaBridge HUB, the learning management platform of Africa Agility Foundation.

## Live URLs

| Service | URL |
|---------|-----|
| Backend API | https://acabridge-hub-1.onrender.com/api/ |
| Frontend | https://acabridge-hub-2.onrender.com |
| API Docs (Swagger) | https://acabridge-hub-1.onrender.com/ |

---

## Tech Stack

- Python 3.11 · Django 4.2 · Django REST Framework
- SQLite (Render persistent disk)
- JWT auth via `djangorestframework-simplejwt`
- Transactional email via Brevo (sib-api-v3-sdk)
- Deployed on Render

---

## Project Structure

```
acabridge/
├── hub/                  # Core app — users, auth, cohorts, tracks, applications
│   ├── models.py         # User, OTPCode, Cohort, TrainingTrack, Application, Countries, ...
│   ├── views.py          # All API views
│   ├── serializers.py    # DRF serializers
│   ├── urls.py           # URL routing
│   └── management/
│       └── commands/
│           ├── create_superuser_env.py   # Creates superadmin on deploy
│           └── seed_countries_tracks.py  # Seeds reference data on deploy
├── applications/         # Student application management
├── dashboard/            # Student dashboard + notifications
└── acabridge/            # Django project settings & root urls
```

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Student registration |
| POST | `/api/auth/verify-otp/` | Email OTP verification |
| POST | `/api/auth/resend-otp/` | Resend OTP |
| POST | `/api/auth/signin/` | Student login |
| POST | `/api/auth/signout/` | Logout (blacklist refresh token) |
| GET  | `/api/auth/me/` | Get current user profile |
| POST | `/api/auth/token/refresh/` | Refresh JWT access token |

### Password Reset
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/forgot-password/` | Send reset email |
| POST | `/api/reset-password/<uid>/<token>/` | Set new password |

### Onboarding
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/PATCH | `/api/onboarding/profile/` | View/update user profile |
| GET | `/api/onboarding/tracks/` | List training tracks |
| POST | `/api/onboarding/submit/` | Submit application to active cohort |

### Student Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/` | Student dashboard summary |
| GET | `/api/dashboard/notifications/` | List notifications |
| PATCH | `/api/dashboard/notifications/<id>/read/` | Mark notification read |
| PATCH | `/api/dashboard/notifications/read-all/` | Mark all read |

### Student Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/application/mine/` | Get own application status |

### Admin Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/register/` | Request admin account (pending approval) |
| POST | `/api/admin/login/` | Admin login |

### Admin Dashboard & Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard/` | Real stats (students, applications, cohorts) |
| GET/POST | `/api/admin/cohorts/` | List all / Create cohort |
| PATCH/DELETE | `/api/admin/cohorts/<id>/` | Edit / Delete cohort |
| GET | `/api/admin/applications/` | List all applications (filter by `?status=`) |
| PATCH | `/api/admin/applications/<id>/status/` | Update application status |
| DELETE | `/api/admin/applications/<id>/` | Delete application |

### Superadmin Only
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users/` | List all admin users + pending |
| PATCH | `/api/admin/users/<id>/` | Approve or reject pending admin |
| DELETE | `/api/admin/users/<id>/` | Remove an admin |

---

## Authentication

All protected endpoints require:
```
Authorization: Bearer <access_token>
```

JWT access tokens expire after 1 day. Refresh tokens expire after 7 days.

---

## User Roles

| Role | `is_staff` | `is_superuser` | `is_active` | Access |
|------|-----------|----------------|-------------|--------|
| Student | `False` | `False` | `True` | Student portal |
| Admin | `True` | `False` | `True` (after approval) | Admin dashboard |
| Superadmin | `True` | `True` | `True` | Full control |

**Admin approval flow:**
1. Admin registers via `/api/admin/register/` → created as `is_active=False`
2. Superadmin approves via `PATCH /api/admin/users/<id>/` with `{"action": "approve"}`
3. Admin receives email notification and can now log in

---

## Superadmin Credentials

Created automatically on every deploy:

| Field | Value |
|-------|-------|
| Email | `superadmin@africaagility.org` |
| Password | `12345678` |

---

## Local Development

```bash
cd acabridge
pip install -r requirements.txt
cp .env.example .env   # fill in your values
python manage.py migrate
python manage.py seed_countries_tracks
python manage.py create_superuser_env
python manage.py runserver
```

Required `.env` values:
```
SECRET_KEY=your-secret-key
DEBUG=True
BREVO_API_KEY=your-brevo-key
SENDER_EMAIL=noreply@yourdomain.com
SENDER_NAME=AcaBridge HUB
FRONTEND_URL=http://localhost:3000
```

---

## Deployment (Render)

Build command:
```
pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate && python manage.py seed_countries_tracks && python manage.py create_superuser_env
```

Start command:
```
python manage.py migrate && python manage.py create_superuser_env && gunicorn acabridge.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --timeout 60
```
