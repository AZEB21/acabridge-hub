# 📘 AcaBridge Hub API

A backend API for the AcaBridge student onboarding platform built with Django and Django REST Framework.  
It handles authentication, student applications, and admin workflow management.

---

## 🚀 Features

- Custom User Authentication system
- JWT-based login & token refresh
- Student registration
- Secure API authentication
- Application submission system
- Admin application management (view & status update)
- Basic dashboard-ready structure

---

## 🏗️ Tech Stack

- Python
- Django
- Django REST Framework (DRF)
- SimpleJWT
- SQLite (development)

---

## 🔐 Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Obtain JWT token |
| POST | `/api/auth/token/refresh/` | Refresh JWT token |
| GET | `/api/auth/user/` | Get logged-in user |

---

## 📝 Application Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/application/` | Submit application |
| GET | `/api/application/admin/` | View all applications (admin) |
| PATCH | `/api/application/<id>/status/` | Update application status |

---

## 📦 Application Fields

- full_name  
- email  
- cohort  
- skills  
- motivation  
- status (pending, reviewed, accepted, rejected)  
- user (auto-assigned via authentication)

---

## 🔐 Permissions

- Authenticated users can submit applications
- Admin users can manage all applications
- JWT token required for protected routes

---

## ⚙️ Setup

```bash
git clone <https://github.com/AZEB21/acabridge-hub.git>
cd acabridge-hub

python -m venv venv
venv\Scripts\activate  # Windows

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate

python manage.py createsuperuser

python manage.py runserver

Authorization: Bearer <your_token>
Content-Type: application/json