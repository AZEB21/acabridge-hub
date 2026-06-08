from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model
from .models import User, Cohort, TrainingTrack, Countries, Application

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
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
    email = serializers.EmailField()
    code = serializers.CharField(min_length=6, max_length=6)


class ResendOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()


class SignInSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'email', 'full_name', 'profile_photo', 'age',
            'nationality', 'location', 'country', 'track',
            'bio', 'career_goal', 'is_email_verified', 'is_staff', 'is_superuser',
        ]
        read_only_fields = ['id', 'email', 'is_email_verified', 'is_staff', 'is_superuser']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['profile_photo', 'age', 'nationality', 'location', 'bio', 'career_goal']
        extra_kwargs = {f: {'required': False} for f in
                        ['profile_photo', 'age', 'nationality', 'location', 'bio', 'career_goal']}


class TrainingTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingTrack
        fields = ['id', 'name', 'description']


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Countries   # fixed: was incorrectly using User
        fields = ['id', 'name']


class CohortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cohort
        fields = ['id', 'name', 'is_active', 'applications_open']


class ApplicationAdminSerializer(serializers.ModelSerializer):
    """Used by admin views — includes full user info."""
    student_name = serializers.CharField(source='user.full_name', read_only=True)
    student_email = serializers.CharField(source='user.email', read_only=True)
    track_name = serializers.CharField(source='training_track.name', read_only=True)
    cohort_name = serializers.CharField(source='cohort.name', read_only=True)

    class Meta:
        model = Application
        fields = [
            'id', 'student_name', 'student_email', 'track_name', 'cohort_name',
            'status', 'skills', 'motivation', 'submitted_at', 'updated_at',
        ]


class AdminRegisterSerializer(serializers.ModelSerializer):
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
        user = User.objects.create_user(
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            password=validated_data['password'],
        )
        user.is_staff = True
        user.is_active = False          # pending superadmin approval
        user.is_email_verified = True   # no OTP needed for admins
        user.save()
        return user


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, min_length=6, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({'confirm_password': 'Passwords do not match.'})
        return attrs


class ChooseTrackSerializer(serializers.Serializer):
    training_track_id = serializers.PrimaryKeyRelatedField(
        queryset=TrainingTrack.objects.all(),
        source='training_track',
    )
