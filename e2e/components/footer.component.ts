import { type Page, type Locator } from '@playwright/test';

export class FooterComponent {
  readonly page: Page;

  readonly footer: Locator;
  readonly title: Locator;
  readonly subtitle: Locator;

  readonly emailLink: Locator;
  readonly instagramLink: Locator;
  readonly facebookLink: Locator;
  readonly tiktokLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.footer = page.locator('footer');
    this.title = page.locator('.siteFooterTitle, footer h1, footer strong:has-text("Siguenos")');
    this.subtitle = page.locator('.siteFooterSubtitle');

    this.emailLink = page.locator('footer a[href*="mailto"]');
    this.instagramLink = page.locator('footer a[href*="instagram"]');
    this.facebookLink = page.locator('footer a[href*="facebook"]');
    this.tiktokLink = page.locator('footer a[href*="tiktok"]');
  }

  async isVisible() {
    return this.footer.isVisible();
  }

  async clickEmail() {
    await this.emailLink.click();
  }

  async clickInstagram() {
    await this.instagramLink.click();
  }

  async clickFacebook() {
    await this.facebookLink.click();
  }

  async clickTikTok() {
    await this.tiktokLink.click();
  }

  async getEmailHref() {
    return this.emailLink.getAttribute('href');
  }

  async getInstagramHref() {
    return this.instagramLink.getAttribute('href');
  }
}
