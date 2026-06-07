from rest_framework import serializers
from hub.models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = "__all__"
        read_only_fields = ["user", "status", "submitted_at", "updated_at"]