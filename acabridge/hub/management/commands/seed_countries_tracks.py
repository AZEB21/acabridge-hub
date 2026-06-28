from django.core.management.base import BaseCommand
from hub.models import Countries, TrainingTrack

AFRICAN_COUNTRIES = [
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burkina Faso",
    "Burundi",
    "Cameroon",
    "Cape Verde",
    "Central African Republic",
    "Chad",
    "Comoros",
    "Congo",
    "DR Congo",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eritrea",
    "Eswatini",
    "Ethiopia",
    "Gabon",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Ivory Coast",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "Sao Tome and Principe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Sudan",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Zambia",
    "Zimbabwe"
]

TRAINING_TRACKS = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Data Analysis",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Cloud Computing",
    "Cybersecurity",
    "UI/UX Design",
    "Product Management",
    "Project Management",
    "DevOps",
    "Quality Assurance",
    "Mobile Development",
    "Technical Writing",
    "Digital Marketing",
    "Business Analysis",
    "Entrepreneurship",
    "Career Development"
]

class Command(BaseCommand):
    help = "Seed countries and tracks"

    def handle(self, *args, **kwargs):

        for country in AFRICAN_COUNTRIES:
            Countries.objects.get_or_create(name=country)

        for track in TRAINING_TRACKS:
            TrainingTrack.objects.get_or_create(name=track)

        self.stdout.write(
            self.style.SUCCESS(
                "Countries and tracks added successfully"
            )
        )