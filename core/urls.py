from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('snapshot/', views.dashboard_view, name='health_snapshot'),
]