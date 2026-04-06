# Testing Guide - Caligra-fíate

## Overview

This project uses a comprehensive testing strategy with:
- **Unit Tests**: Vitest + Testing Library for components and utilities
- **E2E Tests**: Playwright for end-to-end browser testing

## Quick Start

### Install dependencies
```bash
npm ci
```

### Install Playwright browsers
```bash
npm run test:e2e:install
```

## Running Tests

### Unit Tests
```bash
# Run once
npm run test:unit

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### E2E Tests
```bash
# Run all E2E tests
npm run test:e2e

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run on mobile only
npm run test:e2e:mobile

# Open Playwright UI
npm run test:e2e:ui

# Show test report
npm run test:e2e:report
```

### All Tests
```bash
npm run test:all
```

## Test Structure

```
src/
├── test/
│   ├── setup-vitest.ts       # Vitest setup
│   └── mocks/                # Mock implementations
│       ├── canvas.ts
│       ├── supabase.ts
│       ├── qrcode.ts
│       └── pdf-lib.ts
├── components/
│   └── __tests__/           # Component unit tests
│       └── SecretTrigger.test.tsx
└── lib/
    └── helpers/
        └── __tests__/       # Helper unit tests
            ├── canvas-helpers.test.ts
            ├── content-helpers.test.ts
            └── text-helpers.test.ts

e2e/
├── pages/                   # Page Objects
│   ├── home.page.ts
│   ├── caligrafiate.page.ts
│   ├── cuadernillos.page.ts
│   ├── generador.page.ts
│   └── contacto.page.ts
├── components/              # Component Objects
│   └── footer.component.ts
└── specs/                   # Test specifications
    ├── home.spec.ts
    ├── caligrafiate.spec.ts
    ├── cuadernillos.spec.ts
    ├── generador.spec.ts
    ├── contacto.spec.ts
    ├── navigation.spec.ts
    └── smoke.spec.ts
```

## Writing Tests

### Unit Tests (Vitest)

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);
    
    await user.click(screen.getByRole('button'));
    // assertions...
  });
});
```

### E2E Tests (Playwright)

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should load correctly', async () => {
    await expect(homePage.title).toBeVisible();
  });
});
```

## Mocking

### Canvas API
```typescript
import { mockCanvasContext, resetCanvasMocks } from '@/test/mocks/canvas';

beforeEach(() => {
  resetCanvasMocks();
});
```

### Supabase
```typescript
import { mockSupabaseClient, resetSupabaseMocks } from '@/test/mocks/supabase';
```

### Dynamic Imports
```typescript
vi.mock('qrcode', () => ({
  default: {
    toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,mock'),
  },
}));
```

## CI/CD

Tests run automatically on:
- Push to main/develop
- Pull requests to main

GitHub Actions workflows:
- `.github/workflows/test.yml` - Unit and E2E tests
- `.github/workflows/deploy.yml` - Deployment

## Coverage Goals

| Area | Target |
|------|--------|
| Helpers | 90% |
| Components | 80% |
| Pages | 70% |
| E2E Flows | 100% |

## Tips

1. **Use Page Objects**: Keep selectors in page objects for maintainability
2. **Mock external services**: Don't rely on Supabase/QR generation in tests
3. **Test critical paths**: Focus on user journeys that affect conversion
4. **Keep tests independent**: Each test should run alone
5. **Use realistic data**: Don't use "test" everywhere - use realistic examples

## Troubleshooting

### Tests timeout
Increase timeout in vitest.config.ts or playwright.config.ts

### Canvas tests fail
Make sure to reset mocks between tests

### E2E tests flaky
- Use `waitFor` instead of `waitForSelector`
- Check for animations that might interfere
- Ensure page is fully loaded before assertions
