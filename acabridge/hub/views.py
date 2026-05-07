import logging
import threading

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings

from .models import User, OTPCode
from .serializers import (
    RegisterSerializer,
    VerifyOTPSerializer,
    ResendOTPSerializer,
    SignInSerializer,
    UserSerializer,
)

logger = logging.getLogger(__name__)


# ─── Helpers ───────────────────────────────────────────────────────────────────

def _get_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def _send_otp_email(user, code):
    """
    Send OTP in a background thread so it never blocks the HTTP response.
    Logs success/failure to Render logs.
    """
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
    """
    POST /api/auth/register/
    { full_name, email, password, confirm_password }
    Creates user, sends OTP email. Returns 201 immediately.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()
        otp = OTPCode.generate(user)
        _send_otp_email(user, otp.code)

        return Response(
            {'message': 'Account created. Check your email for the verification code.'},
            status=status.HTTP_201_CREATED,
        )


class VerifyOTPView(APIView):
    """
    POST /api/auth/verify-otp/
    { email, code }
    Validates OTP, marks email verified, returns JWT tokens.
    """
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
    """
    POST /api/auth/resend-otp/
    { email }
    Invalidates all old OTPs, generates a fresh one, sends it.
    """
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

        otp = OTPCode.generate(user)  # invalidates old codes automatically
        _send_otp_email(user, otp.code)

        return Response({'message': 'New verification code sent.'})


class SignInView(APIView):
    """
    POST /api/auth/signin/
    { email, password }
    Returns JWT tokens. Blocks unverified users.
    """
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
    """
    POST /api/auth/signout/
    { refresh }
    Blacklists the refresh token.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = RefreshToken(request.data.get('refresh'))
            token.blacklist()
            return Response({'message': 'Signed out.'})
        except Exception:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)


class MeView(APIView):
    """
    GET /api/auth/me/
    Returns current user's profile data.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
