import { expect, test } from '@playwright/test';
import { Locator } from 'playwright';

type NamedLocator = [Locator, string];

/**
 * Assert visibility of multiple elements with Allure step logging.
 * @param elements - Array of [Locator, description]
 */
export async function assertElementsVisible(elements: NamedLocator[]): Promise<void> {
  for (const [locator, description] of elements) {
    await test.step(`Assert visible: ${description}`, async () => {
      await expect(locator).toBeVisible();
    });
  }
}
