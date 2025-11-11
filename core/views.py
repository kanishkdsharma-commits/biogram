from django.shortcuts import render


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
