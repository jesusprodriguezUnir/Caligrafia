import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Home Page', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should load the page correctly', async () => {
    await expect(homePage.title).toBeVisible();
    await expect(homePage.ctaButton).toBeVisible();
  });

  test('should display the correct title', async () => {
    const titleText = await homePage.getTitleText();
    expect(titleText).toContain('CALIGRA');
  });

  test('should display benefit cards', async () => {
    await expect(homePage.beneficiosSection).toBeVisible();
  });

  test('should navigate to caligrafiate when CTA is clicked', async ({ page }) => {
    await homePage.clickCtaButton();
    await expect(page).toHaveURL(/\/caligrafiate/);
  });
});
