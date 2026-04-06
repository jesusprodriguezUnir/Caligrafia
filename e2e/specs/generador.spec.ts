import { test, expect } from '@playwright/test';
import { GeneradorPage } from '../pages/generador.page';

test.describe('Generador Page', () => {
  let generadorPage: GeneradorPage;

  test.beforeEach(async ({ page }) => {
    generadorPage = new GeneradorPage(page);
    await generadorPage.goto();
  });

  test('should load the page correctly', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should accept text input', async () => {
    await generadorPage.fillText('Hola Mundo');
    const value = await generadorPage.getInputValue();
    expect(value).toBe('Hola Mundo');
  });

  test('should have canvas visible', async () => {
    await expect(generadorPage.canvas).toBeVisible();
  });
});
