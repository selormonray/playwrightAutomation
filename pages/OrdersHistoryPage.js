class OrdersHistoryPage {
    constructor(page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderdIdDetails = page.locator(".col-text");
    }

}

module.exports = {OrdersHistoryPage};
