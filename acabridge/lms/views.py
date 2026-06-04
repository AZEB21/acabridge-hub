"""
LMS views — three endpoints:
  GET /api/dashboard/   (replaces the old dashboard view with richer data)
  GET /api/courses/
  GET /api/assignments/
"""
import logging
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

from hub.models import Application, Module, LiveClass
from dashboard.models import Notification
from dashboard.serializers import NotificationSerializer
from hub.serializers import UserSerializer

from .models import (
    Lesson, LessonProgress, Enrollment,
    Assignment, Submission, LiveClassAttendance,
)
from .serializers import (
    DashboardLiveClassSerializer,
    DashboardAssignmentSerializer,
    DashboardModuleSerializer,
    CourseModuleSerializer,
    TrackInfoSerializer,
    AssignmentListSerializer,
)

logger = logging.getLogger(__name__)


# ─── Helpers ──────────────────────────────────────────────────────────────────

def _get_enrollment(user):
    """
    Return the student's active Enrollment, or fall back to their Application
    training_track so the endpoint still works before an Enrollment record exists.
    Returns (track, cohort_name) or (None, None).
    """
    enrollment = (
        Enrollment.objects
        .filter(user=user, is_active=True)
        .select_related('track')
        .first()
    )
    if enrollment:
        try:
            cohort_name = user.application.cohort.name if user.application.cohort else ''
        except Application.DoesNotExist:
            cohort_name = ''
        return enrollment.track, cohort_name

    # Fallback: use Application
    try:
        app = user.application
        return app.training_track, (app.cohort.name if app.cohort else '')
    except Application.DoesNotExist:
        return None, ''


def _module_progress(user, module):
    """
    Returns (completed_count, total_lessons, progress_pct) for a user/module pair.
    """
    total = module.lessons.count()
    if total == 0:
        return 0, 0, 0
    completed = LessonProgress.objects.filter(
        user=user,
        lesson__module=module,
        completed=True,
    ).count()
    pct = round((completed / total) * 100)
    return completed, total, pct


def _module_status(completed, total, pct):
    if total == 0:
        return 'not_started'
    if pct == 100:
        return 'done'
    if completed > 0:
        return 'inprogress'
    return 'not_started'


def _track_overall_progress(user, track):
    """Overall % of lessons completed across all modules in the track."""
    modules = Module.objects.filter(track=track)
    total_lessons = Lesson.objects.filter(module__in=modules).count()
    if total_lessons == 0:
        return 0
    completed = LessonProgress.objects.filter(
        user=user,
        lesson__module__in=modules,
        completed=True,
    ).count()
    return round((completed / total_lessons) * 100)


def _attendance_rate(user, cohort):
    """% of live classes the student attended (for their cohort)."""
    if cohort is None:
        return 0
    total = LiveClass.objects.filter(
        cohort=cohort,
        scheduled_at__lte=timezone.now(),
    ).count()
    if total == 0:
        return 0
    attended = LiveClassAttendance.objects.filter(
        user=user,
        live_class__cohort=cohort,
        attended=True,
    ).count()
    return round((attended / total) * 100)


def _assessments_passed(user, track):
    """Returns (passed_count, total_graded) for the student's track."""
    if track is None:
        return 0, 0
    module_ids = Module.objects.filter(track=track).values_list('id', flat=True)
    assignment_ids = Assignment.objects.filter(
        module_id__in=module_ids
    ).values_list('id', flat=True)
    graded = Submission.objects.filter(
        user=user,
        assignment_id__in=assignment_ids,
        status=Submission.STATUS_GRADED,
    )
    total_graded = graded.count()
    # "passed" = graded with grade >= 50 (or any graded submission if no grade set)
    passed = graded.filter(
        grade__isnull=False, grade__gte=50
    ).count() or graded.filter(grade__isnull=True).count()
    return passed, total_graded


# ─── Dashboard ────────────────────────────────────────────────────────────────

class DashboardView(APIView):
    """
    GET /api/dashboard/
    Combined response powering the student dashboard page.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        track, cohort_name = _get_enrollment(user)

        # ── Application info ──
        application_data = None
        cohort_obj = None
        try:
            app = user.application
            cohort_obj = app.cohort
            application_data = {
                'status':         app.status,
                'cohort':         cohort_name,
                'training_track': track.name if track else None,
                'submitted_at':   app.submitted_at,
            }
        except Application.DoesNotExist:
            pass

        # ── Stats ──
        overall_pct   = _track_overall_progress(user, track) if track else 0
        attendance    = _attendance_rate(user, cohort_obj)
        passed, total_graded = _assessments_passed(user, track)
        certs_earned  = 0  # placeholder — extend when Certificate model is added

        # ── Upcoming live classes (max 3) ──
        upcoming_classes = []
        if cohort_obj:
            now = timezone.now()
            classes_qs = (
                LiveClass.objects
                .filter(cohort=cohort_obj, scheduled_at__gte=now - timezone.timedelta(hours=2))
                .order_by('scheduled_at')[:3]
            )
            upcoming_classes = DashboardLiveClassSerializer(classes_qs, many=True).data

        # ── Recent assignments (last 3) ──
        recent_assignments = []
        if track:
            module_ids = Module.objects.filter(track=track).values_list('id', flat=True)
            assignments_qs = Assignment.objects.filter(
                module_id__in=module_ids
            ).order_by('-created_at')[:3]

            submission_map = {
                s.assignment_id: s
                for s in Submission.objects.filter(
                    user=user,
                    assignment__in=assignments_qs,
                )
            }
            for a in assignments_qs:
                sub = submission_map.get(a.id)
                recent_assignments.append({
                    'id':          a.id,
                    'title':       a.title,
                    'module_name': a.module.title,
                    'status':      sub.status if sub else Submission.STATUS_PENDING,
                })

        # ── Track modules summary ──
        modules_summary = []
        if track:
            for mod in Module.objects.filter(track=track):
                completed, total, pct = _module_progress(user, mod)
                modules_summary.append({
                    'id':            mod.id,
                    'title':         mod.title,
                    'lessons_count': total,
                    'progress_pct':  pct,
                })

        # ── Notifications ──
        notifications = Notification.objects.filter(user=user).order_by('-created_at')[:5]
        unread_count  = Notification.objects.filter(user=user, is_read=False).count()

        return Response({
            'user':        UserSerializer(user).data,
            'application': application_data,
            'stats': {
                'course_completion':   overall_pct,
                'attendance_rate':     attendance,
                'assessments_passed':  f'{passed}/{total_graded}',
                'certificates_earned': certs_earned,
            },
            'upcoming_live_classes':  upcoming_classes,
            'recent_assignments':     recent_assignments,
            'track_progress': {
                'overall_pct': overall_pct,
                'modules':     modules_summary,
            },
            'unread_notifications':  unread_count,
            'recent_notifications':  NotificationSerializer(notifications, many=True).data,
        })


# ─── Courses ──────────────────────────────────────────────────────────────────

class CoursesView(APIView):
    """
    GET /api/courses/
    Returns track info + full module list with per-student progress.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        track, _ = _get_enrollment(user)

        if not track:
            return Response({
                'track':   None,
                'modules': [],
            })

        modules = Module.objects.filter(track=track).prefetch_related('lessons')

        # Aggregate lesson counts and estimated hours per module
        total_lessons_all = 0
        total_minutes_all = 0
        module_data = []
        prev_done = True  # first module is never locked

        for mod in modules:
            completed, total, pct = _module_progress(user, mod)
            status = _module_status(completed, total, pct)

            # Estimated hours = sum of lesson estimated_minutes / 60
            est_minutes = sum(
                l.estimated_minutes for l in mod.lessons.all()
            )
            est_hours = round(est_minutes / 60, 1)

            # A module is locked if the previous module is not done
            is_locked = not prev_done
            prev_done = (status == 'done')

            total_lessons_all += total
            total_minutes_all += est_minutes

            module_data.append({
                'id':              mod.id,
                'order':           mod.order,
                'title':           mod.title,
                'status':          status,
                'lessons_count':   total,
                'estimated_hours': est_hours,
                'progress_pct':    pct,
                'completed_count': completed,
                'is_locked':       is_locked,
            })

        overall_pct = _track_overall_progress(user, track)
        est_weeks   = max(1, round(total_minutes_all / 60 / 5))  # ~5 hrs/week

        track_info = {
            'title':            track.name,
            'total_modules':    modules.count(),
            'total_lessons':    total_lessons_all,
            'estimated_weeks':  est_weeks,
            'overall_progress': overall_pct,
        }

        return Response({
            'track':   track_info,
            'modules': module_data,
        })


# ─── Assignments ──────────────────────────────────────────────────────────────

class AssignmentPagination(PageNumberPagination):
    page_size            = 6
    page_size_query_param = 'page_size'
    max_page_size        = 50


class AssignmentsView(APIView):
    """
    GET /api/assignments/
    Paginated list of assignments for the student's enrolled track.
    Supports ?module=<name> and ?status=<pending|submitted|graded> filters.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        track, _ = _get_enrollment(user)

        if not track:
            return Response({'count': 0, 'results': []})

        module_ids = Module.objects.filter(track=track).values_list('id', flat=True)
        assignments_qs = Assignment.objects.filter(
            module_id__in=module_ids
        ).select_related('module').order_by('due_date', 'created_at')

        # ── Filters ──
        module_filter = request.query_params.get('module', '').strip()
        status_filter = request.query_params.get('status', '').strip()

        if module_filter:
            assignments_qs = assignments_qs.filter(
                module__title__icontains=module_filter
            )

        # Build submission map for this user
        submission_map = {
            s.assignment_id: s
            for s in Submission.objects.filter(
                user=user,
                assignment__module_id__in=module_ids,
            )
        }

        # Apply status filter (status lives on Submission, not Assignment)
        if status_filter:
            if status_filter == Submission.STATUS_PENDING:
                # pending = no submission OR submission with status pending
                submitted_ids = Submission.objects.filter(
                    user=user,
                    assignment__module_id__in=module_ids,
                ).exclude(status=Submission.STATUS_PENDING).values_list('assignment_id', flat=True)
                assignments_qs = assignments_qs.exclude(id__in=submitted_ids)
            else:
                matching_ids = Submission.objects.filter(
                    user=user,
                    assignment__module_id__in=module_ids,
                    status=status_filter,
                ).values_list('assignment_id', flat=True)
                assignments_qs = assignments_qs.filter(id__in=matching_ids)

        # ── Paginate ──
        paginator = AssignmentPagination()
        page = paginator.paginate_queryset(assignments_qs, request)

        results = []
        for a in (page if page is not None else assignments_qs):
            sub = submission_map.get(a.id)
            status_val = sub.status if sub else Submission.STATUS_PENDING
            results.append({
                'id':          a.id,
                'title':       a.title,
                'module_name': a.module.title,
                'due_date':    a.due_date,
                'status':      status_val,
                'action':      'view' if status_val in (
                    Submission.STATUS_SUBMITTED, Submission.STATUS_GRADED
                ) else 'submit',
            })

        if page is not None:
            return paginator.get_paginated_response(results)
        return Response({'count': len(results), 'results': results})
