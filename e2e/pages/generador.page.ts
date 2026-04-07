import { type Page, type Locator } from '@playwright/test';

export class GeneradorPage {
  readonly page: Page;
  readonly url: string;

  readonly title: Locator;
  readonly textInput: Locator;
  readonly canvas: Locator;
  readonly downloadButton: Locator;
  readonly aleatorioButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = '/generador';

    this.title = page.locator('h2:has-text("Ajustes del Estudio")');
    this.textInput = page.locator('input[type="text"]').first();
    this.canvas = page.locator('canvas');
    this.downloadButton = page.locator('button:has-text("Descargar")');
    this.aleatorioButton = page.locator('button:has-text("Aleatorio")');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async fillText(text: string) {
    await this.textInput.fill(text);
  }

  async clickAleatorio() {
    await this.aleatorioButton.click();
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
