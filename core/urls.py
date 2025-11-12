from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('snapshot/', views.dashboard_view, name='health_snapshot'),
    path('connect-devices/', views.connect_devices_view, name='connect_devices'),
    path('link-records/', views.link_records_view, name='link_records'),
    path('upload-documents/', views.upload_documents_view, name='upload_documents'),
    path('profile-settings/', views.profile_settings_view, name='profile_settings'),
    path('share-with-doctor/', views.share_with_doctor_view, name='share_with_doctor'),
    path('doctor-access/', views.doctor_access_view, name='doctor_access'),
    path('doctor-summary/', views.doctor_summary_view, name='doctor_summary'),
]