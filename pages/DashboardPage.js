class DashboardPage {

    constructor(page) {
        this.products = page.locator(".card-body");
        this.successSelector = page.locator("div[aria-label='Product Added To Cart']");
        this.cartSelector = page.locator("[routerlink='/dashboard/cart']");
        this.cartItemSelector = page.locator("div li");


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
    }



}

module.exports = DashboardPage;