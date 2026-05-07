from pathlib import Path
from datetime import timedelta
import os
import logging
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env for local dev — Render sets env vars directly, so this is a no-op there
load_dotenv(BASE_DIR / '.env')

# ─── Core ──────────────────────────────────────────────────────────────────────

SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-change-me-in-production')

DEBUG = os.environ.get('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost 127.0.0.1').split()

# ─── Apps ──────────────────────────────────────────────────────────────────────

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'hub.apps.HubConfig',
    'applications.apps.ApplicationsConfig',
    'dashboard.apps.DashboardConfig',
]

# ─── Middleware ─────────────────────────────────────────────────────────────────

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'acabridge.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'acabridge.wsgi.application'

# ─── Database — SQLite only ─────────────────────────────────────────────────────
# On Render, DB_PATH can point to a persistent disk mount e.g. /var/data/db.sqlite3
# Locally it uses BASE_DIR/db.sqlite3

_db_path = os.environ.get('DB_PATH', str(BASE_DIR / 'db.sqlite3'))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': _db_path,
    }
}

# ─── Auth ───────────────────────────────────────────────────────────────────────

AUTH_USER_MODEL = 'hub.User'

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ─── Internationalisation ───────────────────────────────────────────────────────

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Lagos'
USE_I18N = True
USE_TZ = True

# ─── Static files ───────────────────────────────────────────────────────────────

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ─── Email ──────────────────────────────────────────────────────────────────────
# Brevo (formerly Sendinblue) SMTP — works on Render free tier, no domain needed.
# Falls back to console for local dev.

BREVO_SMTP_USER = os.environ.get('BREVO_SMTP_USER', '')
BREVO_SMTP_KEY  = os.environ.get('BREVO_SMTP_KEY', '')

if BREVO_SMTP_USER and BREVO_SMTP_KEY:
    EMAIL_BACKEND     = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST        = 'smtp-relay.brevo.com'
    EMAIL_PORT        = 587
    EMAIL_USE_TLS     = True
    EMAIL_HOST_USER   = BREVO_SMTP_USER
    EMAIL_HOST_PASSWORD = BREVO_SMTP_KEY
    DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', f'AcaBridge <{BREVO_SMTP_USER}>')
else:
    EMAIL_BACKEND     = 'django.core.mail.backends.console.EmailBackend'
    DEFAULT_FROM_EMAIL = 'AcaBridge <noreply@acabridge.com>'

OTP_EXPIRY_MINUTES = 10

# ─── Logging ────────────────────────────────────────────────────────────────────

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
    'loggers': {
        'hub.views': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}

# ─── REST Framework ─────────────────────────────────────────────────────────────

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

# ─── JWT ────────────────────────────────────────────────────────────────────────

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# ─── CORS ───────────────────────────────────────────────────────────────────────

_cors_default = 'http://localhost:3000 http://127.0.0.1:3000'
CORS_ALLOWED_ORIGINS = os.environ.get('CORS_ALLOWED_ORIGINS', _cors_default).split()
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = False

# ─── Production security ────────────────────────────────────────────────────────

if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = False  # Render terminates SSL at load balancer
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
