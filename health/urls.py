from django.urls import path
from . import views

urlpatterns = [
    path('timeline/', views.health_timeline, name='health_timeline'),
    path('wearable/', views.wearable_insights, name='wearable_insights'),
    path('medications/', views.medications_list, name='medications'),
    path('lab-results/', views.lab_results, name='lab_results'),
]