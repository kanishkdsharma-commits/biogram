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
