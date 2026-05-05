from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework_simplejwt.tokens import RefreshToken

from django.core.mail import send_mail
from django.conf import settings

from .models import User, OTPCode, Cohort, Application, TrainingTrack
from .serializers import (
    RegisterSerializer, VerifyOTPSerializer, ResendOTPSerializer,
    ProfileSerializer, TrainingTrackSerializer, CohortSerializer,
    ChooseTrackSerializer, UserSerializer,
)


def _get_tokens(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def _send_otp(user, code):
    send_mail(
        subject='Your AcaBridge verification code',
        message=f'Your 6-digit verification code is: {code}\n\nExpires in 10 minutes.',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=True,
    )


# ─── Step 1: Register ────────────────────────────────────────────────────────

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            otp = OTPCode.generate(user)
            _send_otp(user, otp.code)
            return Response(
                {'message': 'Account created. Check your email for the verification code.'},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ─── Step 2: Verify OTP ──────────────────────────────────────────────────────

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
            return Response({'error': 'Invalid or expired code.'}, status=status.HTTP_400_BAD_REQUEST)

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
        _send_otp(user, otp.code)
        return Response({'message': 'New code sent.'})


# ─── Step 3: Profile Setup ───────────────────────────────────────────────────

class ProfileSetupView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def patch(self, request):
        serializer = ProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Profile updated.',
                'user': UserSerializer(request.user).data,
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ─── Step 4: Choose Track ────────────────────────────────────────────────────

class TrainingTracksView(APIView):
    """Returns available tracks and current cohort for the dropdown."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cohort = Cohort.objects.filter(is_active=True).first()
        tracks = TrainingTrack.objects.all()
        return Response({
            'cohort': CohortSerializer(cohort).data if cohort else None,
            'tracks': TrainingTrackSerializer(tracks, many=True).data,
        })


class SubmitApplicationView(APIView):
    """Step 4 — submit application with chosen track."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChooseTrackSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        cohort = Cohort.objects.filter(is_active=True).first()
        if not cohort:
            return Response({'error': 'No active cohort found.'}, status=status.HTTP_400_BAD_REQUEST)

        track = serializer.validated_data['training_track']

        application, created = Application.objects.update_or_create(
            user=request.user,
            defaults={'cohort': cohort, 'training_track': track},
        )

        return Response({
            'message': 'Application submitted.' if created else 'Application updated.',
            'application': {
                'id': application.id,
                'cohort': application.cohort.name,
                'training_track': application.training_track.name,
                'status': application.status,
            },
        }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


# ─── Current User ────────────────────────────────────────────────────────────

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
