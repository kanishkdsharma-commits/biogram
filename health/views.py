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


def wearable_insights(request):
    # Public demo - using sample data
    end_date = timezone.now().date()
    start_date = end_date - timedelta(days=7)
    
    # Sample wearable data for demo
    wearable_data = []
    for i in range(7):
        date = end_date - timedelta(days=i)
        wearable_data.append({
            'date': date,
            'device_name': 'Apple Watch',
            'steps': 8500 + (i * 500),
            'calories_burned': 2200 + (i * 100),
            'active_minutes': 45 + (i * 5),
            'sleep_hours': 7.2 + (i * 0.2),
            'heart_rate_avg': 68 + (i * 2),
        })
    
    # Calculate aggregates from sample data
    aggregates = {
        'avg_steps': 10000,
        'avg_calories': 2400,
        'avg_sleep': 7.5,
        'avg_heart_rate': 72,
        'max_heart_rate': 145,
        'min_heart_rate': 58,
    }
    
    # Sample AI insights
    insights = [
        {
            'type': 'success',
            'message': 'Great job! Your activity levels are consistently above the recommended 10,000 steps per day.'
        },
        {
            'type': 'info',
            'message': 'Your sleep patterns are healthy, averaging 7.5 hours per night.'
        }
    ]
    
    context = {
        'wearable_data': wearable_data,
        'aggregates': aggregates,
        'insights': insights,
        'start_date': start_date,
        'end_date': end_date,
    }
    
    return render(request, 'health/wearable_insights.html', context)


def medications_list(request):
    # Public demo - using sample medication data
    from sample_data import MEDICATION_INTERACTIONS, VISIT_NOTES
    
    # Extract all medications from visit notes
    medications = []
    for visit in VISIT_NOTES:
        for med in visit['medications']:
            med_name = med['name'].split()[0]  # Get base drug name
            med_data = {
                'name': med['name'],
                'dose': med['dose'],
                'frequency': med['frequency'],
                'purpose': med['purpose'],
                'interactions': MEDICATION_INTERACTIONS.get(med_name, {}).get('interactions', []),
                'side_effects': MEDICATION_INTERACTIONS.get(med_name, {}).get('side_effects', []),
                'started': visit['visit_date'],  # Use visit date as start date
                'prescriber': visit['provider']
            }
            # Avoid duplicates
            if not any(m['name'] == med_data['name'] for m in medications):
                medications.append(med_data)
    
    # For demo: all are active medications
    # In a real app, you'd filter based on end_date or is_active flag
    context = {
        'active_medications': medications,
        'inactive_medications': [],  # Empty for demo
    }
    
    return render(request, 'health/medications.html', context)


def lab_results(request):
    # Public demo - using sample lab results
    from datetime import date
    
    sample_results = [
        {
            'test_date': date(2025, 10, 15),
            'test_name': 'Hemoglobin A1C',
            'value': '5.4',
            'unit': '%',
            'reference_range': '4.0 - 5.6%',
            'status': 'normal',
            'provider': 'Dr. Sarah Chen',
            'notes': 'Excellent diabetes control. Continue current lifestyle.'
        },
        {
            'test_date': date(2025, 10, 15),
            'test_name': 'LDL Cholesterol',
            'value': '95',
            'unit': 'mg/dL',
            'reference_range': '< 100 mg/dL',
            'status': 'normal',
            'provider': 'Dr. Sarah Chen',
            'notes': 'Well-controlled with current medication.'
        },
        {
            'test_date': date(2025, 9, 20),
            'test_name': 'TSH',
            'value': '2.8',
            'unit': 'mIU/L',
            'reference_range': '0.4 - 4.0 mIU/L',
            'status': 'normal',
            'provider': 'Dr. Michael Torres',
            'notes': 'Thyroid function is optimal.'
        },
        {
            'test_date': date(2025, 8, 5),
            'test_name': 'Vitamin D',
            'value': '28',
            'unit': 'ng/mL',
            'reference_range': '30 - 100 ng/mL',
            'status': 'abnormal',
            'provider': 'Dr. Sarah Chen',
            'notes': 'Slightly low. Recommend 2000 IU daily supplement.'
        },
    ]
    
    context = {
        'lab_results': sample_results,
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
