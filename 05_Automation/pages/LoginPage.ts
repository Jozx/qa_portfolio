import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly loggedInText: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.locator('[data-qa="login-email"]');
        this.passwordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.errorMessage = page.getByText('Your email or password is incorrect!');
        this.loggedInText = page.getByText('Logged in as');
    }

    async login(email: string, password: string) {
        await this.navigate('/login');
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}