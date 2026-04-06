import { type Page, type Locator } from '@playwright/test';

export class CuadernillosPage {
  readonly page: Page;
  readonly url: string;

  readonly title: Locator;
  readonly tabs: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = '/cuadernillos';

    this.title = page.locator('h1');
    this.tabs = page.locator('button:has-text("Preescritura")');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async clickTab(categoryName: string) {
    await this.page.locator(`button:has-text("${categoryName}")`).click();
  }

  async getCategoryCount() {
    return this.tabs.count();
  }
}
