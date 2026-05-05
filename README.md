# AcaBridge HUB

Student onboarding and learning portal for Africa Agility's cohort-based tech training program.

---

## Repo Structure

```
acabridge-hub/
├── backend/                        # Django REST API
│   ├── acabridge/                  # Django project config
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── hub/                        # Main app
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── admin.py
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/                       # React app
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js            # Axios instance + JWT interceptors
│   │   │   └── auth.js             # All API call functions
│   │   ├── pages/
│   │   │   ├── Landing.jsx         ✅ Done
│   │   │   ├── Register.jsx        ✅ Done (Step 1)
│   │   │   ├── VerifyOTP.jsx       ✅ Done (Step 2)
│   │   │   ├── ProfileSetup.jsx    ✅ Done (Step 3)
│   │   │   ├── ChooseTrack.jsx     ✅ Done (Step 4)
│   │   │   ├── SignIn.jsx          🔲 Teammate (Week 2)
│   │   │   ├── ApplicationStatus.jsx 🔲 Teammate (Week 2)
│   │   │   └── Dashboard.jsx       🔲 Teammate (Week 2)
│   │   ├── App.jsx                 # Routes
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

## Team Split

| Part | Owner | Status |
|------|-------|--------|
| Django API — Register, OTP, Profile, Track | Backend dev | ✅ Week 1 done |
| React UI — Onboarding flow (Steps 1–4) | React dev | ✅ Scaffolded |
| Django API — SignIn, Dashboard, Application status | Backend dev | 🔲 Week 2 |
| React UI — SignIn, Dashboard, Application status | React dev | 🔲 Week 2 |

---

## Backend Setup

```bash
cd backend
py -3.13 -m pip install -r requirements.txt
cp .env.example .env
py -3.13 manage.py makemigrations hub
py -3.13 manage.py migrate
py -3.13 manage.py createsuperuser
py -3.13 manage.py runserver
```

API runs at `http://localhost:8000/api/`

### Seed data (run once)

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

## API Reference (Week 1 endpoints)

All endpoints are prefixed with `/api/`

### Step 1 — Register
```
POST /api/auth/register/
Body: { full_name, email, password, confirm_password }
Response 201: { message }
```

### Step 2 — Verify OTP
```
POST /api/auth/verify-otp/
Body: { email, code }
Response 200: { message, tokens: { access, refresh }, user }
```
```
POST /api/auth/resend-otp/
Body: { email }
```
```
POST /api/auth/token/refresh/
Body: { refresh }
Response: { access }
```

### Step 3 — Profile Setup _(Bearer token required)_
```
PATCH /api/onboarding/profile/
Body: multipart/form-data — profile_photo, age, nationality, location, bio, career_goal
Response 200: { message, user }

GET /api/onboarding/profile/
Response 200: { user }
```

### Step 4 — Choose Track _(Bearer token required)_
```
GET /api/onboarding/tracks/
Response 200: { cohort: { id, name }, tracks: [{ id, name }] }

POST /api/onboarding/submit/
Body: { training_track_id }
Response 201: { message, application: { id, cohort, training_track, status } }
```

### Current User
```
GET /api/auth/me/
Response 200: { id, email, full_name, ... }
```

---

## Auth Flow for React

1. `POST /api/auth/register/` → store email in state, go to `/verify-otp`
2. `POST /api/auth/verify-otp/` → save `access` + `refresh` to localStorage, go to `/onboarding/profile`
3. `PATCH /api/onboarding/profile/` → send `Authorization: Bearer <access>`, go to `/onboarding/track`
4. `GET /api/onboarding/tracks/` → populate dropdown
5. `POST /api/onboarding/submit/` → go to `/application/status` (Week 2)

The `axios.js` file handles token attachment and auto-refresh automatically.

---

## Contributing

- Never commit `.env` or `db.sqlite3`
- Branch naming: `feat/`, `fix/`, `chore/`
- PR into `main` for review
