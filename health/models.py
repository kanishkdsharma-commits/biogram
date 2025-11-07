from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    date_of_birth = models.DateField(null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    emergency_contact = models.CharField(max_length=100, blank=True)
    blood_type = models.CharField(max_length=10, blank=True)
    allergies = models.TextField(blank=True, help_text="List of allergies")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"


class HealthRecord(models.Model):
    EVENT_TYPES = [
        ('visit', 'Doctor Visit'),
        ('lab', 'Lab Result'),
        ('emergency', 'Emergency'),
        ('medication', 'Medication'),
        ('note', 'Note'),
        ('procedure', 'Procedure'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='health_records')
    event_type = models.CharField(max_length=20, choices=EVENT_TYPES)
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    provider = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=200, blank=True)
    attachments = models.FileField(upload_to='health_records/', blank=True, null=True)
    is_important = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-date']
    
    def __str__(self):
        return f"{self.user.username} - {self.title} ({self.date.date()})"


class Medication(models.Model):
    FREQUENCY_CHOICES = [
        ('daily', 'Daily'),
        ('twice_daily', 'Twice Daily'),
        ('three_times', 'Three Times Daily'),
        ('four_times', 'Four Times Daily'),
        ('weekly', 'Weekly'),
        ('as_needed', 'As Needed'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='medications')
    name = models.CharField(max_length=200)
    dosage = models.CharField(max_length=100)
    frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    prescriber = models.CharField(max_length=100, blank=True)
    purpose = models.TextField(blank=True)
    side_effects = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.name} ({self.dosage})"


class LabResult(models.Model):
    RESULT_STATUS = [
        ('normal', 'Normal'),
        ('abnormal', 'Abnormal'),
        ('critical', 'Critical'),
        ('pending', 'Pending'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lab_results')
    test_name = models.CharField(max_length=200)
    value = models.CharField(max_length=100)
    unit = models.CharField(max_length=50, blank=True)
    reference_range = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=20, choices=RESULT_STATUS, default='pending')
    test_date = models.DateTimeField()
    provider = models.CharField(max_length=100, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-test_date']
    
    def __str__(self):
        return f"{self.user.username} - {self.test_name} ({self.test_date.date()})"


class VitalSign(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vital_signs')
    blood_pressure_systolic = models.IntegerField(null=True, blank=True)
    blood_pressure_diastolic = models.IntegerField(null=True, blank=True)
    heart_rate = models.IntegerField(null=True, blank=True)
    temperature = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    weight = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    height = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    bmi = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    oxygen_saturation = models.IntegerField(null=True, blank=True)
    respiratory_rate = models.IntegerField(null=True, blank=True)
    recorded_at = models.DateTimeField(default=timezone.now)
    source = models.CharField(max_length=50, default='manual')  # manual, wearable, clinic
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-recorded_at']
    
    def __str__(self):
        return f"{self.user.username} - Vitals ({self.recorded_at.date()})"


class WearableData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wearable_data')
    device_name = models.CharField(max_length=100)
    steps = models.IntegerField(null=True, blank=True)
    calories_burned = models.IntegerField(null=True, blank=True)
    active_minutes = models.IntegerField(null=True, blank=True)
    sleep_hours = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    heart_rate_avg = models.IntegerField(null=True, blank=True)
    heart_rate_min = models.IntegerField(null=True, blank=True)
    heart_rate_max = models.IntegerField(null=True, blank=True)
    stress_level = models.IntegerField(null=True, blank=True)  # 1-10 scale
    date = models.DateField()
    sync_time = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-date']
        unique_together = ['user', 'date', 'device_name']
    
    def __str__(self):
        return f"{self.user.username} - {self.device_name} ({self.date})"


class AIInsight(models.Model):
    PRIORITY_LEVELS = [
        ('urgent', 'Urgent'),
        ('routine', 'Routine'),
        ('followup', 'Follow-up'),
    ]
    
    INSIGHT_TYPES = [
        ('action', 'Action Required'),
        ('trend', 'Trend Analysis'),
        ('reminder', 'Reminder'),
        ('suggestion', 'Suggestion'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ai_insights')
    insight_type = models.CharField(max_length=20, choices=INSIGHT_TYPES)
    priority = models.CharField(max_length=20, choices=PRIORITY_LEVELS)
    title = models.CharField(max_length=200)
    description = models.TextField()
    related_record = models.ForeignKey(HealthRecord, on_delete=models.SET_NULL, null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.title}"


class QuickNote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quick_notes')
    content = models.TextField()
    is_pinned = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-is_pinned', '-created_at']
    
    def __str__(self):
        return f"{self.user.username} - Note ({self.created_at.date()})"
