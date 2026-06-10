from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import Countries, User, Cohort, TrainingTrack, Application
from django.contrib.auth import get_user_model   

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


class CountriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Countries
        fields = "__all__"


class CohortSerializer(serializers.ModelSerializer):
    track_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=TrainingTrack.objects.all(),
        source='tracks', required=False,
    )
    track_names = serializers.SerializerMethodField()

    class Meta:
        model = Cohort
        fields = [
            'id', 'name', 'start_date', 'end_date', 'max_students',
            'track_ids', 'track_names', 'is_active', 'applications_open', 'created_by',
        ]
        read_only_fields = ['created_by']

    def get_track_names(self, obj):
        return [t.name for t in obj.tracks.all()]


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
        """POST /api/reset-password/<uidb64>/<token>/"""
        new_password = serializers.CharField(write_only=True, min_length=6, validators=[validate_password])
        confirm_password = serializers.CharField(write_only=True)

        def validate(self, attrs):
            if attrs['new_password'] != attrs['confirm_password']:
                raise serializers.ValidationError({'confirm_password': 'Passwords do not match.'})
            return attrs
    
class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = "__all__"

    def get_status_choices(self, obj):
        return [
            {"value": value, "label": label}
            for value, label in Application.STATUS_CHOICES
        ]
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
