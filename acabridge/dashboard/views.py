from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from hub.models import Application, TrainingTrack
from hub.serializers import UserSerializer
from .models import Notification
from .serializers import NotificationSerializer


class DashboardView(APIView):
    """
    GET /api/dashboard/
    Returns a summary for the logged-in student:
      - their profile
      - their application status (if any)
      - their unread notification count
      - their 5 most recent notifications
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Application info
        application_data = None
        try:
            app = user.application
            application_data = {
                'status': app.status,
                'cohort': app.cohort.name if app.cohort else None,
                'training_track': app.training_track.name if app.training_track else None,
                'submitted_at': app.submitted_at,
            }
        except Application.DoesNotExist:
            pass

        # Notifications
        notifications = Notification.objects.filter(user=user).order_by('-created_at')[:5]
        unread_count = Notification.objects.filter(user=user, is_read=False).count()

        return Response({
            'user': UserSerializer(user).data,
            'application': application_data,
            'unread_notifications': unread_count,
            'recent_notifications': NotificationSerializer(notifications, many=True).data,
        })


class NotificationListView(APIView):
    """
    GET  /api/dashboard/notifications/   → list all notifications for current user
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.filter(
            user=request.user
        ).order_by('-created_at')
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)


class NotificationMarkReadView(APIView):
    """
    PATCH /api/dashboard/notifications/<id>/read/  → mark a notification as read
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            notification = Notification.objects.get(pk=pk, user=request.user)
        except Notification.DoesNotExist:
            return Response({'error': 'Notification not found.'}, status=404)

        notification.is_read = True
        notification.save()
        return Response(NotificationSerializer(notification).data)


class NotificationMarkAllReadView(APIView):
    """
    PATCH /api/dashboard/notifications/read-all/  → mark all notifications as read
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
        return Response({'message': 'All notifications marked as read.'})
