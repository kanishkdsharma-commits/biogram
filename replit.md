# Biogram Health Platform

## Overview

Biogram is a health-tech AI platform designed to transform fragmented medical data into clear, personalized insights. The application provides an AI-powered interface that reads electronic health records (EHRs), integrates wearable data, and creates a comprehensive health story through an interactive timeline and insights dashboard. Built with a modern tech stack, it features a sleek "Notion meets Apple Health" design aesthetic with a focus on making medical data accessible and understandable for everyday users.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite for fast development and optimized production builds
- **Routing:** Wouter for lightweight client-side routing
- **State Management:** TanStack Query (React Query) for server state management
- **UI Framework:** Radix UI primitives with shadcn/ui components
- **Styling:** Tailwind CSS with CSS variables for theming
- **Animations:** Framer Motion for smooth transitions and micro-interactions

**Design System:**
- Uses a blue/teal color palette (primary: `hsl(199, 89%, 48%)`, secondary: `hsl(173, 80%, 40%)`)
- Typography: Inter font family for modern, clean readability
- Component library follows the "New York" style variant from shadcn/ui
- Fully responsive design with mobile-first approach

**Core UI Components:**
- **Dashboard:** Main landing page with three primary views (Health Snapshot, Health Timeline, Wearable Insights)
- **Health Snapshot:** AI-generated overview with diagnoses, medications, vital trends, and action items
- **Health Timeline:** Interactive chronological view of medical events with expandable details
- **Wearable Insights:** Real-time health metrics with AI-derived pattern detection
- **Jargon Translator:** Tooltip-based system that converts medical terminology into layman's terms on hover
- **Security Drawer:** Slide-out panel for HIPAA compliance information and privacy settings
- **Keyboard Shortcuts:** Navigation shortcuts (1, 2, 3 for sections; T for jargon toggle)

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with Express.js
- **Language:** TypeScript with ES Modules
- **Database ORM:** Drizzle ORM configured for PostgreSQL
- **Database Provider:** Neon serverless PostgreSQL
- **Session Management:** connect-pg-simple for PostgreSQL-backed sessions

**API Design:**
- RESTful API pattern with JSON responses
- Currently implements static file-based data serving for demo purposes
- Health check endpoint (`/api/health`) for service monitoring
- Insights endpoint (`/api/insights`) serving mock health data from JSON files

**Server Architecture:**
- Development mode uses Vite middleware for HMR (Hot Module Replacement)
- Production mode serves pre-built static assets
- Request logging middleware with duration tracking
- JSON body parsing with raw body preservation for webhook integrations

**Data Storage:**
- In-memory storage implementation (`MemStorage`) for user management
- Drizzle schema defines user table with UUID primary keys
- Database migrations managed through Drizzle Kit
- Schema validation using Drizzle-Zod for type-safe operations

### External Dependencies

**Third-Party UI Libraries:**
- **Radix UI:** Comprehensive set of accessible, unstyled UI primitives (accordion, dialog, dropdown, popover, tooltip, etc.)
- **Framer Motion:** Animation library for smooth transitions and gesture-based interactions
- **Embla Carousel:** Touch-friendly carousel component
- **cmdk:** Command palette component for keyboard-driven navigation

**Database & ORM:**
- **Neon Serverless PostgreSQL:** Cloud-native PostgreSQL database
- **Drizzle ORM:** Lightweight TypeScript ORM with type-safe query building
- **Drizzle Kit:** Migration and schema management tool

**Utilities & Tools:**
- **React Hook Form:** Form state management with validation
- **Zod:** TypeScript-first schema validation
- **date-fns:** Date manipulation and formatting
- **class-variance-authority (cva):** Type-safe variant styling
- **clsx & tailwind-merge:** Conditional className utilities

**Development Tools:**
- **Replit Plugins:** Cartographer for AI assistance, dev banner, runtime error overlay
- **TSX:** TypeScript execution for development server
- **esbuild:** Fast JavaScript bundler for production builds

**Future Integrations (Planned):**
- HIPAA-compliant data encryption services
- EHR system integrations (MyChart, FollowMyHealth compatibility)
- Wearable device APIs (Apple Health, Google Fit, Fitbit)
- Clinical practice management systems for provider partnerships