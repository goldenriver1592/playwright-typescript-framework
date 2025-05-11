import { test as base } from '@playwright/test';
import { SignInPage } from '../pages/signIn.page';

// Declare the types of fixtures
type Fixtures = {
    signinPage: SignInPage;
};

// Extend the base test with our fixtures
export const test = base.extend<Fixtures>({
    // Define signinPage fixture
    signinPage: async ({ page }, use) => {
        console.log('Setting up SignInPage fixture');
        const signinPage = new SignInPage(page);
        await use(signinPage);
    }
});

export { expect } from '@playwright/test'; 