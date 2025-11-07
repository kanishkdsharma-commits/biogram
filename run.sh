#!/bin/bash
echo "Starting Biogram Django Server..."
python manage.py migrate --no-input
python manage.py runserver 0.0.0.0:5000