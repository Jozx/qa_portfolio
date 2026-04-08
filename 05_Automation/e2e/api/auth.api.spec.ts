import { test, expect } from '@playwright/test';
import { testData } from '../../utils/testData';
import { env } from '../../utils/env';

test.describe('Auth API', () => {

    test('POST verifyLogin with valid credentials should confirm user exists', async ({ request }) => {
        const response = await request.post(testData.api.verifyLogin, {
            form: {
                email: env.LOGIN_EMAIL,
                password: env.LOGIN_PASSWORD,
            },
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(200);
        expect(body.message).toContain('User exists');
    });

    test('POST verifyLogin with invalid credentials should return user not found', async ({ request }) => {
        const response = await request.post(testData.api.verifyLogin, {
            form: {
                email: testData.auth.invalidEmail,
                password: testData.auth.invalidPassword,
            },
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(404);
        expect(body.message).toContain('User not found');
    });

    test('POST verifyLogin without parameters should return bad request', async ({ request }) => {
        const response = await request.post(testData.api.verifyLogin);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(400);
        expect(body.message).toContain('Bad request');
    });

});