class DashboardPage {

    constructor(page) {
        this.roducts = page.locator(".card-body");
        this.successSelector = page.locator("div[aria-label='Product Added To Cart']");
        this.cartSelector = page.locator("[routerlink='/dashboard/cart']");
        this.cartItemSelector = page.locator("div li");
        this.products = page.locator(".card-body");
        this.productName = "IPHONE 13 PRO";

    }

    searchProducts() {

        await products.last().waitFor();
        const productsCount = await products.count();
        // loop through the products on the page and click on the product you desire
        for (let i = 0; i < productsCount; i++) {
            if (await products.nth(i).locator("b").textContent() === productName) {
                await products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }


    }




}