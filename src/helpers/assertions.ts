import { Locator, expect, test } from '@playwright/test';

export function assertVisible(el: Locator, name?: string) {
  return test.step(`Assert visible: ${name ?? el.toString()}`, async () => {
    await expect(el).toBeVisible();
  });
}

export function assertElementsVisible(list: [Locator, string][]) {
  return Promise.all(list.map(([el, name]) => assertVisible(el, name)));
}
