# Replit.md

## Overview

This is a wedding website application for Anna & Lukas built with a full-stack JavaScript architecture. The application features a modern React frontend with a Node.js/Express backend, designed to collect RSVP responses for their September 14, 2025 wedding at Gut Sonnenberg. The site includes a timeline, venue information, and a comprehensive RSVP form with menu selection and allergy accommodation.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom wedding theme colors (dusty rose, warm white, wedding beige)
- **UI Components**: Shadcn/UI component library with Radix UI primitives
- **State Management**: React Query (@tanstack/react-query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM (DatabaseStorage implementation)
- **Database Provider**: Neon Database (@neondatabase/serverless) via Replit PostgreSQL
- **Schema Management**: Drizzle Kit for migrations
- **Validation**: Zod for request validation
- **Development**: tsx for TypeScript execution

## Key Components

### Database Schema
- **RSVPs Table**: Stores guest responses with name, attendance status (ja/nein/vielleicht), menu choice (fleisch/vegetarisch/vegan), allergies, and timestamp
- **Users Table**: Basic user structure (maintained for compatibility)

### API Endpoints
- `POST /api/rsvp`: Creates new RSVP entries with validation
- `GET /api/rsvps`: Retrieves all RSVP responses (admin functionality)

### Frontend Pages
- **Home (/)**: Main landing page with hero section, timeline, venue info, and RSVP form
- **Impressum (/impressum)**: Legal information page
- **Datenschutz (/datenschutz)**: Privacy policy page
- **404 Page**: Custom not found page

### UI Components
- **Navigation**: Fixed header with smooth scrolling to sections
- **RSVP Form**: Multi-step form with attendance selection, menu choices, and allergy fields
- **Timeline**: Visual representation of wedding day schedule
- **Footer**: Site-wide footer with contact information and legal links

## Data Flow

1. **RSVP Submission**: User fills form → React Hook Form validates → POST to `/api/rsvp` → Drizzle ORM saves to PostgreSQL → Success toast displayed
2. **Form Validation**: Client-side Zod validation → Server-side Zod validation → Database constraints
3. **State Management**: React Query handles API calls, caching, and error states
4. **Routing**: Wouter handles client-side navigation with anchor link support for same-page sections

## External Dependencies

### Core Dependencies
- React ecosystem (React, React DOM, React Hook Form)
- Radix UI components for accessible UI primitives
- Tailwind CSS for styling with custom theme
- Drizzle ORM for type-safe database operations
- Express.js for backend API
- Zod for schema validation

### Development Dependencies
- Vite for build tooling and development server
- TypeScript for type safety
- tsx for TypeScript execution in development
- esbuild for production builds

### Database
- PostgreSQL via Neon Database serverless
- Drizzle Kit for schema management and migrations

## Deployment Strategy

### Development Environment
- Replit environment with Node.js 20, PostgreSQL 16
- Vite dev server on port 5000
- Hot module replacement enabled
- Development-specific error overlays and debugging tools

### Production Build
- Vite builds frontend to `dist/public`
- esbuild bundles backend to `dist/index.js`
- Static file serving from Express
- Environment variables for database connection

### Configuration
- TypeScript configured for both client and server
- Path aliases for clean imports (@/, @shared/)
- ESM modules throughout the application
- PostCSS with Tailwind CSS processing

## Changelog

```
Changelog:
- June 23, 2025. Initial setup
- June 23, 2025. Added PostgreSQL database integration with DatabaseStorage
- June 23, 2025. Updated names from "Anna & Lukas" to "Eillen & Dennis" 
- June 23, 2025. Changed navigation from "RSVP" to "Anmeldung" and moved legal pages to footer
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```