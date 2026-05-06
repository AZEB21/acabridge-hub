from django.db import models
from hub.models import User


class Application(models.Model):

    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('reviewed', 'Reviewed'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="applications")

    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    cohort = models.CharField(max_length=100)

    skills = models.TextField()
    motivation = models.TextField()

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.status}"

# Create your models here.
