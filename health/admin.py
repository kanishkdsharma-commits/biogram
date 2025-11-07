from django.contrib import admin
from .models import (
    UserProfile, HealthRecord, Medication, LabResult,
    VitalSign, WearableData, AIInsight, QuickNote
)

# Custom admin classes for better display
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'phone', 'blood_type', 'created_at']
    search_fields = ['user__username', 'user__email']

@admin.register(HealthRecord)
class HealthRecordAdmin(admin.ModelAdmin):
    list_display = ['user', 'event_type', 'title', 'date', 'provider', 'is_important']
    list_filter = ['event_type', 'is_important', 'date']
    search_fields = ['title', 'description', 'provider']
    date_hierarchy = 'date'

@admin.register(Medication)
class MedicationAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'dosage', 'frequency', 'is_active', 'start_date']
    list_filter = ['is_active', 'frequency']
    search_fields = ['name', 'purpose']

@admin.register(LabResult)
class LabResultAdmin(admin.ModelAdmin):
    list_display = ['user', 'test_name', 'value', 'status', 'test_date']
    list_filter = ['status', 'test_date']
    search_fields = ['test_name', 'provider']

@admin.register(VitalSign)
class VitalSignAdmin(admin.ModelAdmin):
    list_display = ['user', 'recorded_at', 'blood_pressure_systolic', 'blood_pressure_diastolic', 'heart_rate']
    list_filter = ['source', 'recorded_at']
    date_hierarchy = 'recorded_at'

@admin.register(WearableData)
class WearableDataAdmin(admin.ModelAdmin):
    list_display = ['user', 'device_name', 'date', 'steps', 'heart_rate_avg', 'sleep_hours']
    list_filter = ['device_name', 'date']
    date_hierarchy = 'date'

@admin.register(AIInsight)
class AIInsightAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'insight_type', 'priority', 'is_completed', 'created_at']
    list_filter = ['insight_type', 'priority', 'is_completed']
    search_fields = ['title', 'description']

@admin.register(QuickNote)
class QuickNoteAdmin(admin.ModelAdmin):
    list_display = ['user', 'content', 'is_pinned', 'created_at']
    list_filter = ['is_pinned', 'created_at']
    search_fields = ['content']
