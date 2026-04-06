import { type Page, type Locator } from '@playwright/test';

export class CaligrafiatePage {
  readonly page: Page;
  readonly url: string;

  readonly backButton: Locator;
  readonly brandTitle: Locator;

  readonly stepper: Locator;
  readonly stepDots: Locator;

  readonly nextButton: Locator;
  readonly backNavButton: Locator;

  readonly canvas: Locator;
  readonly previewTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = '/caligrafiate';

    this.backButton = page.locator('#back-to-inicio');
    this.brandTitle = page.locator('h1');

    this.stepper = page.locator('[class*="stepper"]');
    this.stepDots = page.locator('[class*="stepDot"]');

    this.nextButton = page.locator('button:has-text("Siguiente")');
    this.backNavButton = page.locator('button:has-text("Anterior")');

    this.canvas = page.locator('canvas');
    this.previewTitle = page.locator('text=Vista Previa');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async clickNext() {
    await this.nextButton.click();
  }

  async clickBack() {
    await this.backNavButton.click();
  }

  async isCanvasVisible() {
    return this.canvas.isVisible();
  }

  async isNextButtonEnabled() {
    const button = this.nextButton;
    const isDisabled = await button.getAttribute('disabled');
    return isDisabled === null;
  }
}
