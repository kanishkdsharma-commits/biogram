from django.shortcuts import render


def dashboard_view(request):
    # Import sample data
    from sample_data import AI_INSIGHTS, ACTIVE_PROBLEMS
    
    context = {
        'health_trends': AI_INSIGHTS['health_trends'],
        'health_guidance': AI_INSIGHTS['health_guidance'],
        'doctor_questions': AI_INSIGHTS['doctor_questions'],
        'active_problems': ACTIVE_PROBLEMS,
    }
    return render(request, 'core/dashboard.html', context)
