import { test, expect } from '@playwright/test';
import { ContactoPage } from '../pages/contacto.page';

test.describe('Contacto Page', () => {
  let contactoPage: ContactoPage;

  test.beforeEach(async ({ page }) => {
    contactoPage = new ContactoPage(page);
    await contactoPage.goto();
  });

  test('should load the page correctly', async () => {
    await expect(contactoPage.title).toBeVisible();
  });

  test('should display back link', async () => {
    await expect(contactoPage.backLink).toBeVisible();
  });

  test('should have email link with mailto href', async () => {
    const href = await contactoPage.getEmailHref();
    expect(href).toContain('mailto:');
  });

  test('should navigate back when back link is clicked', async ({ page }) => {
    await contactoPage.clickBack();
    await expect(page).toHaveURL(/\/caligrafiate/);
  });
});
