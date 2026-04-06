import { type Page, type Locator } from '@playwright/test';

export class GeneradorPage {
  readonly page: Page;
  readonly url: string;

  readonly title: Locator;
  readonly textInput: Locator;
  readonly suggestButtons: Locator;
  readonly canvas: Locator;
  readonly downloadButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = '/generador';

    this.title = page.locator('h1:has-text("Generador")');
    this.textInput = page.locator('input[type="text"]');
    this.suggestButtons = page.locator('button:has-text("Mamá"), button:has-text("Papá"), button:has-text("Frase")');
    this.canvas = page.locator('canvas');
    this.downloadButton = page.locator('button:has-text("Descargar PNG")');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async fillText(text: string) {
    await this.textInput.fill(text);
  }

  async clickSuggest(suggestion: string) {
    // Labels are exactly "Mamá", "Papá" or "Frase"
    await this.page.locator(`button:has-text("${suggestion}")`).click();
  }

  async isCanvasVisible() {
    return this.canvas.isVisible();
  }

  async clickDownload() {
    await this.downloadButton.click();
  }

  async getInputValue() {
    return this.textInput.inputValue();
  }
}
