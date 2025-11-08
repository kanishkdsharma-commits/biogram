from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse, HttpResponse
from django.db.models import Q, Avg, Max, Min
from django.utils import timezone
from django.views.decorators.http import require_http_methods
from datetime import datetime, timedelta
from .models import (
    HealthRecord, Medication, LabResult, VitalSign, 
    WearableData, AIInsight, QuickNote
)


def health_timeline(request):
    # Import sample timeline data
    from sample_data import TIMELINE_EVENTS
    
    # Sort timeline events by date (most recent first)
    sorted_timeline = sorted(TIMELINE_EVENTS, key=lambda x: x['date'], reverse=True)
    
    context = {
        'timeline_events': sorted_timeline,
    }
    
    return render(request, 'health/timeline.html', context)


@login_required
def wearable_insights(request):
    # Get date range (last 30 days by default)
    end_date = timezone.now().date()
    start_date = end_date - timedelta(days=30)
    
    # Get wearable data
    wearable_data = WearableData.objects.filter(
        user=request.user,
        date__gte=start_date,
        date__lte=end_date
    ).order_by('-date')
    
    # Calculate aggregates
    aggregates = wearable_data.aggregate(
        avg_steps=Avg('steps'),
        avg_calories=Avg('calories_burned'),
        avg_sleep=Avg('sleep_hours'),
        avg_heart_rate=Avg('heart_rate_avg'),
        max_heart_rate=Max('heart_rate_max'),
        min_heart_rate=Min('heart_rate_min'),
    )
    
    # Get latest vital signs
    latest_vitals = VitalSign.objects.filter(user=request.user).first()
    
    # Generate insights based on data
    insights = []
    if aggregates['avg_steps'] and aggregates['avg_steps'] < 5000:
        insights.append({
            'type': 'warning',
            'message': 'Your average daily steps are below recommended levels. Try to aim for 10,000 steps per day.'
        })
    
    if aggregates['avg_sleep'] and aggregates['avg_sleep'] < 7:
        insights.append({
            'type': 'warning',
            'message': 'You\'re averaging less than 7 hours of sleep. Consider improving your sleep routine.'
        })
    
    context = {
        'wearable_data': wearable_data[:30],
        'aggregates': aggregates,
        'latest_vitals': latest_vitals,
        'insights': insights,
        'start_date': start_date,
        'end_date': end_date,
    }
    
    return render(request, 'health/wearable_insights.html', context)


@login_required
def medications_list(request):
    active_meds = Medication.objects.filter(user=request.user, is_active=True)
    inactive_meds = Medication.objects.filter(user=request.user, is_active=False)
    
    context = {
        'active_medications': active_meds,
        'inactive_medications': inactive_meds,
    }
    
    return render(request, 'health/medications.html', context)


@login_required
def lab_results(request):
    results = LabResult.objects.filter(user=request.user)
    
    # Group by test name for trending
    test_names = results.values_list('test_name', flat=True).distinct()
    
    context = {
        'lab_results': results[:50],
        'test_names': test_names,
    }
    
    return render(request, 'health/lab_results.html', context)


@login_required
@require_http_methods(["POST"])
def add_health_record(request):
    # Handle form submission for adding new health record
    event_type = request.POST.get('event_type')
    title = request.POST.get('title')
    description = request.POST.get('description')
    date_str = request.POST.get('date')
    provider = request.POST.get('provider', '')
    location = request.POST.get('location', '')
    is_important = request.POST.get('is_important') == 'on'
    
    try:
        date = datetime.strptime(date_str, '%Y-%m-%d') if date_str else timezone.now()
        
        record = HealthRecord.objects.create(
            user=request.user,
            event_type=event_type,
            title=title,
            description=description,
            date=date,
            provider=provider,
            location=location,
            is_important=is_important
        )
        
        messages.success(request, 'Health record added successfully.')
            
    except Exception as e:
        messages.error(request, f'Error adding record: {str(e)}')
    
    return redirect('health_timeline')
