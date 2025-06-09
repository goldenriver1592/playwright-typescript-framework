import { test, expect } from '@tests/fixtures';
import { PAGE_URLS } from '@data/urls';
import { users} from '@data/json/demo.json'
import { assertElementsVisible } from '@utils/assertions';

test.describe('My datadriven demo s', () => {

    Object.entries(users).forEach((user) => {
        test(`Test goto ${user[0]}`, async ({ page }) => {
            await page.goto('/');
            await expect(page).toHaveTitle('Cypress Real World App');
        })
    
        test(`test login page element ${user[0]}`, async ({ page, signinPage }) => {
            await page.goto('/');
            await assertElementsVisible(signinPage.getLoginElements());
        })
    
        test(`should login successfully with valid credentials ${user[0]}`, async ({ signinPage }) => {
            await signinPage.navigate(PAGE_URLS.SIGNIN_PAGE);
            await test.step('Login with valid credentials', async () => {
                await signinPage.loginWith(
                    user[1].username,
                    user[1].password
                );
            });
    
            await test.step('Verify successful login', async () => {
                expect(await signinPage.isSignedIn()).toBeTruthy();
            });
        });
    })
})