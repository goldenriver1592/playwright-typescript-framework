import { test, expect } from '@playwright/test';

test.describe('group test @Tag1', () => {

  test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });
  
  test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
  
    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).screenshot({path: './scrshot/elt.png'});
    await page.screenshot({path: './scrshot/page.png'});
    await page.screenshot({path: './scrshot/page.png', fullPage: true});
    await page.getByRole('link', { name: 'Get started' }).click();
  
    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
  
})

test('iframe', async ({ page }) => {
  await page.goto('https://jqueryui.com/droppable/');

  const iframeElement = page.frameLocator('.demo-frame')

  const dragE = iframeElement.locator('#draggable');
  const target = iframeElement.locator('#droppable');
  await dragE.dragTo(target);

  await page.waitForTimeout(5000);
});

test('mouse', async ({ page }) => {
  await page.goto('https://jqueryui.com/tooltip/');

  const iframeElement = page.frameLocator('.demo-frame')

  // await expect(page.locator('iframe').contentFrame().getByRole('link', { name: 'Tooltips' })).toBeVisible();
  const link1 = iframeElement.getByRole('link', { name: 'Tooltips' });
  await link1.hover();

  //soft assertion
  await expect.soft(link1).toHaveAttribute('title',"That's what this widget is 1");

  const link2 = iframeElement.getByRole('link', { name: 'ThemeRoller' });
  await link2.hover();
  await expect(link2).toHaveAttribute('title','ThemeRoller: jQuery UI\'s theme builder application');

  await page.waitForTimeout(5000);
});
