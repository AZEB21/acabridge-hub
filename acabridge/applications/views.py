from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Application
from .serializers import ApplicationSerializer

# Create your views here.
class ApplicationCreateView(generics.CreateAPIView):
    """
    Student submits an application
    """
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Automatically attach logged-in user
        serializer.save(user=self.request.user)

class AdminApplicationListView(generics.ListAPIView):
    """
    Admin can view all applications
    """
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAdminUser]

    queryset = Application.objects.all().order_by("-created_at")

class ApplicationUpdateStatusView(APIView):
    """
    Admin updates application status (accepted/rejected/reviewed)
    """

    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, pk):
        try:
            application = Application.objects.get(pk=pk)
        except Application.DoesNotExist:
            return Response({"error": "Application not found"}, status=404)

        new_status = request.data.get("status")

        if new_status not in ["pending", "reviewed", "accepted", "rejected"]:
            return Response({"error": "Invalid status"}, status=400)

        application.status = new_status
        application.save()

        serializer = ApplicationSerializer(application)
        return Response(serializer.data)


