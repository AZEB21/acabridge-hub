# AcaBridge HUB

Student onboarding and learning portal for Africa Agility's cohort-based tech training program.

## Repo Structure

```
acabridge-hub/
├── backend/        # Django REST backend (Python)
├── frontend/       # React frontend (coming Week 2)
└── README.md
```

---

## Backend (Django)

Handles all business logic: authentication, OTP verification, student profiles, applications, cohorts, and the student dashboard.

### Tech Stack

- Python 3.13
- Django 4.2
- SQLite (dev) → PostgreSQL (prod)
- Pillow (image uploads)
- Whitenoise (static files)
- Gunicorn (production server)

### Local Setup

```bash
cd backend
py -3.13 -m pip install -r requirements.txt
cp .env.example .env
py -3.13 manage.py makemigrations hub
py -3.13 manage.py migrate
py -3.13 manage.py createsuperuser
py -3.13 manage.py runserver
```

App runs at `http://127.0.0.1:8000`

### Seed Data (required after first migrate)

```bash
py -3.13 manage.py shell
```

```python
from hub.models import Cohort, TrainingTrack
Cohort.objects.create(name="Cohort 9.0", is_active=True, applications_open=True)
TrainingTrack.objects.create(name="Product Management")
TrainingTrack.objects.create(name="Data Analytics")
TrainingTrack.objects.create(name="Software Engineering")
TrainingTrack.objects.create(name="UI/UX Design")
exit()
```

### Environment Variables

Copy `.env.example` to `.env` and fill in:

```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost 127.0.0.1

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your@email.com
EMAIL_HOST_PASSWORD=your-app-password
```

> During development, OTP codes print to the terminal (console email backend). No SMTP setup needed locally.

### URL Routes

| URL | View |
|-----|------|
| `/` | Landing page |
| `/signup/` | Create account (Step 1) |
| `/verify-email/` | OTP verification (Step 2) |
| `/onboarding/profile/` | Profile setup (Step 3) |
| `/onboarding/track/` | Choose training track (Step 4) |
| `/application/status/` | Application status (Step 5) |
| `/application/preview/` | Preview application |
| `/application/edit/` | Edit application |
| `/dashboard/` | Student dashboard |
| `/signin/` | Sign in |
| `/signout/` | Sign out |
| `/admin/` | Admin panel |

### Models

- `User` — custom user model (email-based auth + profile fields)
- `OTPCode` — 6-digit email verification codes
- `Cohort` — training cohorts (e.g. Cohort 9.0)
- `TrainingTrack` — available tracks (Product Management, etc.)
- `Application` — student application with status pipeline
- `Module` — course modules per track
- `ModuleProgress` — tracks which modules a student completed
- `LiveClass` — scheduled live sessions per cohort

### Application Status Pipeline

```
Applied → Reviewed → Accepted → Enrolled
```

Admin can bulk-update application statuses from the admin panel.

---

## Frontend (React) — Week 2

> To be added by the frontend team.

Expected structure:

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
├── package.json
└── .env.example
```

The React app will consume the Django backend via REST API endpoints (to be added in Week 2).

---

## Contributing

- Backend work goes in `backend/`
- Frontend work goes in `frontend/`
- Never commit `.env` files or `db.sqlite3`
- Branch naming: `feat/`, `fix/`, `chore/`
- Open a PR against `main` for review

---

## Team

| Role | Name |
|------|------|
| Backend | Azeb Yirga |
| Frontend | _(teammate)_ |
