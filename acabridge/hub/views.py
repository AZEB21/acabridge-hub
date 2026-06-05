from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import CreateAPIView
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings

from .models import User, OTPCode
from .serializers import (
    AdminRegisterSerializer,
    RegisterSerializer,
    VerifyOTPSerializer,
    ResendOTPSerializer,
    SignInSerializer,
    UserSerializer,
)


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
