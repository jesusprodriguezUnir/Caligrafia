import { test, expect } from '@playwright/test';
import { CaligrafiatePage } from '../pages/caligrafiate.page';

test.describe('Caligrafiate Page', () => {
  let caligrafiatePage: CaligrafiatePage;

  test.beforeEach(async ({ page }) => {
    caligrafiatePage = new CaligrafiatePage(page);
    await caligrafiatePage.goto();
  });

  test('should load the page correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('CALIGRA');
  });

  test('should have back button', async ({ page }) => {
    await expect(page.locator('#back-to-inicio')).toBeVisible();
  });
});
