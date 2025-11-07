#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "biogram.settings")
    
    from django.core.management import execute_from_command_line
    
    # Run Django development server on port 5000
    execute_from_command_line(["manage.py", "runserver", "0.0.0.0:5000"])