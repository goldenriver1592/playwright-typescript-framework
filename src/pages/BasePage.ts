import { Locator, Page, test } from "@playwright/test";

export abstract class BasePage {
  constructor(protected page: Page) { }

  /**
   * Navigate to a specific URL
   * @param url - The URL to navigate to
   */
  async navigate(url: string): Promise<void> {
    await test.step(`Navigate to ${url}`, async () => {
      test.info().attachments.push({
        name: 'Info log',
        contentType: 'text/plain',
        body: Buffer.from(`Navigating to ${url}`),
      });
      await this.page.goto(url);
    });
  }

  /**
   * Get element by selector
   * @param selector - The selector to locate the element
   * @returns Locator
   */
  protected getElement(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Get element by selector with built-in wait
   * @param selector - The selector to find the element
   * @returns Promise<Locator>
   */
  protected async getElementDebug(selector: string): Promise<Locator> {
    return await test.step(`Get element ${selector}`, async () => {
      const element = this.page.locator(selector);
      try {
        await element.waitFor({ state: 'attached' });
        return element;
      } catch (error) {
        test.info().attachments.push({
          name: 'Error log',
          contentType: 'text/plain',
          body: Buffer.from(`Failed to find element: ${selector}`),
        });
        test.info().attachments.push({
          name: 'Page State',
          contentType: 'text/html',
          body: Buffer.from(await this.page.content()),
        });
        test.info().attachments.push({
          name: 'Screenshot',
          contentType: 'image/png',
          body: await this.page.screenshot(),
        });
        throw error;
      }
    });
  }

  /**
   * Input text to field
   * @param selector - The selector to find the field
   * @param text - Text to type into the element
   */
  protected async fillToField(selector: string, text: string): Promise<void> {
    await test.step(`Fill "${text}" into the field ${selector}`, async () => {
      test.info().attachments.push({
        name: 'Info log',
        contentType: 'text/plain',
        body: Buffer.from(`Fill "${text}" into the field ${selector}`),
      });
      await this.clearField(selector);
      await (this.getElement(selector)).fill(text);
    });
  }

  /**
   * Clear field
   */
  protected async clearField(selector: string): Promise<void> {
    await test.step(`Clear field ${selector}`, async () => {
      test.info().attachments.push({
        name: 'Info log',
        contentType: 'text/plain',
        body: Buffer.from(`Clear field ${selector}`),
      });
      await (this.getElement(selector)).clear();
    });
  }

  /**
   * Click on element
   */
  protected async clickElement(selector: string): Promise<void> {
    await test.step(`Click on element ${selector}`, async () => {
      test.info().attachments.push({
        name: 'Info log',
        contentType: 'text/plain',
        body: Buffer.from(`Click on element ${selector}`),
      });
      await (this.getElement(selector)).click();
    });
  }
}
