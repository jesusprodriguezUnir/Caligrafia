import { type Page, type Locator } from '@playwright/test';

export class ContactoPage {
  readonly page: Page;
  readonly url: string;

  readonly title: Locator;
  readonly backLink: Locator;

  readonly emailLink: Locator;
  readonly instagramLink: Locator;
  readonly facebookLink: Locator;
  readonly tiktokLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = '/contacto';

    this.title = page.locator('h1:has-text("Contacto")');
    this.backLink = page.locator('#back-link');

    this.emailLink = page.locator('a[href*="mailto"]').first();
    this.instagramLink = page.locator('a[href*="instagram"]').first();
    this.facebookLink = page.locator('a[href*="facebook"]').first();
    this.tiktokLink = page.locator('a[href*="tiktok"]').first();
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async clickBack() {
    await this.backLink.click();
  }

  async getEmailHref() {
    return this.emailLink.getAttribute('href');
  }

  async getInstagramHref() {
    return this.instagramLink.getAttribute('href');
  }

  async isEmailLinkVisible() {
    return this.emailLink.isVisible();
  }

  async isInstagramLinkVisible() {
    return this.instagramLink.isVisible();
  }
}
