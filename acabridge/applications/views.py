from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from hub.models import Application
from .serializers import ApplicationSerializer

VALID_STATUSES = [
    Application.STATUS_APPLIED,
    Application.STATUS_REVIEWED,
    Application.STATUS_ACCEPTED,
    Application.STATUS_ENROLLED,
]


class ApplicationCreateView(generics.CreateAPIView):
    """
    POST /api/application/
    Student submits an application. User is auto-attached from JWT.
    """
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class MyApplicationView(APIView):
    """
    GET /api/application/mine/
    Returns the logged-in student's own application.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            application = Application.objects.select_related(
                'cohort', 'training_track'
            ).get(user=request.user)
        except Application.DoesNotExist:
            return Response(
                {'detail': 'No application found.'},
                status=status.HTTP_404_NOT_FOUND,
            )
        return Response({
            'id': application.id,
            'status': application.status,
            'cohort': application.cohort.name if application.cohort else None,
            'track': application.training_track.name if application.training_track else None,
            'submitted_at': application.submitted_at,
            'user_name': request.user.full_name,
            'user_email': request.user.email,
        })


class AdminApplicationListView(generics.ListAPIView):
    """
    GET /api/application/admin/
    Admin views all applications, newest first.
    """
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Application.objects.all().order_by('-submitted_at')


class ApplicationUpdateStatusView(APIView):
    """
    PATCH /api/application/<id>/status/
    Admin updates an application's status.
    """
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, pk):
        try:
            application = Application.objects.get(pk=pk)
        except Application.DoesNotExist:
            return Response({'error': 'Application not found.'}, status=status.HTTP_404_NOT_FOUND)

        new_status = request.data.get('status')
        if new_status not in VALID_STATUSES:
            return Response(
                {'error': f'Invalid status. Must be one of: {", ".join(VALID_STATUSES)}'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        application.status = new_status
        application.save()
        return Response(ApplicationSerializer(application).data)
