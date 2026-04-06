import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate from Home to Caligrafiate', async ({ page }) => {
    await page.goto('/');
    await page.locator('#cta-start-wizard').click();
    await expect(page).toHaveURL(/\/caligrafiate/);
  });

  test('should navigate from Home to Cuadernillos', async ({ page }) => {
    await page.goto('/');
    await page.locator('#cta-explore-collection').click();
    await expect(page).toHaveURL(/\/cuadernillos/);
  });

  test('should navigate from Caligrafiate back to Home', async ({ page }) => {
    await page.goto('/caligrafiate');
    await page.locator('#back-to-inicio').click();
    await expect(page).toHaveURL(/\/$/);
  });
});
