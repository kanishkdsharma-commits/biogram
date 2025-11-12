from django.shortcuts import render, redirect
from django.contrib import messages


def home_view(request):
    """Home page with navigation cards"""
    return render(request, 'core/home.html')


def dashboard_view(request):
    """Health Snapshot page"""
    # Import sample data
    from sample_data import AI_INSIGHTS, ACTIVE_PROBLEMS
    
    context = {
        'health_trends': AI_INSIGHTS['health_trends'],
        'health_guidance': AI_INSIGHTS['health_guidance'],
        'doctor_questions': AI_INSIGHTS['doctor_questions'],
        'active_problems': ACTIVE_PROBLEMS,
    }
    return render(request, 'core/dashboard.html', context)


def link_records_view(request):
    """Link to external records portal"""
    if request.method == 'POST':
        portal_type = request.POST.get('portal_type')
        messages.success(request, f'Connection request submitted for {portal_type}. You will receive a confirmation email shortly.')
        return redirect('link_records')
    
    return render(request, 'core/link_records.html')


def upload_documents_view(request):
    """Upload medical documents"""
    if request.method == 'POST':
        uploaded_file = request.FILES.get('document')
        document_type = request.POST.get('document_type')
        
        if uploaded_file:
            messages.success(request, f'Document "{uploaded_file.name}" uploaded successfully!')
            return redirect('upload_documents')
        else:
            messages.error(request, 'Please select a file to upload.')
    
    return render(request, 'core/upload_documents.html')


def profile_settings_view(request):
    """User profile and settings"""
    if request.method == 'POST':
        messages.success(request, 'Settings saved successfully!')
        return redirect('profile_settings')
    
    # Sample user data
    context = {
        'user_name': 'Sarah Johnson',
        'user_email': 'sarah.johnson@example.com',
        'date_of_birth': '1992-05-15',
    }
    return render(request, 'core/profile_settings.html', context)


def share_with_doctor_view(request):
    """Patient view - shows shareable code and link"""
    # Fixed demo code - in production this would be unique per patient
    access_code = "VH-4829"
    
    # Build the full URL for doctor access
    doctor_link = request.build_absolute_uri('/doctor-access/')
    
    context = {
        'access_code': access_code,
        'doctor_link': doctor_link,
    }
    return render(request, 'core/share_with_doctor.html', context)


def doctor_access_view(request):
    """Doctor code entry page"""
    if request.method == 'POST':
        entered_code = request.POST.get('access_code', '').strip().upper()
        
        # Demo: Accept code "VH-4829"
        if entered_code == 'VH-4829' or entered_code == 'VH4829':
            # Set session flag to authorize access to summary
            request.session['doctor_access_authorized'] = True
            return redirect('doctor_summary')
        else:
            messages.error(request, 'Invalid access code. Please check the code and try again.')
    
    return render(request, 'core/doctor_access.html')


def doctor_summary_view(request):
    """Doctor-facing comprehensive health summary"""
    # Security: Check if doctor has entered valid access code
    if not request.session.get('doctor_access_authorized', False):
        messages.error(request, 'Please enter a valid access code to view patient summary.')
        return redirect('doctor_access')
    
    from sample_data import AI_INSIGHTS, ACTIVE_PROBLEMS, VISIT_NOTES
    
    # Get all medications from most recent visits
    all_medications = []
    for visit in VISIT_NOTES[:3]:  # Get medications from 3 most recent visits
        for med in visit.get('medications', []):
            # Avoid duplicates
            if not any(m['name'] == med['name'] for m in all_medications):
                all_medications.append(med)
    
    # Get recent lab results from visit notes
    recent_labs = []
    for visit in VISIT_NOTES[:3]:
        if 'labs' in visit.get('objective', {}):
            labs_data = visit['objective']['labs']
            recent_labs.append({
                'date': visit['visit_date'],
                'provider': visit['provider'],
                'tests': labs_data
            })
    
    # Wearable data (sample for demo)
    wearable_summary = {
        'avg_steps': '8,245',
        'avg_heart_rate': '74 bpm',
        'resting_heart_rate': '62 bpm',
        'active_minutes': '32 min/day',
        'sleep_avg': '6.8 hours',
    }
    
    context = {
        'patient_name': 'Sarah Johnson',
        'patient_dob': '05/15/1992',
        'patient_age': '33',  # Corrected age based on 1992 DOB
        'health_trends': AI_INSIGHTS['health_trends'],
        'health_guidance': AI_INSIGHTS['health_guidance'],
        'doctor_questions': AI_INSIGHTS['doctor_questions'],
        'active_problems': ACTIVE_PROBLEMS,
        'medications': all_medications,
        'recent_labs': recent_labs,
        'wearable_data': wearable_summary,
    }
    return render(request, 'core/doctor_summary.html', context)
