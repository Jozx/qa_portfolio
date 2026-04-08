import { test, expect } from '@playwright/test';
import { testData } from '../../utils/testData';

test.describe('Products API', () => {

    test('GET productsList should return 200 and a list of products', async ({ request }) => {
        const response = await request.get(testData.api.productsList);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toHaveProperty('products');
        expect(Array.isArray(body.products)).toBe(true);
        expect(body.products.length).toBeGreaterThan(0);
    });

    test('GET brandsList should return 200 and a list of brands', async ({ request }) => {
        const response = await request.get(testData.api.brandsList);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toHaveProperty('brands');
        expect(Array.isArray(body.brands)).toBe(true);
        expect(body.brands.length).toBeGreaterThan(0);
    });

    test('POST productsList should return 405 method not supported', async ({ request }) => {
        const response = await request.post(testData.api.productsList);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(405);
        expect(body.message).toContain('not supported');
    });

    test('POST searchProduct should return matching products', async ({ request }) => {
        const response = await request.post(testData.api.searchProduct, {
            form: { search_product: testData.api.searchTerm },
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(200);
        expect(Array.isArray(body.products)).toBe(true);
        expect(body.products.length).toBeGreaterThan(0);
    });

});