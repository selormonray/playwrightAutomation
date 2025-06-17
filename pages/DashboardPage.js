const {expect} = require("@playwright/test");

class DashboardPage {

    constructor(page) {
        this.products = page.locator(".card-body");
        this.cartSelector = page.locator("[routerlink='/dashboard/cart']");
        this.cartItemSelector = page.locator("div li");
        this.automationTestPracticeTextSelector = page.locator("div[class='left mt-1'] p");
        this.redBlinkTextSelector = page.locator(".m-2.blink_me");

    }


    async searchAndAddProductsToCart(productName) {
        await this.products.last().waitFor();
        const productsCount = await this.products.count();
        // loop through the products on the page and click on the product you desire
        for (let i = 0; i < productsCount; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }


    async navigateToCart() {
        await this.cartSelector.click();
        await this.cartItemSelector.first().waitFor();
    }


    async dashBoardPageVerifications() {
        await expect(await this.automationTestPracticeTextSelector).toContainText("Automation Practice");
    }



}

module.exports = {DashboardPage};