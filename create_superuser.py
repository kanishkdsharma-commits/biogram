#!/usr/bin/env python
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'biogram.settings')
django.setup()

from django.contrib.auth.models import User
from health.models import UserProfile

# Create superuser if it doesn't exist
if not User.objects.filter(username='admin').exists():
    user = User.objects.create_superuser(
        username='admin',
        email='admin@biogram.com',
        password='admin123'
    )
    # Create user profile
    UserProfile.objects.create(user=user)
    print("Superuser created successfully!")
    print("Username: admin")
    print("Password: admin123")
else:
    print("Superuser already exists.")