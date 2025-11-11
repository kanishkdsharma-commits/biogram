# Biogram Health Platform

## Overview
Biogram is a public health insights dashboard designed to transform complex medical data into clear, accessible information. It features an Apple iPhone website-inspired UI, offering a clean, premium, and user-friendly experience across all sections. Built with Django and PostgreSQL, the application presents sample patient data with a strong emphasis on visual clarity and modern aesthetics. The platform's navigation is card-based, with a home dashboard providing access to five key sections, and each detail page includes a back button for easy return to the home screen.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Backend
- **Framework:** Django 5.2
- **Database:** PostgreSQL (via Neon serverless)
- **Session Management:** Django's built-in session framework
- **Development Server:** Node.js wrapper (server.js) for npm compatibility
- **Application Structure:** Public dashboard with no authentication required for demo purposes, sample data driven from `sample_data.py`, card-based home page navigation, and RESTful URL patterns with Django template rendering.

### Frontend
- **UI Framework:** Bootstrap 5 with custom Apple-inspired CSS.
- **Design Aesthetic:** Apple iPhone website aesthetic with a unified purple gradient palette, bold headlines (64px), SF Pro font family, streamlined icons (50-60px), smooth fadeInUp animations, compact card designs, and tighter spacing.
- **Visual Design System:** Includes 80px vertical padding for heroes with rounded bottom corners, 16-20px border-radius for cards with lighter shadows, a defined typography scale, subtle hover animations, compact emoji icons, and gradient badges for status indicators.
- **Navigation:** Card-based home dashboard replaces traditional sidebar navigation, featuring 5 large navigation cards linking to Health Snapshot, Timeline, Wearable Insights, Medications, and Lab Results. Each detail page includes a "Back to Dashboard" button.
- **Key Page Features:**
    - **Health Snapshot:** AI insights, health trends, conditions, medications, with an interactive dropdown list for health conditions.
    - **Health Timeline:** Interactive vertical timeline with 17 chronologically sorted medical events, expandable/collapsible accordion-style cards (only one event expanded at a time), filter controls for date range (All Time, Last 30 Days, Last 6 Months, Last Year) and event type (6 checkbox filters: Hospital Visit, Emergency Room, Lab Test, Medication Change, Routine Checkup, New Diagnosis), smooth fade animations for filtering, and race-condition-free JavaScript using timeout tracking Map to ensure accurate filter behavior during rapid toggling.
    - **Wearable Insights:** Displays 7 days of activity data with averages, heart rate range, and daily activity metrics.
    - **Medications:** Comprehensive view of medications, interactions, and side effects.
    - **Lab Results:** Visual presentation of 4 sample test results with large value displays and gradient status badges.

### Technical Implementation
- **Django Configuration:** Settings in `biogram/settings.py`, sample data in `sample_data.py`, URL routing in `core/urls.py` and `health/urls.py`, views in `core/views.py` and `health/views.py`, and templates in `templates/core/` and `templates/health/`.
- **Development Workflow:** Uses `npm run dev` running `node server.js`, Django development server on port 5000, and StatReloader for auto-reload.

## External Dependencies
- **Database:** PostgreSQL (via Neon serverless)
- **Frontend Libraries:** Bootstrap 5