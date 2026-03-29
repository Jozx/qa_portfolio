import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { env } from '../../utils/env';
import { testData } from '../../utils/testData';

test.describe('Authentication', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await homePage.navigate();
    });

    test('should load the home page', async () => {
        await expect(homePage.page).toHaveTitle(testData.homePage.title);
        await expect(homePage.heroHeading).toBeVisible();
    });

    test('should navigate to login page', async () => {
        await homePage.goToLogin();
        await expect(loginPage.page).toHaveURL(/login/);
        await expect(loginPage.page.getByRole('heading', {
            name: 'Login to your account'
        })).toBeVisible();
    });

    test('should show error with invalid credentials', async () => {
        await loginPage.login(
            testData.auth.invalidEmail,
            testData.auth.invalidPassword
        );
        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('should login successfully with valid credentials', async () => {
        await loginPage.login(env.LOGIN_EMAIL, env.LOGIN_PASSWORD);
        await expect(loginPage.loggedInText).toBeVisible();
    });

});