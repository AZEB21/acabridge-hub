from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
import logging
import threading

import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException

from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import ListAPIView, CreateAPIView
from django.contrib.auth import authenticate
from django.conf import settings

from .models import User, OTPCode, TrainingTrack, Cohort, Countries, Application
from .serializers import (
    AdminRegisterSerializer,
    ApplicationAdminSerializer,
    CohortSerializer,
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


# ─── Brevo email helper ───────────────────────────────────────────────────────

def _send_email(to_email: str, subject: str, body: str) -> None:
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
            logger.error(f"[Email] Brevo error for {to_email}: {e}")
        except Exception as e:
            logger.error(f"[Email] Unexpected error for {to_email}: {e}")
    threading.Thread(target=_send, daemon=True).start()


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


# ─── Auth ─────────────────────────────────────────────────────────────────────

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
            {'message': 'Account created. Check your email for the verification code.', 'dev_otp': otp.code},
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
            return Response({'error': 'Invalid or expired code.'}, status=status.HTTP_400_BAD_REQUEST)
        otp.is_used = True
        otp.save()
        user.is_email_verified = True
        user.save()
        logger.info(f"[Auth] Email verified for {user.email}")
        return Response({'message': 'Email verified.', 'tokens': _get_tokens(user), 'user': UserSerializer(user).data})


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
            return Response({'error': 'Already verified.'}, status=status.HTTP_400_BAD_REQUEST)
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
            return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)
        if not user.is_email_verified:
            return Response({'error': 'Please verify your email before signing in.'}, status=status.HTTP_403_FORBIDDEN)
        logger.info(f"[Auth] Sign in: {user.email}")
        return Response({'message': 'Signed in.', 'tokens': _get_tokens(user), 'user': UserSerializer(user).data})


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


# ─── Profile ──────────────────────────────────────────────────────────────────

class ProfileSetupView(APIView):
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


# ─── Reference data ───────────────────────────────────────────────────────────

class TrainingTrackListView(generics.ListAPIView):
    queryset = TrainingTrack.objects.all()
    serializer_class = TrainingTrackSerializer
    permission_classes = [AllowAny]


class TrainingTracksView(generics.ListAPIView):
    queryset = TrainingTrack.objects.all()
    serializer_class = TrainingTrackSerializer
    permission_classes = [AllowAny]


class CountryListView(generics.ListAPIView):
    queryset = Countries.objects.all()
    serializer_class = CountrySerializer
    permission_classes = [AllowAny]


class CountriesListView(generics.ListAPIView):
    queryset = Countries.objects.all()
    serializer_class = CountrySerializer
    permission_classes = [AllowAny]


# ─── Admin ────────────────────────────────────────────────────────────────────

class AdminRegisterView(APIView):
    """POST /api/admin/register/ — request an admin account (pending superuser approval)."""
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AdminRegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.save()
        logger.info(f"[Admin] Registration request from {user.email} — pending approval")
        return Response(
            {'message': 'Registration submitted. Please wait for superadmin approval before logging in.'},
            status=status.HTTP_201_CREATED,
        )


class AdminLoginView(APIView):
    """POST /api/admin/login/ — admin sign in (must be is_staff and is_active)."""
    permission_classes = [AllowAny]

    def post(self, request):
        email    = request.data.get('email', '').strip()
        password = request.data.get('password', '')

        # Look up user first to give specific messages
        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)

        if not (user_obj.is_staff or user_obj.is_superuser):
            return Response({'error': 'Access denied. Admin account required.'}, status=status.HTTP_403_FORBIDDEN)

        if not user_obj.is_active:
            return Response(
                {'error': 'pending_approval',
                 'message': 'Your account is pending approval from the super admin. Please wait.'},
                status=status.HTTP_403_FORBIDDEN,
            )

        user = authenticate(username=email, password=password)
        if not user:
            return Response({'error': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)

        logger.info(f"[Admin] Login: {user.email}")
        return Response({'message': 'Signed in.', 'tokens': _get_tokens(user), 'user': UserSerializer(user).data})


class AdminDashboardView(APIView):
    """GET /api/admin/dashboard/ — real stats."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not (request.user.is_staff or request.user.is_superuser):
            return Response({'error': 'Unauthorized.'}, status=status.HTTP_403_FORBIDDEN)

        total_students = User.objects.filter(is_staff=False, is_superuser=False).count()
        active_programs = TrainingTrack.objects.count()
        pending_applications = Application.objects.filter(status=Application.STATUS_APPLIED).count()
        # Certificates issued = enrolled students
        certificates_issued = Application.objects.filter(status=Application.STATUS_ENROLLED).count()
        cohorts = Cohort.objects.filter(is_active=True)

        return Response({
            'total_students': total_students,
            'active_programs': active_programs,
            'pending_applications': pending_applications,
            'certificates_issued': certificates_issued,
            'cohorts': CohortSerializer(cohorts, many=True).data,
        })


# ─── Cohort CRUD ──────────────────────────────────────────────────────────────

class CohortListCreateView(APIView):
    """GET /api/admin/cohorts/ — list all | POST — create new."""
    permission_classes = [IsAuthenticated]

    def _check_admin(self, user):
        return user.is_staff or user.is_superuser

    def get(self, request):
        if not self._check_admin(request.user):
            return Response({'error': 'Unauthorized.'}, status=status.HTTP_403_FORBIDDEN)
        cohorts = Cohort.objects.all().order_by('-id')
        return Response(CohortSerializer(cohorts, many=True).data)

    def post(self, request):
        if not self._check_admin(request.user):
            return Response({'error': 'Unauthorized.'}, status=status.HTTP_403_FORBIDDEN)
        serializer = CohortSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        cohort = serializer.save()
        logger.info(f"[Admin] Cohort created: {cohort.name} by {request.user.email}")
        return Response(CohortSerializer(cohort).data, status=status.HTTP_201_CREATED)


class CohortDetailView(APIView):
    """PATCH /api/admin/cohorts/<pk>/ — edit | DELETE — delete."""
    permission_classes = [IsAuthenticated]

    def _check_admin(self, user):
        return user.is_staff or user.is_superuser

    def _get_cohort(self, pk):
        try:
            return Cohort.objects.get(pk=pk)
        except Cohort.DoesNotExist:
            return None

    def patch(self, request, pk):
        if not self._check_admin(request.user):
            return Response({'error': 'Unauthorized.'}, status=status.HTTP_403_FORBIDDEN)
        cohort = self._get_cohort(pk)
        if not cohort:
            return Response({'error': 'Cohort not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CohortSerializer(cohort, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(CohortSerializer(cohort).data)

    def delete(self, request, pk):
        if not self._check_admin(request.user):
            return Response({'error': 'Unauthorized.'}, status=status.HTTP_403_FORBIDDEN)
        cohort = self._get_cohort(pk)
        if not cohort:
            return Response({'error': 'Cohort not found.'}, status=status.HTTP_404_NOT_FOUND)
        cohort.delete()
        logger.info(f"[Admin] Cohort {pk} deleted by {request.user.email}")
        return Response(status=status.HTTP_204_NO_CONTENT)


# ─── Admin Application Management ────────────────────────────────────────────

class AdminApplicationsView(APIView):
    """GET /api/admin/applications/ — list all applications with optional status filter."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not (request.user.is_staff or request.user.is_superuser):
            return Response({'error': 'Unauthorized.'}, status=status.HTTP_403_FORBIDDEN)
        status_filter = request.query_params.get('status')
        qs = Application.objects.select_related('user', 'training_track', 'cohort').order_by('-submitted_at')
        if status_filter:
            qs = qs.filter(status=status_filter)
        return Response(ApplicationAdminSerializer(qs, many=True).data)


class AdminApplicationDetailView(APIView):
    """PATCH /api/admin/applications/<pk>/status/ — approve/reject/update status
       DELETE /api/admin/applications/<pk>/ — delete application"""
    permission_classes = [IsAuthenticated]

    VALID_STATUSES = [
        Application.STATUS_APPLIED,
        Application.STATUS_REVIEWED,
        Application.STATUS_ACCEPTED,
        Application.STATUS_ENROLLED,
        'rejected',
    ]

    def _check_admin(self, user):
        return user.is_staff or user.is_superuser

    def _get_app(self, pk):
        try:
            return Application.objects.select_related('user', 'training_track', 'cohort').get(pk=pk)
        except Application.DoesNotExist:
            return None

    def patch(self, request, pk):
        if not self._check_admin(request.user):
            return Response({'error': 'Unauthorized.'}, status=status.HTTP_403_FORBIDDEN)
        app = self._get_app(pk)
        if not app:
            return Response({'error': 'Application not found.'}, status=status.HTTP_404_NOT_FOUND)
        new_status = request.data.get('status')
        if new_status not in self.VALID_STATUSES:
            return Response(
                {'error': f'Invalid status. Choose from: {", ".join(self.VALID_STATUSES)}'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        app.status = new_status
        app.save()
        logger.info(f"[Admin] Application {pk} → {new_status} by {request.user.email}")

        # Notify the student
        try:
            from dashboard.models import Notification
            messages = {
                'reviewed': 'Your application is under review.',
                Application.STATUS_ACCEPTED: 'Congratulations! Your application has been accepted.',
                Application.STATUS_ENROLLED: 'You are now enrolled. Welcome to the cohort!',
                'rejected': 'Unfortunately your application was not accepted this time.',
            }
            msg = messages.get(new_status)
            if msg:
                Notification.objects.create(user=app.user, message=msg)
        except Exception:
            pass

        return Response(ApplicationAdminSerializer(app).data)

    def delete(self, request, pk):
        if not self._check_admin(request.user):
            return Response({'error': 'Unauthorized.'}, status=status.HTTP_403_FORBIDDEN)
        app = self._get_app(pk)
        if not app:
            return Response({'error': 'Application not found.'}, status=status.HTTP_404_NOT_FOUND)
        app.delete()
        logger.info(f"[Admin] Application {pk} deleted by {request.user.email}")
        return Response(status=status.HTTP_204_NO_CONTENT)


# ─── Superuser management ─────────────────────────────────────────────────────

class AdminUserListView(APIView):
    """GET /api/admin/users/ — superuser only: list all admin users (active + pending)."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_superuser:
            return Response({'error': 'Superuser access required.'}, status=status.HTTP_403_FORBIDDEN)
        # All staff users (active and inactive/pending), exclude the superuser themselves
        admins = User.objects.filter(is_staff=True, is_superuser=False).order_by('is_active', 'full_name')
        data = UserSerializer(admins, many=True).data
        # Annotate with pending status
        for item, user in zip(data, admins):
            item['pending'] = not user.is_active
        return Response(data)


class AdminUserDetailView(APIView):
    """
    PATCH /api/admin/users/<pk>/  — superuser approves (is_active=True) or rejects (deletes) a pending admin
    DELETE /api/admin/users/<pk>/ — superuser removes an admin
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        if not request.user.is_superuser:
            return Response({'error': 'Superuser access required.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            user = User.objects.get(pk=pk, is_staff=True, is_superuser=False)
        except User.DoesNotExist:
            return Response({'error': 'Admin user not found.'}, status=status.HTTP_404_NOT_FOUND)

        action = request.data.get('action')  # 'approve' or 'reject'
        if action == 'approve':
            user.is_active = True
            user.save()
            logger.info(f"[Superadmin] Approved admin: {user.email}")
            # Notify the admin by email
            _send_email(
                to_email=user.email,
                subject='Your AcaBridge admin account has been approved',
                body=(
                    f'Hi {user.full_name},\n\n'
                    f'Your admin account has been approved by the super admin.\n'
                    f'You can now log in at: {getattr(settings, "FRONTEND_URL", "https://acabridge-hub-2.onrender.com")}/login-admin\n\n'
                    f'Welcome to the team!'
                ),
            )
            return Response({'message': f'{user.full_name} approved successfully.', 'user': UserSerializer(user).data})
        elif action == 'reject':
            name = user.full_name
            user.delete()
            logger.info(f"[Superadmin] Rejected and removed admin: {name}")
            return Response({'message': f'{name} rejected and removed.'})
        else:
            return Response({'error': 'Action must be "approve" or "reject".'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        if not request.user.is_superuser:
            return Response({'error': 'Superuser access required.'}, status=status.HTTP_403_FORBIDDEN)
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        if user.is_superuser:
            return Response({'error': 'Cannot delete a superuser.'}, status=status.HTTP_400_BAD_REQUEST)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# ─── Onboarding ───────────────────────────────────────────────────────────────

class SubmitApplicationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        track_name = request.data.get('training_track_id') or request.data.get('track_name')
        if not track_name:
            return Response({'error': 'training_track_id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        track = None
        try:
            track = TrainingTrack.objects.get(pk=int(track_name))
        except (ValueError, TypeError, TrainingTrack.DoesNotExist):
            pass

        if not track:
            try:
                track = TrainingTrack.objects.get(name__iexact=str(track_name))
            except TrainingTrack.DoesNotExist:
                track, _ = TrainingTrack.objects.get_or_create(name=str(track_name))

        cohort = Cohort.objects.filter(is_active=True, applications_open=True).first()
        if not cohort:
            cohort, _ = Cohort.objects.get_or_create(
                name='Cohort 9.0',
                defaults={'is_active': True, 'applications_open': True}
            )

        application, created = Application.objects.update_or_create(
            user=request.user,
            defaults={
                'training_track': track,
                'cohort': cohort,
                'status': Application.STATUS_APPLIED,
            }
        )

        logger.info(f"[Application] {'Created' if created else 'Updated'} for {request.user.email} — track: {track.name}")

        return Response({
            'message': 'Application submitted successfully.',
            'track': track.name,
            'cohort': cohort.name,
            'status': application.status,
        }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


# ─── Password reset ───────────────────────────────────────────────────────────

class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"message": "If an account exists, a reset link has been sent."})

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)
        frontend_url = getattr(settings, 'FRONTEND_URL', 'http://localhost:3000')
        reset_url = f"{frontend_url}/reset-password/{uid}/{token}"

        _send_email(
            to_email=email,
            subject='Reset your AcaBridge password',
            body=(
                f'Hi {user.full_name},\n\n'
                f'Click the link below to reset your password:\n{reset_url}\n\n'
                f'This link expires in 1 hour.\n\n'
                f'If you did not request this, ignore this email.'
            ),
        )

        response_data = {"message": "If an account exists, a reset link has been sent."}
        if settings.DEBUG:
            response_data['dev_reset_url'] = reset_url
        return Response(response_data)


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except Exception:
            return Response({"error": "Invalid user"}, status=400)
        if not token_generator.check_token(user, token):
            return Response({"error": "Invalid or expired token"}, status=400)
        user.set_password(serializer.validated_data['password'])
        user.save()
        return Response({"message": "Password reset successful"})
