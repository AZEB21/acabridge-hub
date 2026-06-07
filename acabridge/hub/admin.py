from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, OTPCode, Cohort, TrainingTrack, Application, Module, ModuleProgress, LiveClass, Countries


@admin.register(User)

class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'full_name', 'is_email_verified', 'is_staff', 'date_joined')
    list_filter = ('is_email_verified', 'is_staff', 'is_active')
    search_fields = ('email', 'full_name')
    ordering = ('-date_joined',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal', {'fields': ('full_name', 'profile_photo', 'age', 'nationality', 'location', 'bio', 'career_goal')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_email_verified', 'groups', 'user_permissions')}),
        ('Dates', {'fields': ('date_joined', 'last_login')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'full_name', 'password1', 'password2'),
        }),
    )


@admin.register(OTPCode)
class OTPCodeAdmin(admin.ModelAdmin):
    list_display = ('user', 'code', 'created_at', 'is_used')
    list_filter = ('is_used',)
    

@admin.register(Countries)
class CountriesAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Cohort)
class CohortAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active', 'applications_open')


@admin.register(TrainingTrack)
class TrainingTrackAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('user', 'cohort', 'training_track', 'status', 'submitted_at')
    list_filter = ('status', 'cohort', 'training_track')
    search_fields = ('user__email', 'user__full_name')
    actions = ['mark_reviewed', 'mark_accepted', 'mark_enrolled']

    def mark_reviewed(self, request, queryset):
        queryset.update(status=Application.STATUS_REVIEWED)
    mark_reviewed.short_description = 'Mark selected as Reviewed'

    def mark_accepted(self, request, queryset):
        queryset.update(status=Application.STATUS_ACCEPTED)
    mark_accepted.short_description = 'Mark selected as Accepted'

    def mark_enrolled(self, request, queryset):
        queryset.update(status=Application.STATUS_ENROLLED)
    mark_enrolled.short_description = 'Mark selected as Enrolled'


@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('title', 'track', 'order')
    list_filter = ('track',)


@admin.register(LiveClass)
class LiveClassAdmin(admin.ModelAdmin):
    list_display = ('title', 'cohort', 'scheduled_at')
    list_filter = ('cohort',)

