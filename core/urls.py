from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('snapshot/', views.dashboard_view, name='health_snapshot'),
    path('link-records/', views.link_records_view, name='link_records'),
    path('upload-documents/', views.upload_documents_view, name='upload_documents'),
    path('profile-settings/', views.profile_settings_view, name='profile_settings'),
]