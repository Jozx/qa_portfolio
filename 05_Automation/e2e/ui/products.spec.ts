import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { testData } from '../../utils/testData';

test.describe('Products', () => {
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        productsPage = new ProductsPage(page);
        await productsPage.navigate();
    })

    test('should load all products page', async ({ page }) => {
        await expect(page).toHaveURL('/products');
        await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
        await expect(productsPage.productList).toBeVisible();
    })

    test('should display at leat one product on the page', async ({ page }) => {
        const products = productsPage.page.locator('.single-products');
        const count = await products.count();
        expect(count).toBeGreaterThan(0);
    })

    test('should search for a product and show results', async ({ page }) => {
        await productsPage.searchFor(testData.products.searchTerm);

        await expect(page.getByRole('heading', {
            name: testData.products.searchHeading
        })).toBeVisible();
    })

    test('should view only relevant results after search', async ({ page }) => {
        await productsPage.searchFor(testData.products.searchTerm);

        const productNames = productsPage.page.locator('.product-information p');
        const count = await productNames.count();

        for (let i = 0; i < count; i++) {
            const name = await productNames.nth(i).textContent(); //const name = await productNames.nth(i).innerText();
            expect(name?.toLowerCase()).toContain(testData.products.searchTerm);
        }
    })

    test('should navigate to product detail page', async ({ page }) => {
        await productsPage.viewFirstProduct();

        await expect(page).toHaveURL(/product_details\/\d+/); //Regular expression to match any number
        await expect(page.locator('.product-information')).toBeVisible();
    })
})