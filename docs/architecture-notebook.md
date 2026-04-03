# Architecture Notebook: Caligrafía Mágica

## 1. Introduction
This document describes the high-level architecture of the **Caligrafía Mágica** application. It serves as a guide for developers and stakeholders to understand the system's design, constraints, and key architectural decisions.

### 1.1 Purpose
To provide an interactive platform for children to learn and practice calligraphy using modern web technologies.

### 1.2 Scope
This notebook covers the frontend application (Next.js), its static export capability, and its integration with Supabase for data management.

## 2. Architectural Objectives and Principles
- **Ease of Use**: The interface must be intuitive for children, using large, colorful buttons and feedback.
- **Performance**: The app should load quickly and be responsive, especially the interactive canvas.
- **Portability**: Capable of being deployed as a static site (GitHub Pages, Vercel, etc.).
- **Scalability**: Decoupled backend (Supabase) to handle users and content as the app grows.

## 3. Architectural Constraints
- **Next.js Static Export**: The application is configured with `output: 'export'`, meaning no server-side Next.js features (like API routes or SSR) can be used.
- **Client-Side Supabase**: All database and auth interactions must happen on the client.
- **Remote Processing**: Heavy operations (like PDF batch processing) must run outside Next.js runtime, using Supabase Edge Functions.
- **Device Support**: Must work well on tablets and desktops with touch or mouse input for the canvas.

## 4. Architecture Overview
The system follows a **Component-Based Architecture** using React and Next.js.

### 4.1 Frontend (Next.js)
- **App Router**: Organized using the `/app` directory for routing.
- **Pages**:
    - `/`: Home with navigation.
    - `/cuadernillos`: Booklet management and downloads.
    - `/lienzo`: Interactive drawing canvas.
- **Styling**: Vanilla CSS with CSS Modules and Global CSS for a consistent design system.
- **Utilities**: Supabase client singleton for data synchronization.

### 4.2 Data & Services (Supabase)
- **Authentication**: Managed via Supabase Auth (client-side persistence).
- **Database**: PostgreSQL (provided by Supabase) for storing user progress or booklet metadata.
- **Storage**: Supabase Storage for PDF booklets (if applicable).
- **Edge Functions**: `process-pdfs` function handles admin-triggered PDF processing for static deployments.

## 5. Key Architectural Decisions
| Decision ID | Decision | Rationale | Status |
|-------------|----------|-----------|--------|
| AD-001 | Next.js 16 Static Export | To allow for low-cost, high-performance static hosting (e.g., GitHub Pages). | Accepted |
| AD-002 | Canvas API for Lienzo | Standard browser API for high-performance interactive drawing without external heavy libraries. | Accepted |
| AD-003 | Supabase | Provides a robust, serverless backend that integrates easily with a static frontend. | Accepted |
| AD-004 | Vanilla CSS + CSS Modules | Maximum control over performance and design aesthetics without the overhead of heavy utility frameworks like Tailwind for the core kids-UI. | Accepted |
| AD-005 | Move PDF processing to Supabase Edge Function | Keeps static export compatibility while enabling admin batch jobs. | Accepted |

## 6. Subsystem Decomposition
- **UI Components**: Reusable buttons, cards, and glassmorphism elements.
- **Canvas Engine**: Responsible for handling mouse/touch events and drawing on the HTML5 Canvas.
- **Supabase Integration Layer**: Singleton client and hooks for data fetching.

## 7. Quality Attributes
- **Usability**: Feedback animations, large tap targets.
- **Interactivity**: Low latency in the drawing engine.
- **Security**: Client-side auth using Supabase best practices (JWT, RLS).
- **Maintainability**: Clear separation of concerns with the App Router structure.
