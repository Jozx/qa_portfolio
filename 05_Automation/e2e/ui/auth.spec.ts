import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should load the home page', async ({ page }) => {
        await expect(page).toHaveTitle('Automation Exercise');
        await expect(page.getByText('Full-Fledged practice website for Automation Engineers').first()).toBeVisible();
    });

    test('should navigate to login page', async ({ page }) => {
        await page.getByRole('link', { name: 'Signup / Login' }).click();
        await expect(page).toHaveURL('/login');
        await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    });

    test('should show error with invalid credential', async ({ page }) => {
        await page.getByRole('link', { name: 'Signup / Login' }).click();

        await page.locator('[data-qa="login-email"]').fill('invalid@test.com');
        await page.locator('[data-qa="login-password"]').fill('wrongpassword');
        await page.locator('[data-qa="login-button"]').click();

        await expect(page.getByText('Your email or password is incorrect')).toBeVisible();
    });

    test('should login with valid credentials', async ({ page }) => {
        await page.getByRole('link', { name: 'Signup / Login' }).click();

        await page.locator('[data-qa="login-email"]').fill('testpw123@test.com');
        await page.locator('[data-qa="login-password"]').fill('testpw123');
        await page.locator('[data-qa="login-button"]').click();

        await expect(page.getByText('Logged in as')).toBeVisible();
    });

});