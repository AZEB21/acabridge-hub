from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, Cohort, TrainingTrack
from django.contrib.auth import get_user_model   

User = get_user_model()


# ═══════════════════════════════════════════════════════════════════════════════
# AZEB'S SERIALIZERS — Auth & Onboarding
# ═══════════════════════════════════════════════════════════════════════════════

class RegisterSerializer(serializers.ModelSerializer):
    """POST /api/auth/register/ — validates registration data."""
    password = serializers.CharField(
        write_only=True, min_length=6, validators=[validate_password]
    )
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['full_name', 'email', 'password', 'confirm_password']

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({'confirm_password': 'Passwords do not match.'})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        return User.objects.create_user(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            password=validated_data['password'],
        )


class VerifyOTPSerializer(serializers.Serializer):
    """POST /api/auth/verify-otp/ — validates OTP input."""
    email = serializers.EmailField()
    code = serializers.CharField(min_length=6, max_length=6)


class ResendOTPSerializer(serializers.Serializer):
    """POST /api/auth/resend-otp/"""
    email = serializers.EmailField()


class SignInSerializer(serializers.Serializer):
    """POST /api/auth/signin/"""
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class UserSerializer(serializers.ModelSerializer):
    """Used in signin, verify-otp, and me responses."""
    class Meta:
        model = User
        fields = [
            'id', 'email', 'full_name', 'profile_photo', 'age',
            'nationality', 'location', 'bio', 'career_goal', 'is_email_verified',
        ]
        read_only_fields = ['id', 'email', 'is_email_verified']


# ═══════════════════════════════════════════════════════════════════════════════
# AUSTA'S SERIALIZERS — add below this line
# ═══════════════════════════════════════════════════════════════════════════════

class ProfileSerializer(serializers.ModelSerializer):
    """PATCH /api/onboarding/profile/"""
    class Meta:
        model = User
        fields = ['profile_photo', 'age', 'nationality', 'location', 'bio', 'career_goal']
        extra_kwargs = {f: {'required': False} for f in ['profile_photo', 'age', 'nationality', 'location', 'bio', 'career_goal']}


class TrainingTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingTrack
        fields = ["id", "name"]

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "_all_"


class CohortSerializer(serializers.ModelSerializer):
    """GET /api/onboarding/tracks/"""
    class Meta:
        model = Cohort
        fields = "_all_"


class ChooseTrackSerializer(serializers.Serializer):
    """POST /api/onboarding/submit/"""
    training_track_id = serializers.PrimaryKeyRelatedField(
        queryset=TrainingTrack.objects.all(),
        source='training_track',
    )

class AdminRegisterSerializer(serializers.ModelSerializer):
    """POST /api/admin/register/ — validates admin registration data."""
    password = serializers.CharField(
        write_only=True, min_length=6, validators=[validate_password]
    )
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['full_name', 'email', 'password', 'confirm_password']


    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        user.is_staff=True
        user.save()
        return user
