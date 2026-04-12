# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Caligrafía Mágica** is an educational platform for learning handwriting and calligraphy (Spanish: "caligrafía"). The app generates customizable handwriting practice worksheets with various layouts, fonts, and exercises. It deploys as a **static Next.js export** with Supabase as the backend.

## Key Architecture

- **Frontend**: Next.js 16 (static export) + React 19 + TypeScript
- **Backend**: Supabase (authentication, edge functions, storage)
- **Styling**: Tailwind CSS 4 + CSS Modules
- **Testing**: Vitest (unit) + Playwright (E2E across desktop, tablet, mobile)
- **Canvas Rendering**: Browser canvas API for worksheet PDF generation

## Static Export Design

The app uses `output: "export"` in `next.config.ts`, meaning:

- No server-side routes in production; everything is pre-rendered
- Supabase Edge Functions handle backend tasks (PDF processing)
- Client-side authentication via Supabase JS SDK
- Admin features (like PDF management) live on client but require auth checks

## Common Commands

### Development

- `npm run dev` — Start dev server at `http://localhost:3000`

### Building & Deployment

- `npm run build` — Build static export to `out/` directory
- `npm run start` — Start production server (local testing)

### Testing

- `npm run test` — Run Vitest in watch mode
- `npm run test:unit` — Run unit tests once
- `npm run test:coverage` — Generate coverage report
- `npm run test:e2e` — Run Playwright E2E tests
- `npm run test:e2e:ui` — Run E2E tests with UI (interactive)
- `npm run test:e2e:headed` — Run E2E tests in headed browser mode
- `npm run test:e2e:mobile` — Run E2E tests on mobile profiles only
- `npm run test:e2e:install` — Install browser binaries for Playwright
- `npm run test:full` — Full CI flow: reset DB, seed, run all tests

### Linting

- `npm run lint` — Run ESLint (flat config from `eslint-config-next`)

### Database Management

- `npm run db:seed` — Seed database with initial data (uses `scripts/db-manager.ts`)
- `npm run db:reset` — Reset database to clean state
- `npm run db:status` — Check database status

## Project Structure

```txt
src/
├── app/                           # Next.js pages (App Router)
│   ├── layout.tsx                 # Root layout with footer
│   ├── page.tsx                   # Home page
│   ├── caligrafiate/              # Canvas-based worksheet generator
│   │   ├── page.tsx               # Main generator interface
│   │   └── caligrafiate.module.css
│   ├── generador/                 # Alternative generator page
│   ├── cuadernillos/              # Workbook/collection management
│   ├── contacto/                  # Contact page
│   └── admin/pdf-manager/         # Admin panel for PDF processing
├── components/                    # Reusable React components
│   ├── SecretTrigger.tsx          # Hidden admin trigger
│   ├── Header.tsx                 # Navigation header
│   └── Icons.tsx                  # SVG icon components
├── lib/
│   ├── pdf-processor.ts           # PDF processing logic
│   └── helpers/                   # Utility functions
│       ├── canvas-helpers.ts      # Canvas rendering helpers
│       ├── content-helpers.ts     # Content/exercise generation
│       ├── text-helpers.ts        # Text formatting helpers
│       └── types.ts               # Shared type definitions
├── utils/
│   └── supabase/
│       └── client.ts              # Supabase client singleton
└── test/
    ├── setup-vitest.ts            # Vitest configuration & mocks
    └── mocks/                     # Module mocks for tests
        ├── canvas.ts
        ├── pdf-lib.ts
        ├── qrcode.ts
        └── supabase.ts

e2e/
├── pages/                         # Page Object Models (Playwright)
│   ├── home.page.ts
│   ├── caligrafiate.page.ts
│   ├── generador.page.ts
│   └── ...
└── specs/                         # Test specifications
    ├── smoke.spec.ts              # Smoke tests (all pages load)
    ├── home.spec.ts
    ├── caligrafiate.spec.ts
    └── ...

scripts/
├── db-manager.ts                  # Database seed/reset script
└── generate-test-pdfs.js          # PDF test data generator
```

## Canvas Worksheet Generator

The core feature lives in `src/app/caligrafiate/page.tsx` and uses canvas for worksheet rendering. Key configuration options:

### Formatos (Page Layouts)

- `pauta-guiada` — Guided lines with dots
- `pauta-normal` — Standard ruled lines
- `cuadricula-5` — 5mm grid
- `cuadricula-4` — 4mm grid

### Márgenes (Margins)

- `sin` — No margin (20px)
- `con` — Standard margin (60px)
- `dibujo` — Decorative margin with drawings (85px)

### Tipos de Letra (Fonts)

- `massallera`, `massallera-dot`
- `escolar`, `escolar-dot`
- `mestra-pauta`, `mestra-pauta-dot`
- `mestra-guiada`, `mestra-guiada-dot`

### Contenido (Content/Exercises)

- Trazos (strokes)
- Vowels (uppercase/lowercase)
- Alphabet (uppercase/lowercase)
- Syllables, words, phrases, texts

### Text Mode

- Predefined exercises (`contenido` selections)
- Free text mode with custom enunciado, texto, pie de página

Canvas constants: A4 @ 96dpi = 794px × 1123px

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
# Optional alias
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
# Optional, defaults to 'process-pdfs'
NEXT_PUBLIC_SUPABASE_PROCESS_PDFS_FUNCTION=process-pdfs
```

Supabase env vars are required at runtime (checked in `src/utils/supabase/client.ts`).

## Testing Approach

### Unit Tests (Vitest)

- Located at `src/**/*.test.ts(x)`
- Setup: `src/test/setup-vitest.ts` (mocks window APIs, Supabase, canvas, fetch)
- Path alias: `@/*` resolves to `src/*`
- Coverage excludes test files, types, index files, and configs
- Canvas and PDF-lib are mocked for tests (see `src/test/mocks/`)

### E2E Tests (Playwright)

- Located at `e2e/specs/*.spec.ts`
- Uses Page Object Model pattern (`e2e/pages/*.page.ts`)
- Runs on multiple device profiles: Mobile Safari (iPhone 13), Mobile Chrome (Pixel 5), Tablet (iPad), Desktop Chrome, Desktop Firefox
- Base URL: `http://localhost:3000` (dev server auto-started)
- Captures screenshots & videos on failure
- No retries locally (2 retries in CI)

## Important Notes

- **Static Export**: No server-side logic can run at request time. Use Supabase Edge Functions for backend tasks.
- **Image Optimization**: Disabled (`unoptimized: true`) for static export compatibility.
- **Supabase Singleton**: `getSupabaseClient()` in `src/utils/supabase/client.ts` ensures only one client instance.
- **Admin Access**: Controlled via Supabase user roles. SecretTrigger provides client-side unlock, but server-side validation happens on Edge Functions.
- **PDF Processing**: Offloaded to Edge Function `process-pdfs` for PDFs in the `public/` directory.
- **TypeScript Strict Mode**: Enabled; all code must be type-safe.

## Git Workflow

- Main branch: `main`
- Development branch convention: descriptive names (e.g., `jesusr/layout`, `feature/canvas-optimization`)
- Use conventional commit messages for clarity

## Cursor/Copilot Rules

None found in `.cursor/rules/` or `.github/copilot-instructions.md`.

## Useful Links

- [Supabase JS SDK](https://supabase.com/docs/reference/javascript) — Auth & functions docs
- [Next.js 16 Documentation](https://nextjs.org/docs) — See `node_modules/next/dist/docs/` for breaking changes
- [Playwright Documentation](https://playwright.dev/) — API details for test writing
- [Vitest Documentation](https://vitest.dev/) — Unit test runner configuration
