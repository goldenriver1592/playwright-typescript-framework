import { test, expect } from '../../src/fixture/test.fixture';
import { assertElementsVisible } from '../../src/helpers/assert.helper'; // đường dẫn đúng

test.describe('My first demo', () => {
    test('@smoke test goto', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle('Cypress Real World App');
    })

    test('test login page', async ({page, signinPage}) => {
        await page.goto('/');
        await assertElementsVisible(signinPage.getLoginElements());
    })
})