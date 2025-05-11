import { expect, Locator } from '@playwright/test';
import { SignInPageSelectors as S, SignInPageMessages as M } from '../data/constants/pages/signInPageConstants';
import { BasePage } from "./base.page";


export class SignInPage extends BasePage {

    // ---------- Element Getters ----------

    usernameInputBox() {
        return this.getElement(S.usernameInput);
    }

    passwordInputBox() {
        return this.getElement(S.passwordInput);
    }

    signInButton() {
        return this.getElement(S.loginButton);
    }

    signUpButton() {
        return this.getElement(S.buttonSignUp);
    }

    rememberMeCheckbox() {
        return this.getElement(S.checkboxRememberMe);
    }

    loginUserNameErrorMessage() {
        return this.getElement(S.loginUserNameErrorMessage);
    }

    loginPasswordErrorMessage() {
        return this.getElement(S.loginPasswordErrorMessage);
    }

    loginErrorMessageAPI() {
        return this.getElement(S.loginErrorMessageAPI);
    }

    // ---------- Actions ----------

    async loginWith(userName: string, password: string) {
        await this.clearAllFields();
        if (userName) await this.fillToField(S.usernameInput, userName);
        if (password) await this.fillToField(S.passwordInput, password);
        if (userName && password) {
            await this.clickElement(S.loginButton);
        }
    }

    async clearAllFields() {
        await this.clearField(S.usernameInput);
        await this.clearField(S.passwordInput);
    }

    getLoginElements(): [Locator, string][] {
        return [
          [this.usernameInputBox(), 'Username input'],
          [this.passwordInputBox(), 'Password input'],
          [this.signInButton(), 'Sign in button'],
          [this.signUpButton(), 'Sign up button'],
          [this.rememberMeCheckbox(), 'Remember me checkbox'],
        ];
      }
}
