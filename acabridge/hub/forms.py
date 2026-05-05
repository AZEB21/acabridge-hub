from django import forms
from django.contrib.auth import authenticate
from .models import User, Application, TrainingTrack

NATIONALITY_CHOICES = [
    ('', 'Select'),
    ('Nigerian', 'Nigerian'),
    ('Ghanaian', 'Ghanaian'),
    ('Kenyan', 'Kenyan'),
    ('South African', 'South African'),
    ('Ethiopian', 'Ethiopian'),
    ('Ugandan', 'Ugandan'),
    ('Tanzanian', 'Tanzanian'),
    ('Rwandan', 'Rwandan'),
    ('Other', 'Other'),
]


class SignUpForm(forms.ModelForm):
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'At least 6 characters'}),
        min_length=6,
    )
    confirm_password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Confirm password'}),
    )

    class Meta:
        model = User
        fields = ['full_name', 'email']
        widgets = {
            'full_name': forms.TextInput(attrs={'placeholder': 'Ada Lovelace'}),
            'email': forms.EmailInput(attrs={'placeholder': 'you@example.com'}),
        }

    def clean(self):
        cleaned = super().clean()
        p1 = cleaned.get('password')
        p2 = cleaned.get('confirm_password')
        if p1 and p2 and p1 != p2:
            raise forms.ValidationError('Passwords do not match.')
        return cleaned


class SignInForm(forms.Form):
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={'placeholder': 'you@example.com'})
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Your password'})
    )
    remember_me = forms.BooleanField(required=False)

    def clean(self):
        cleaned = super().clean()
        email = cleaned.get('email')
        password = cleaned.get('password')
        if email and password:
            user = authenticate(username=email, password=password)
            if not user:
                raise forms.ValidationError('Invalid email or password.')
            cleaned['user'] = user
        return cleaned


class OTPForm(forms.Form):
    code = forms.CharField(
        max_length=6,
        min_length=6,
        widget=forms.TextInput(attrs={'placeholder': '------', 'autocomplete': 'one-time-code'}),
    )


class ProfileForm(forms.ModelForm):
    nationality = forms.ChoiceField(choices=NATIONALITY_CHOICES, required=False)

    class Meta:
        model = User
        fields = ['profile_photo', 'age', 'nationality', 'location', 'bio', 'career_goal']
        widgets = {
            'age': forms.NumberInput(attrs={'placeholder': '22'}),
            'location': forms.TextInput(attrs={'placeholder': 'City, Country (e.g. Lagos, Nigeria)'}),
            'bio': forms.Textarea(attrs={'placeholder': 'A sentence or two about yourself', 'rows': 3, 'maxlength': 200}),
            'career_goal': forms.Textarea(attrs={'placeholder': 'e.g. Become a Product Manager at a fintech', 'rows': 3}),
        }


class TrainingTrackForm(forms.Form):
    training_track = forms.ModelChoiceField(
        queryset=TrainingTrack.objects.all(),
        empty_label='Select a track',
        widget=forms.Select(),
    )
