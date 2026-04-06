import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('caligrafiate page loads', async ({ page }) => {
    await page.goto('/caligrafiate');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('cuadernillos page loads', async ({ page }) => {
    await page.goto('/cuadernillos');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('generador page loads', async ({ page }) => {
    await page.goto('/generador');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('contacto page loads', async ({ page }) => {
    await page.goto('/contacto');
    await expect(page.locator('h1')).toBeVisible();
  });
});
