import { type Page, type Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly url: string;

  readonly heroSection: Locator;
  readonly title: Locator;
  readonly subtitle: Locator;
  readonly ctaButton: Locator;
  readonly beneficiosSection: Locator;
  readonly ejemplosSection: Locator;
  readonly testimoniosSection: Locator;

  readonly footerEmailLink: Locator;
  readonly footerInstagramLink: Locator;
  readonly footerFacebookLink: Locator;
  readonly footerTikTokLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = '/';

    this.heroSection = page.locator('main');
    this.title = page.locator('h1');
    this.subtitle = page.locator('p:has-text("El Arte de Escribir")');
    this.ctaButton = page.locator('#cta-start-wizard');
    
    this.beneficiosSection = page.locator('text=¿Por qué practicar?');
    this.ejemplosSection = page.locator('text=Herramientas para cada etapa');
    this.testimoniosSection = page.locator('text=Nuestra Misión');

    this.footerEmailLink = page.locator('footer a[href*="mailto"]');
    this.footerInstagramLink = page.locator('footer a[href*="instagram"]');
    this.footerFacebookLink = page.locator('footer a[href*="facebook"]');
    this.footerTikTokLink = page.locator('footer a[href*="tiktok"]');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async clickCtaButton() {
    await this.ctaButton.click();
  }

  async getTitleText() {
    return this.title.textContent();
  }

  async getSubtitleText() {
    return this.subtitle.textContent();
  }

  async isHeroVisible() {
    return this.heroSection.isVisible();
  }

  async isBenefitCardsVisible() {
    return this.beneficiosSection.isVisible();
  }

  async clickFooterEmail() {
    await this.footerEmailLink.click();
  }

  async clickFooterInstagram() {
    await this.footerInstagramLink.click();
  }
}
