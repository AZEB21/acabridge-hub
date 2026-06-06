from django.contrib.auth.models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
import logging
import threading

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics

from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings

from .models import User, OTPCode, TrainingTrack, Cohort, Countries
from .serializers import (
    AdminRegisterSerializer,
    CountriesSerializer,
    RegisterSerializer,
    TrainingTrackSerializer,
    VerifyOTPSerializer,
    ResendOTPSerializer,
    SignInSerializer,
    UserSerializer,
    ForgotPasswordSerializer,
    ResetPasswordSerializer,
    ProfileSerializer,   
)

logger = logging.getLogger(__name__)


token_generator = PasswordResetTokenGenerator()

# ═══════════════════════════════════════════════════════════════════════════════
# AZEB'S VIEWS — Auth & Onboarding
# ═══════════════════════════════════════════════════════════════════════════════
# ─── Helpers ───────────────────────────────────────────────────────────────────

def _get_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def _send_otp_email(user, code):
    def _send():
        try:
            logger.info(
                f"[OTP] Sending to {user.email} | "
                f"backend={settings.EMAIL_BACKEND} | "
                f"host={settings.EMAIL_HOST} | "
                f"user={settings.EMAIL_HOST_USER or 'NOT SET'}"
            )
            send_mail(
                subject='Your AcaBridge verification code',
                message=(
                    f'Your 6-digit verification code is: {code}\n\n'
                    f'This code expires in 10 minutes.\n\n'
                    f'If you did not request this, ignore this email.'
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )
            logger.info(f"[OTP] Email sent successfully to {user.email}")
        except Exception as e:
            logger.error(f"[OTP] Failed to send email to {user.email}: {e}")

    threading.Thread(target=_send, daemon=True).start()


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



# ─── Profile Setup ─────────────────────────────────────────────────────────────

class ProfileSetupView(APIView):
    """
    GET  /api/onboarding/profile/ — returns current user's profile fields
    PATCH /api/onboarding/profile/ — updates age, nationality, location, bio, career_goal, photo
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(ProfileSerializer(request.user).data)
    
class CountriesListView(ListAPIView):
    queryset = Countries.objects.all()
    serializer_class = CountriesSerializer
    permission_classes = [AllowAny]

class TrainingTracksView(ListAPIView):
    queryset = TrainingTrack.objects.all()
    serializer_class = TrainingTrackSerializer
    permission_classes = [AllowAny]

class SubmitApplicationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Implementation for submitting application
        pass

class ForgotPasswordView(APIView):

    def post(self, request):

        serializer = ForgotPasswordSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        email = serializer.validated_data['email']

        try:
            user = User.objects.get(email=email)

        except User.DoesNotExist:

            return Response({
                "message":
                "If account exists, reset email sent"
            })

        # Generate uid
        uid = urlsafe_base64_encode(
            force_bytes(user.pk)
        )

        # Generate token
        token = token_generator.make_token(user)

        # Frontend reset URL
        reset_url = (
            f"http://localhost:3000/"
            f"reset-password/{uid}/{token}"
        )

        # Send email
        send_mail(
            subject="Reset Your Password",
            message=f"Click here: {reset_url}",
            from_email=None,
            recipient_list=[email],
        )

        return Response({
            "message":
            "Reset link sent successfully"
        })

class ResetPasswordView(APIView):

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

# ═══════════════════════════════════════════════════════════════════════════════
# AUSTA'S VIEWS — add below this line
# Endpoints to implement:
#   GET/PATCH  /api/onboarding/profile/
#   GET        /api/onboarding/tracks/
#   POST       /api/onboarding/submit/
#   GET        /api/application/status/
#   GET        /api/application/preview/
#   PATCH      /api/application/edit/
#   GET        /api/dashboard/
# ═══════════════════════════════════════════════════════════════════════════════
    def patch(self, request):
        serializer = ProfileSerializer(request.user, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        logger.info(f"[Profile] Updated for {request.user.email}")
        return Response(UserSerializer(request.user).data)
