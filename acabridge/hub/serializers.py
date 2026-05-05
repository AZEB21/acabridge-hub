from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, Cohort, TrainingTrack


class RegisterSerializer(serializers.ModelSerializer):
    """Step 1 — Create account."""
    password = serializers.CharField(write_only=True, min_length=6, validators=[validate_password])
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
    """Step 2 — Verify email OTP."""
    email = serializers.EmailField()
    code = serializers.CharField(min_length=6, max_length=6)


class ResendOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ProfileSerializer(serializers.ModelSerializer):
    """Step 3 — Profile setup."""
    class Meta:
        model = User
        fields = ['profile_photo', 'age', 'nationality', 'location', 'bio', 'career_goal']
        extra_kwargs = {
            'profile_photo': {'required': False},
            'age': {'required': False},
            'nationality': {'required': False},
            'location': {'required': False},
            'bio': {'required': False},
            'career_goal': {'required': False},
        }


class TrainingTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingTrack
        fields = ['id', 'name', 'description']


class CohortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cohort
        fields = ['id', 'name']


class ChooseTrackSerializer(serializers.Serializer):
    """Step 4 — Choose training track and submit application."""
    training_track_id = serializers.PrimaryKeyRelatedField(
        queryset=TrainingTrack.objects.all(),
        source='training_track',
    )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'profile_photo', 'age',
                  'nationality', 'location', 'bio', 'career_goal', 'is_email_verified']
        read_only_fields = ['id', 'email', 'is_email_verified']
