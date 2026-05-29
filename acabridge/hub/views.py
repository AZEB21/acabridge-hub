from django.contrib.auth.models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str

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
    ForgotPasswordSerializer,
    ResetPasswordSerializer,
)


token_generator = PasswordResetTokenGenerator()

# ═══════════════════════════════════════════════════════════════════════════════
# AZEB'S VIEWS — Auth & Onboarding
# ═══════════════════════════════════════════════════════════════════════════════

def _get_tokens(user):
    """Generate JWT access + refresh tokens for a user."""
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def _send_otp_email(user, code):
    """Send OTP code to user's email."""
    send_mail(
        subject='Your AcaBridge verification code',
        message=f'Your 6-digit verification code is: {code}\n\nExpires in 10 minutes.',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=True,
    )


class RegisterView(APIView):
    """
    POST /api/auth/register/
    Body: { full_name, email, password, confirm_password }
    Creates user, sends OTP to email.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            otp = OTPCode.generate(user)
            _send_otp_email(user, otp.code)
            return Response(
                {'message': 'Account created. Check your email for the verification code.'},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyOTPView(APIView):
    """
    POST /api/auth/verify-otp/
    Body: { email, code }
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
                {'error': 'Invalid or expired code.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        otp.is_used = True
        otp.save()
        user.is_email_verified = True
        user.save()

        return Response({
            'message': 'Email verified.',
            'tokens': _get_tokens(user),
            'user': UserSerializer(user).data,
        })


class ResendOTPView(APIView):
    """
    POST /api/auth/resend-otp/
    Body: { email }
    Invalidates old OTPs and sends a fresh one.
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

        otp = OTPCode.generate(user)
        _send_otp_email(user, otp.code)
        return Response({'message': 'New code sent.'})


class SignInView(APIView):
    """
    POST /api/auth/signin/
    Body: { email, password }
    Returns JWT tokens on valid credentials.
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

        return Response({
            'message': 'Signed in.',
            'tokens': _get_tokens(user),
            'user': UserSerializer(user).data,
        })


class SignOutView(APIView):
    """
    POST /api/auth/signout/
    Body: { refresh }
    Blacklists the refresh token so it can't be reused.
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
    Returns current logged-in user's data.
    Requires: Authorization: Bearer <access_token>
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)

class UserDetailView(APIView):
    """
    Returns the logged-in user's details
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response({
            "id": user.id,
            "username": user.email,
            "email": user.email,
        })


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
