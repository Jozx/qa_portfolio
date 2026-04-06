import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly productList: Locator;
    readonly firstViewProductButton: Locator;
    readonly firstProductCard: Locator;

    constructor(page: Page) {
        super(page);

        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.productList = page.locator('.features_items');
        this.firstViewProductButton = page.locator('a[href*="product_details"]').first();
        this.firstProductCard = page.locator('.single-products').first();

    }

    async navigate() {
        await super.navigate('/products');
    }

    async searchFor(term: string) {
        await this.searchInput.fill(term);
        await this.searchButton.click();
    }

    async viewFirstProduct() {
        await this.firstProductCard.hover();
        await this.firstViewProductButton.click();
    }

}