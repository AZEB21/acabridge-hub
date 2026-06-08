from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
import logging
import os
import threading

import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics

from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from django.conf import settings

from .models import User, OTPCode, TrainingTrack, Cohort, Countries
from .serializers import (
    AdminRegisterSerializer,
    CountrySerializer,
    RegisterSerializer,
    TrainingTrackSerializer,
    VerifyOTPSerializer,
    ResendOTPSerializer,
    SignInSerializer,
    UserSerializer,
    ForgotPasswordSerializer,
    ResetPasswordSerializer,
    ProfileSerializer,
    CountrySerializer,
)

logger = logging.getLogger(__name__)
token_generator = PasswordResetTokenGenerator()


# ─── Token helper ─────────────────────────────────────────────────────────────

def _get_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access':  str(refresh.access_token),
    }


# ─── Brevo HTTPS email helper ─────────────────────────────────────────────────

def _send_email(to_email: str, subject: str, body: str) -> None:
    """
    Send a transactional email via Brevo HTTPS API.
    Runs in a daemon thread so it never blocks the request.
    Uses settings.BREVO_API_KEY / SENDER_EMAIL / SENDER_NAME.
    """
    def _send():
        try:
            configuration = sib_api_v3_sdk.Configuration()
            configuration.api_key['api-key'] = settings.BREVO_API_KEY

            api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
                sib_api_v3_sdk.ApiClient(configuration)
            )

            send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
                to=[{"email": to_email}],
                sender={"name": settings.SENDER_NAME, "email": settings.SENDER_EMAIL},
                subject=subject,
                text_content=body,
            )

            api_instance.send_transac_email(send_smtp_email)
            logger.info(f"[Email] Sent '{subject}' to {to_email}")

        except ApiException as e:
            logger.error(f"[Email] Brevo API error sending to {to_email}: {e}")
        except Exception as e:
            logger.error(f"[Email] Unexpected error sending to {to_email}: {e}")

    threading.Thread(target=_send, daemon=True).start()


# ─── OTP email wrapper ────────────────────────────────────────────────────────

def _send_otp_email(user, code: str) -> None:
    _send_email(
        to_email=user.email,
        subject='Your AcaBridge verification code',
        body=(
            f'Your 6-digit verification code is: {code}\n\n'
            f'This code expires in 10 minutes.\n\n'
            f'If you did not request this, ignore this email.'
        ),
    )


# ─── Auth Views ────────────────────────────────────────────────────────────────

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()
        otp = OTPCode.generate(user)
        _send_otp_email(user, otp.code)

        return Response(
            {
                'message': 'Account created. Check your email for the verification code.',
                'dev_otp': otp.code,
            },
            status=status.HTTP_201_CREATED,
        )


class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data['email']
        code = serializer.validated_data['code']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        otp = OTPCode.objects.filter(user=user, code=code, is_used=False).last()
        if not otp or not otp.is_valid():
            return Response(
                {'error': 'Invalid or expired code. Request a new one.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        otp.is_used = True
        otp.save()
        user.is_email_verified = True
        user.save()

        logger.info(f"[Auth] Email verified for {user.email}")

        return Response({
            'message': 'Email verified.',
            'tokens': _get_tokens(user),
            'user': UserSerializer(user).data,
        })


class ResendOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ResendOTPSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=serializer.validated_data['email'])
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        if user.is_email_verified:
            return Response(
                {'error': 'This email is already verified.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        otp = OTPCode.generate(user)
        _send_otp_email(user, otp.code)

        return Response({'message': 'New verification code sent.', 'dev_otp': otp.code})


class SignInView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignInSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(
            username=serializer.validated_data['email'],
            password=serializer.validated_data['password'],
        )

        if not user:
            return Response(
                {'error': 'Invalid email or password.'},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.is_email_verified:
            return Response(
                {'error': 'Please verify your email before signing in.'},
                status=status.HTTP_403_FORBIDDEN,
            )

        logger.info(f"[Auth] Sign in: {user.email}")

        return Response({
            'message': 'Signed in.',
            'tokens': _get_tokens(user),
            'user': UserSerializer(user).data,
        })


class SignOutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = RefreshToken(request.data.get('refresh'))
            token.blacklist()
            return Response({'message': 'Signed out.'})
        except Exception:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
    
class TrainingTrackListView(generics.ListAPIView):
    queryset = TrainingTrack.objects.all()
    serializer_class = TrainingTrackSerializer
    permission_classes = [AllowAny]


class CountryListView(generics.ListAPIView):
    queryset = Countries.objects.all()
    serializer_class = CountrySerializer
    permission_classes = [AllowAny]


# ─── Profile Setup ────────────────────────────────────────────────────────────

class ProfileSetupView(APIView):
    """
    GET  /api/onboarding/profile/ — returns current user's profile fields
    PATCH /api/onboarding/profile/ — updates profile fields
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def patch(self, request):
        serializer = ProfileSerializer(request.user, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        logger.info(f"[Profile] Updated for {request.user.email}")
        return Response(UserSerializer(request.user).data)


class RegisterAPIView(CreateAPIView):
    """
    POST /api/auth/register/
    Body: { full_name, email, password, confirm_password }
    Creates user, sends OTP to email.
    """
    serializer_class = AdminRegisterSerializer

class AdminDashboardView(APIView):
    """
    GET /api/admin/dashboard/
    Returns admin-specific data.
    Requires: Authorization: Bearer <access_token> with admin privileges
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_staff:
            return Response({'error': 'Unauthorized.'}, status=status.HTTP_403_FORBIDDEN)

        return Response({
            "total_student": 1000,
            "total_courses": 50,
            "total_applications": 2000,
            "active_users": 150
        })


class CountriesListView(ListAPIView):
    queryset = Countries.objects.all()
    serializer_class = CountrySerializer

class TrainingTracksView(ListAPIView):
    queryset = TrainingTrack.objects.all()
    serializer_class = TrainingTrackSerializer

class SubmitApplicationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from applications.models import Application as AppModel
        from hub.models import Cohort, TrainingTrack

        # Accept either a track name (string) or track id (int)
        track_name = request.data.get('training_track_id') or request.data.get('track_name')
        if not track_name:
            return Response({'error': 'training_track_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Look up the track — try by name first, then by id
        track = None
        try:
            # if it's a digit string or int, try id lookup
            track = TrainingTrack.objects.get(pk=int(track_name))
        except (ValueError, TypeError, TrainingTrack.DoesNotExist):
            pass

        if not track:
            try:
                track = TrainingTrack.objects.get(name__iexact=str(track_name))
            except TrainingTrack.DoesNotExist:
                # Auto-create if not seeded yet (graceful fallback)
                track, _ = TrainingTrack.objects.get_or_create(name=str(track_name))

        # Get or create the active cohort
        cohort = Cohort.objects.filter(is_active=True, applications_open=True).first()
        if not cohort:
            cohort, _ = Cohort.objects.get_or_create(name='Cohort 9.0', defaults={'is_active': True, 'applications_open': True})

        # Create or update the application
        application, created = AppModel.objects.update_or_create(
            user=request.user,
            defaults={
                'training_track': track,
                'cohort': cohort,
                'status': AppModel.STATUS_APPLIED,
            }
        )

        logger.info(f"[Application] {'Created' if created else 'Updated'} for {request.user.email} — track: {track.name}")

        return Response({
            'message': 'Application submitted successfully.',
            'track': track.name,
            'cohort': cohort.name,
            'status': application.status,
        }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Security: never reveal whether the email exists
            return Response({"message": "If an account exists, a reset link has been sent."})

        uid   = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)

        frontend_url = getattr(settings, 'FRONTEND_URL', 'http://localhost:3000')
        reset_url    = f"{frontend_url}/reset-password/{uid}/{token}"

        _send_email(
            to_email=email,
            subject='Reset your AcaBridge password',
            body=(
                f'Hi {user.full_name},\n\n'
                f'You requested a password reset for your AcaBridge account.\n\n'
                f'Click the link below to set a new password:\n'
                f'{reset_url}\n\n'
                f'This link expires in 1 hour.\n\n'
                f'If you did not request this, ignore this email — your password is unchanged.'
            ),
        )

        response_data = {"message": "If an account exists, a reset link has been sent."}
        if settings.DEBUG:
            response_data['dev_reset_url'] = reset_url

        return Response(response_data)

class ResetPasswordView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, uidb64, token):

        serializer = ResetPasswordSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        try:
            uid = force_str(
                urlsafe_base64_decode(uidb64)
            )

            user = User.objects.get(pk=uid)

        except Exception:

            return Response({
                "error": "Invalid user"
            }, status=400)

        # Validate token
        if not token_generator.check_token(
            user,
            token
        ):

            return Response({
                "error":
                "Invalid or expired token"
            }, status=400)

        # Set new password
        user.set_password(
            serializer.validated_data['password']
        )

        user.save()

        return Response({
            "message":
            "Password reset successful"
        })
