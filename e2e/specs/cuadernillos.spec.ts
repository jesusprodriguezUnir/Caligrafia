import { test, expect } from '@playwright/test';
import { CuadernillosPage } from '../pages/cuadernillos.page';

test.describe('Cuadernillos Page', () => {
  let cuadernillosPage: CuadernillosPage;

  test.beforeEach(async ({ page }) => {
    cuadernillosPage = new CuadernillosPage(page);
    await cuadernillosPage.goto();
  });

  test('should load the page correctly', async () => {
    await expect(cuadernillosPage.title).toBeVisible();
  });

  test('should display category tabs', async () => {
    const tabCount = await cuadernillosPage.getCategoryCount();
    expect(tabCount).toBeGreaterThan(0);
  });

  test('should switch tabs when clicked', async ({ page }) => {
    await cuadernillosPage.clickTab('Vocales Mayúsculas');
    await expect(page.locator('text=Nivel 2')).toBeVisible();
  });
});
