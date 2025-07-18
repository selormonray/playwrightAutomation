export class DashboardPage {

    products: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;

    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");

    }


}

module.exports = {DashboardPage};