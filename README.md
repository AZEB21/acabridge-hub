# AcaBridge HUB

Student onboarding and learning portal for Africa Agility's cohort-based tech training program.

---

## Team

| Role | Name | Part |
|------|------|------|
| Backend Dev | Azeb Yirga | Django API — onboarding flow  |
| Backend Dev | Teammate | Django API — signin, dashboard, application status |
| Frontend Dev | Danielle Mabouanda | React UI — all screens |

---

## Repo Structure

```
acabridge-hub/
├── acabridge/              # Django REST API (backend)
│   ├── acabridge/          # Django project config
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── hub/                # Main app
│   │   ├── migrations/
│   │   ├── models.py       # User, OTPCode, Cohort, TrainingTrack, Application, Module, LiveClass
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/               # React app
│   ├── public/
│   └── src/
│       ├── api/
│       │   ├── axios.js    # Axios instance with JWT auto-attach + refresh
│       │   └── auth.js     # All API call functions
│       ├── pages/
│       │   ├── Landing.jsx
│       │   ├── Register.jsx
│       │   ├── VerifyOTP.jsx
│       │   ├── ProfileSetup.jsx
│       │   ├── ChooseTrack.jsx
│       │   ├── SignIn.jsx
│       │   ├── ApplicationStatus.jsx
│       │   └── Dashboard.jsx
│       ├── App.jsx         # All routes defined here
│       └── index.js
│
└── README.md
```

---

## What's Built 

Django REST API for the full student onboarding flow:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register/` | POST | Create account, send OTP to email |
| `/api/auth/verify-otp/` | POST | Validate OTP, return JWT tokens |
| `/api/auth/resend-otp/` | POST | Resend a fresh OTP |
| `/api/auth/token/refresh/` | POST | Refresh access token |
| `/api/auth/me/` | GET | Get current user info |
| `/api/onboarding/profile/` | GET / PATCH | Get or update student profile |
| `/api/onboarding/tracks/` | GET | Get active cohort + available tracks |
| `/api/onboarding/submit/` | POST | Submit application with chosen track |
| `/api/auth/signin/` | POST | Email + password login, return JWT tokens |
| `/api/auth/signout/` | POST | Blacklist refresh token |
| `/api/application/status/` | GET | Student's application + 4-step pipeline |
| `/api/application/preview/` | GET | All submitted application details |
| `/api/application/edit/` | PATCH | Update track or profile |
| `/api/dashboard/` | GET | Modules progress, live classes, certificate status |


### Frontend
Build the UI for all 8 pages in `frontend/src/pages/` to match the Figma designs.
- API functions are ready in `src/api/auth.js` — just import and call them
- Token handling is automatic via `src/api/axios.js` — don't touch it
- Routes are registered in `App.jsx` — don't touch it
- Design colors: navy `#0d2137`, teal `#2ec4b6`, background `#f5f4ef`

---

## Backend Setup

```bash
cd acabridge
py -3.13 -m pip install -r requirements.txt
cp .env.example .env
py -3.13 manage.py makemigrations hub
py -3.13 manage.py migrate
py -3.13 manage.py createsuperuser
py -3.13 manage.py runserver
```

API runs at `http://localhost:8000/api/`

### Seed data (run once after migrate)

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

```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost 127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your@email.com
EMAIL_HOST_PASSWORD=your-app-password
```

> OTP codes print to the terminal in development — no SMTP setup needed locally.

---

## Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm start
```

React app runs at `http://localhost:3000`

---

## Auth Flow

1. `POST /api/auth/register/` — save email, redirect to verify OTP screen
2. `POST /api/auth/verify-otp/` — save `access` + `refresh` tokens to localStorage
3. `PATCH /api/onboarding/profile/` — optional profile info, send `Authorization: Bearer <token>`
4. `GET /api/onboarding/tracks/` + `POST /api/onboarding/submit/` — pick track, submit application
5. `GET /api/application/status/` — show pipeline 
6. `GET /api/dashboard/` — student dashboard

---

## Contributing

- Never commit `.env` or `db.sqlite3`
- Branch naming: `feat/`, `fix/`, `chore/`
- PR into `main` for review
