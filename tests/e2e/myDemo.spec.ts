import { test, expect } from '@fixtures/test.fixture';
import { PAGE_URLS } from '@data/urls';
import { VALID_USER } from '@data/users';
import { assertElementsVisible } from '@helpers/assertions';

test.describe('My first demo', () => {
    test('@smoke test goto', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle('Cypress Real World App');
    })

    test('test login page element', async ({ page, signinPage }) => {
        await page.goto('/');
        await assertElementsVisible(signinPage.getLoginElements());
    })

    test('should login successfully with valid credentials @smoke', async ({ signinPage }) => {
        await signinPage.navigate(PAGE_URLS.SIGNIN_PAGE);
        await test.step('Login with valid credentials', async () => {
            await signinPage.loginWith(
                VALID_USER.USER,
                VALID_USER.PASSWORD
            );
        });

        await test.step('Verify successful login', async () => {
            expect(await signinPage.isSignedIn()).toBeTruthy();
        });
    });
})