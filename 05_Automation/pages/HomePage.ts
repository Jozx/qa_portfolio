import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly heroHeading: Locator;
    readonly signupLoginLink: Locator;

    constructor(page: Page) {
        super(page);
        this.heroHeading = page.getByRole('heading', {
            name: 'Full-Fledged practice website for Automation Engineers'
        }).first();
        this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    }

    async goToLogin() {
        await this.signupLoginLink.click();
    }
}