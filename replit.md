# Biogram Health Platform

## Overview

Biogram is a public health insights dashboard that transforms complex medical data into clear, accessible information. The application features an Apple iPhone website-inspired UI design - clean, premium, and user-friendly across all sections. Built with Django and PostgreSQL, it presents sample patient data with an emphasis on visual clarity and modern aesthetics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Architecture

**Technology Stack:**
- **Framework:** Django 5.2
- **Database:** PostgreSQL (via Neon serverless)
- **UI Framework:** Bootstrap 5 with custom Apple-inspired CSS
- **Session Management:** Django's built-in session framework
- **Development Server:** Node.js wrapper (server.js) for npm compatibility

**Application Structure:**
- Public dashboard (no authentication required for demo)
- Sample data driven from `sample_data.py`
- Four main views: Health Snapshot, Timeline, Wearable Insights, Lab Results
- RESTful URL patterns with Django template rendering

**Data Management:**
- Static sample data for demonstration purposes
- Health Snapshot: AI insights, health trends, conditions, medications
- Timeline: 17 medical events spanning 2018-2025
- Wearable: 7 days of activity data with aggregates
- Lab Results: 4 sample test results with visual presentation

### Frontend Design

**Apple iPhone Website Aesthetic (Applied November 2025):**
- Unified purple gradient palette (#667eea → #764ba2) across all hero sections
- 64px bold headlines with generous letter-spacing
- SF Pro font family (-apple-system) for native feel
- Large icons (60-80px) for visual impact
- Smooth fadeInUp animations (0.6s ease-out)
- Premium card designs with subtle shadows and depth
- Generous white space and breathing room
- Compact, scannable information layouts

**Visual Design System:**
- **Heroes:** 80px vertical padding, purple gradient background, rounded bottom corners (40px)
- **Cards:** 20-28px border-radius, box-shadow for depth, smooth hover effects
- **Typography:** 64px headlines, 42px section headers, 24-28px card titles
- **Animations:** Hover effects (translateY, scale), staggered fade-ins
- **Icons:** Large emoji icons (60-80px) for visual communication
- **Badges:** Gradient backgrounds for status indicators (green, yellow, red)

## Page Designs

### Health Snapshot (Dashboard) - `/`

**Design Features:**
- Purple gradient hero with "Your Health Snapshot" headline
- Action buttons: "Prepare for Appointment" and "Share with Provider"
- Compact information display (removed Bootstrap accordions)

**Content Sections:**
1. **What's Changing:** 3 large trend cards with icons, descriptions, and recommendations
2. **Personal Health Tips:** Compact grid of AI guidance cards
3. **Questions for Your Doctor:** Numbered question cards in grid layout
4. **Health Conditions:** Visual cards with 4-quadrant detail boxes (what you said, tests showed, what it means, what we're doing)
5. **Medications:** Card grid showing name, dose, purpose badge, and key interactions

### Health Timeline - `/health/timeline/`

**Design Features:**
- Purple gradient hero with "Your Health Journey" headline
- Vertical timeline connector line with gradient
- 17 chronologically sorted events (most recent first)

**Event Cards:**
- 80px icons for each event type (🏥 ❤️ 🔬 💉 📋 🚨)
- Date display with timeline connector
- Event title (24px), date badge with gradient
- Expandable "View Details" buttons
- Smooth hover effects (lift + icon rotation)
- Color-coded event type badges

### Wearable Insights - `/health/wearable/`

**Design Features:**
- Purple gradient hero with "Wearable Insights" headline
- Date range display (last 7 days)
- AI insights banner with yellow/gold gradient

**Content Sections:**
1. **Your Averages:** 4 large stat cards with 80px icons and 56px numbers
   - Steps, Calories, Sleep, Heart Rate
   - Smooth hover effects (lift + scale + icon rotation)
2. **Heart Rate Range:** Pink/magenta gradient card with min/max values
3. **Daily Activity:** Timeline cards (not tables) showing daily metrics
   - Date tile with purple gradient
   - Metrics grid: steps, calories, active minutes, sleep, heart rate

### Lab Results - `/health/lab-results/`

**Design Features:**
- Purple gradient hero with 80px microscope icon 🔬
- Large value displays for test results
- Gradient status badges

**Result Cards:**
- Date tile with purple gradient (month/day/year)
- Test name (24px bold), reference range, provider
- Large value display (48px) with unit
- Status badges with gradients:
  - Normal: Green gradient (#10b981 → #059669)
  - Abnormal: Yellow gradient (#f59e0b → #d97706)
  - Critical: Red gradient with pulse animation
- Notes section with yellow highlight

## Recent Changes (November 2025)

### Complete Apple iPhone Website Redesign

**All Tabs Updated:**
- Unified purple gradient palette (#667eea → #764ba2) replacing varied Bootstrap colors
- 64px hero headlines replacing standard h1/h2 tags
- Large 60-80px icons for visual impact
- Removed Bootstrap accordions in favor of clean, compact card layouts
- Premium card designs with consistent border-radius (20-28px) and shadows
- Smooth animations: fadeInUp on load, hover effects (translateY, scale)

**Information Density Improvements:**
- Health trends as large stat cards instead of list items
- Timeline events in visual cards instead of accordion panels
- Wearable data in daily timeline cards instead of tables
- Lab results in visual cards instead of table rows
- Removed bulky collapse/expand UI in favor of always-visible content

**Public Demo Updates:**
- Removed authentication requirements from wearable and lab views
- All pages now use sample data for public demonstration
- Sample wearable data: 7 days of activity metrics
- Sample lab results: 4 common tests (A1C, LDL, TSH, Vitamin D)

### Design Consistency

**Unified Gradient Palette:**
- All hero sections: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Accent gradients: Teal for AI insights, pink for heart rate, yellow for warnings
- Status badges: Green (normal), yellow (abnormal), red (critical)

**Typography Scale:**
- Hero headlines: 64px bold, -2px letter-spacing
- Hero subtext: 24px light, 0.95 opacity
- Section headers: 42px bold, -1px letter-spacing
- Card titles: 20-28px bold
- Body text: 14-16px regular

**Spacing System:**
- Hero padding: 80px vertical, 60px horizontal
- Section margins: 50-60px bottom
- Card padding: 28-40px
- Grid gaps: 16-20px

**Animation Timings:**
- Fade-in: 0.6s ease-out
- Hover transitions: 0.3s ease
- Staggered delays: 0.1s increments

## Technical Notes

### Django Configuration
- Settings: `biogram/settings.py`
- Sample data: `sample_data.py` contains all demo health records
- URL routing: `core/urls.py` and `health/urls.py`
- Views: Public views in `core/views.py` and `health/views.py`
- Templates: `templates/core/` and `templates/health/`

### Development Workflow
- Workflow: "Start application" runs `npm run dev` → `node server.js`
- Server: Django development server on port 5000
- Auto-reload: StatReloader watches for file changes
- Database: PostgreSQL available via DATABASE_URL environment variable

### Future Enhancements
- Responsive mobile testing and optimization
- Additional sample data for more diverse patient profiles
- Interactive data visualizations (charts, graphs)
- Real-time data integration with EHR systems
- HIPAA-compliant production deployment
