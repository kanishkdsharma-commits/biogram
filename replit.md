# Biogram Health Platform

## Overview

Biogram is a public health insights dashboard that transforms complex medical data into clear, accessible information. The application features an Apple iPhone website-inspired UI design - clean, premium, and user-friendly across all sections. Built with Django and PostgreSQL, it presents sample patient data with an emphasis on visual clarity and modern aesthetics.

**Navigation:** Card-based home dashboard with 5 clickable sections (no sidebar navigation). Each detail page includes a back button to return home.

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
- Card-based home page with navigation to 5 sections: Health Snapshot, Timeline, Wearable Insights, Medications, Lab Results
- RESTful URL patterns with Django template rendering
- No sidebar navigation - replaced with home dashboard cards and back buttons

**Data Management:**
- Static sample data for demonstration purposes
- Health Snapshot: AI insights, health trends, conditions, medications
- Timeline: 17 medical events spanning 2018-2025
- Wearable: 7 days of activity data with aggregates
- Lab Results: 4 sample test results with visual presentation

### Frontend Design

**Apple iPhone Website Aesthetic (Streamlined November 2025):**
- Unified purple gradient palette (#667eea → #764ba2) across all hero sections
- 64px bold headlines with generous letter-spacing
- SF Pro font family (-apple-system) for native feel
- Streamlined icons (50-60px) for clean visual impact
- Smooth fadeInUp animations (0.6s ease-out)
- Compact card designs with subtle shadows
- Tighter spacing for more scannable layouts
- Reduced padding for less bulky presentation

**Visual Design System:**
- **Heroes:** 80px vertical padding, purple gradient background, rounded bottom corners (40px)
- **Cards:** 16-20px border-radius, lighter shadows (0 2px 12px), 24px padding for compact feel
- **Typography:** 64px headlines, 42px section headers, 20px card titles (streamlined)
- **Animations:** Subtle hover effects (translateY -2px to -4px, scale 1.01-1.05)
- **Icons:** Compact emoji icons (50-60px) for efficient visual communication
- **Badges:** Gradient backgrounds for status indicators (green, yellow, red)

## Page Designs

### Home Dashboard - `/`

**Design Features:**
- Purple gradient hero with "Your Health Dashboard" headline
- Subtitle: "Choose a section to explore your health insights"
- 5 large navigation cards in responsive grid layout

**Navigation Cards:**
- Grid layout: auto-fit columns, minimum 300px width, 30px gap
- Each card displays:
  * Large icon (64px): 📊 📅 ⌚ 💊 🔬
  * Section title (24px bold)
  * Description text (15px)
  * Arrow indicator (→) appears on hover
- Apple aesthetic: white background, purple gradient border on hover
- Smooth animations: fadeInUp (0.6s) with staggered delays
- Cards link to: Health Snapshot, Timeline, Wearable Insights, Medications, Lab Results

### Health Snapshot - `/snapshot/`

**Design Features:**
- Back to Dashboard button (← Back to Dashboard) at top
- Purple gradient hero with "Your Health Snapshot" headline
- Action buttons: "Prepare for Appointment" and "Share with Provider"
- Compact information display (removed Bootstrap accordions)
- No sidebar navigation

**Content Sections:**
1. **What's Changing:** 3 large trend cards with icons, descriptions, and recommendations
2. **Health Insights:** Unified checklist combining personal health tips and doctor questions with checkboxes for visual scanning
3. **Health Conditions:** Interactive dropdown list where each condition can be clicked to expand and reveal 4 detail sections:
   - 💬 What You Said (patient's symptoms and concerns)
   - 🔬 What Tests Showed (clinical findings)
   - 💡 What It Means (plain language explanation)
   - ⚕️ What We're Doing (treatment plan)
   - Accordion behavior: only one condition expanded at a time
   - Color-coded left borders by status (green/yellow/red/blue)
   - Smooth expand/collapse animations with rotating dropdown icon

### Health Timeline - `/health/timeline/`

**Design Features:**
- Back to Dashboard button at top
- Purple gradient hero with "Your Health Journey" headline
- No sidebar navigation
- Vertical timeline connector line with gradient
- 17 chronologically sorted events (most recent first)

**Event Cards:**
- 50px icons for each event type (🏥 ❤️ 🔬 💉 📋 🚨) - streamlined from 80px
- Date display with timeline connector
- Event title (20px), date badge with gradient
- All details shown inline (no expandable sections)
- Smooth hover effects (lift + icon rotation)
- Color-coded event type badges
- Compact 24px padding, 30px event spacing

### Wearable Insights - `/health/wearable/`

**Design Features:**
- Back to Dashboard button at top
- Purple gradient hero with "Wearable Insights" headline
- No sidebar navigation
- Date range display (last 7 days)
- AI insights banner with yellow/gold gradient

**Content Sections:**
1. **Your Averages:** 4 compact stat cards with 60px icons and 48px numbers (streamlined from 80px/56px)
   - Steps, Calories, Sleep, Heart Rate
   - Smooth hover effects (lift + scale + icon rotation)
   - 28px padding for less bulk
2. **Heart Rate Range:** Pink/magenta gradient card with min/max values
3. **Daily Activity:** Streamlined timeline cards showing daily metrics
   - Compact date tile with purple gradient
   - Metrics grid: steps, calories, active minutes, sleep, heart rate
   - 20px padding and tighter 16px spacing

### Medications - `/health/medications/`

**Design Features:**
- Back to Dashboard button at top
- Purple gradient hero with "Your Medications" headline
- No sidebar navigation
- 80px floating pill icon (💊) with animation
- Dedicated tab accessible from all pages
- Comprehensive medication management view

**Medication Cards:**
- Streamlined medication name (20px bold) with 40px pill icons (reduced from 48px)
- Dose and frequency badges with gradient backgrounds
- Purpose badge showing what the medication treats
- Compact information grid (started date, prescriber, frequency)
- Important Interactions section with yellow warning backgrounds
- Common Side Effects section with blue/purple backgrounds
- Smooth hover effects (lift and shadow enhancement)
- 24px padding, 16px spacing for less bulk

**Data Display:**
- Extracts medications from all patient visit notes
- Shows interactions and side effects from medication database
- Displays prescriber and start date for each medication
- Premium card design matching Apple aesthetic

### Lab Results - `/health/lab-results/`

**Design Features:**
- Back to Dashboard button at top
- Purple gradient hero with 80px microscope icon 🔬
- No sidebar navigation
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

### Card-Based Navigation Redesign (November 11, 2025)

**Navigation Transformation:**
- Replaced sidebar navigation with card-based home dashboard
- Created new home page (/) featuring 5 large navigation cards in Apple aesthetic grid
- Each card links to a detail section with intuitive icons and descriptions
- Removed sidebar from all 5 detail pages (Dashboard, Timeline, Wearable, Medications, Lab Results)
- Added "Back to Dashboard" button at top of each detail page for easy return to home

**URL Structure Changes:**
- Home dashboard: / (new)
- Health Snapshot: /snapshot/ (moved from /)
- Timeline: /health/timeline/ (URL name changed from health_timeline to timeline)
- Other sections remain at /health/wearable/, /health/medications/, /health/lab-results/

**Technical Implementation:**
- New home_view in core/views.py renders templates/core/home.html
- Updated core/urls.py and health/urls.py with new route patterns
- Base template navbar updated to reference 'home' instead of 'dashboard'
- Full-width layouts on detail pages (removed col-md-2/col-md-10 grid)
- Consistent back button styling across all pages with purple hover effects

**User Experience:**
- Cleaner, more focused navigation
- Reduced visual clutter (no persistent sidebar)
- Intuitive card-based interface matching Apple design philosophy
- Clear navigation breadcrumb via back button

### Interactive Health Conditions Dropdown (November 9, 2025)

**New Accordion-Style Condition List:**
- Transformed health conditions from static compact cards to interactive dropdown list
- Click any condition to expand and reveal detailed information in 4 sections:
  - 💬 What You Said: Patient's reported symptoms and concerns
  - 🔬 What Tests Showed: Clinical test results and findings
  - 💡 What It Means: Plain language explanation of the condition
  - ⚕️ What We're Doing: Current treatment plan and next steps
- Accordion behavior: only one condition can be expanded at a time for focused viewing
- Smooth expand/collapse animations with rotating dropdown arrow icon (▼)
- Color-coded left borders indicate status (green=stable, yellow=monitoring, red=concern, blue=improving)
- Maintains Apple aesthetic with clean list design and subtle hover effects

**Technical Implementation:**
- JavaScript `toggleCondition()` function handles expand/collapse
- CSS transitions for smooth max-height animations
- Detail grid layout adapts responsively for different screen sizes
- All 6 health conditions (AFib, High BP, Diabetes, Knee Arthritis, GERD, Thyroid) display with full clinical details

### Streamlined UI Design (November 9, 2025)

**All Pages Streamlined for Less Bulky, More Scannable Design:**

**Dashboard Improvements:**
- Merged "Personal Health Tips" and "Questions for Your Doctor" into unified "Health Insights" checklist with checkboxes
- Simplified Health Conditions from 4-quadrant detail boxes to compact status cards showing just condition name, status insight, and action

**Timeline Streamlining:**
- Reduced icon size from 80px to 50px for cleaner visual impact
- Reduced card padding from 36px to 24px for less bulk
- Reduced event spacing from 60px to 30px for tighter layout
- Shrunk event titles from 28px to 20px
- Removed expandable "View Details" sections, showing all information inline

**Wearable Insights Optimization:**
- Reduced stat card icons from 80px to 60px
- Reduced card padding from 40px to 28px
- Tightened grid gaps from 20px to 16px
- More compact daily activity cards with 20px padding

**Medications Compacting:**
- Reduced card padding from 40px to 24px
- Reduced pill icons from 48px to 40px
- Tighter spacing between cards (24px to 16px)
- Streamlined medication name from 28px to 20px

**Lab Results Tightening:**
- Reduced card padding from 32px to 24px
- Smaller date tiles and spacing
- More compact grid layouts with tighter gaps
- Test name reduced from 24px to 20px

**Results:**
- Significantly less bulky presentation across all 5 tabs
- More scannable layouts with tighter spacing
- Maintains Apple aesthetic with subtle hover effects
- All pages verified working (200 OK)

### Code Cleanup and Optimization (November 9, 2025)

**Removed Obsolete Authentication System:**
- Deleted all authentication views (register_view, login_view, logout_view) - 60 lines
- Removed authentication URL routes (login, register, logout)
- Deleted unused templates: login.html and register.html
- Cleaned up base.html navigation to remove auth UI
- This is a public demo app with no login requirement

**Eliminated Dead Code:**
- Removed add_health_record function and its URL route - 32 lines
- Deleted 12+ unused imports from health/views.py (HealthRecord, Medication, LabResult, VitalSign, WearableData, AIInsight, QuickNote, and utilities)
- Removed all unused imports from core/views.py

**Fixed Duplicate Logic:**
- Removed medication processing from dashboard_view since medications moved to dedicated tab
- Dashboard no longer wastes CPU processing data it doesn't display

**Results:**
- Removed ~150 lines of dead code
- core/views.py: 87% smaller (101 → 14 lines)
- health/views.py: 22% smaller (200 → 156 lines)
- Cleaner, more maintainable codebase
- All 5 pages verified working (200 OK)

### Medications Tab Addition (November 8, 2025)

**New Dedicated Medications Page:**
- Created standalone Medications tab accessible from all pages
- Added Medications (💊) link to all sidebar navigations (Dashboard, Timeline, Wearable, Lab Results)
- Moved medications from Health Snapshot to dedicated page with enhanced display
- Redesigned with full Apple aesthetic: purple gradient hero, 80px pill icon, premium cards
- Displays medication details, interactions, and side effects in visual cards
- Removed medications section from dashboard for cleaner, more focused health snapshot

**Technical Implementation:**
- Updated medications view to use sample data from visit notes
- Extracts unique medications with interactions and side effects
- Maintains consistent navigation across all 5 tabs
- Public demo compatible (no authentication required)

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
