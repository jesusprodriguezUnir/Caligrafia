import { test, expect } from '@playwright/test';
import { GeneradorPage } from '../pages/generador.page';

test.describe('Generador Page', () => {
  let generadorPage: GeneradorPage;

  test.beforeEach(async ({ page }) => {
    generadorPage = new GeneradorPage(page);
    await generadorPage.goto();
  });

  test('should load the page correctly', async ({ page }) => {
    await expect(generadorPage.title).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
  });

  test('should accept text input', async () => {
    const testText = 'Hola Mundo';
    await generadorPage.fillText(testText);
    const value = await generadorPage.getInputValue();
    expect(value).toBe(testText);
  });

  test('should have canvas visible', async () => {
    await expect(generadorPage.canvas).toBeVisible();
  });

  test('should generate random text when clicking aleatorio', async () => {
    const initialValue = await generadorPage.getInputValue();
    await generadorPage.clickAleatorio();
    const newValue = await generadorPage.getInputValue();
    expect(newValue).not.toBe(initialValue);
  });
});
