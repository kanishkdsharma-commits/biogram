from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.views.decorators.http import require_http_methods
from health.models import UserProfile


def register_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        
        # Validation
        if password != confirm_password:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'core/register.html')
        
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists.')
            return render(request, 'core/register.html')
        
        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already registered.')
            return render(request, 'core/register.html')
        
        # Create user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        
        # Create user profile
        UserProfile.objects.create(user=user)
        
        # Log the user in
        login(request, user)
        messages.success(request, 'Registration successful! Welcome to Biogram.')
        return redirect('dashboard')
    
    return render(request, 'core/register.html')


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            next_url = request.GET.get('next', 'dashboard')
            return redirect(next_url)
        else:
            messages.error(request, 'Invalid username or password.')
    
    return render(request, 'core/login.html')


@login_required
def logout_view(request):
    logout(request)
    messages.info(request, 'You have been logged out.')
    return redirect('login')


def dashboard_view(request):
    # Import sample data
    from sample_data import AI_INSIGHTS, ACTIVE_PROBLEMS, MEDICATION_INTERACTIONS, VISIT_NOTES, TIMELINE_EVENTS
    
    # Prepare medications with their interactions and side effects
    medications_list = []
    for visit in VISIT_NOTES:
        for med in visit['medications']:
            med_name = med['name'].split()[0]  # Get base drug name (before parentheses)
            med_data = {
                'name': med['name'],
                'dose': med['dose'],
                'frequency': med['frequency'],
                'purpose': med['purpose'],
                'interactions': MEDICATION_INTERACTIONS.get(med_name, {}).get('interactions', []),
                'side_effects': MEDICATION_INTERACTIONS.get(med_name, {}).get('side_effects', [])
            }
            # Avoid duplicates
            if not any(m['name'] == med_data['name'] for m in medications_list):
                medications_list.append(med_data)
    
    # Sort timeline events by date (most recent first)
    sorted_timeline = sorted(TIMELINE_EVENTS, key=lambda x: x['date'], reverse=True)
    
    context = {
        'health_trends': AI_INSIGHTS['health_trends'],
        'health_guidance': AI_INSIGHTS['health_guidance'],
        'doctor_questions': AI_INSIGHTS['doctor_questions'],
        'active_problems': ACTIVE_PROBLEMS,
        'medications': medications_list,
        'timeline_events': sorted_timeline,
    }
    return render(request, 'core/dashboard.html', context)
