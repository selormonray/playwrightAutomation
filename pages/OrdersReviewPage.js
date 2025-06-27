class OrdersReviewPage {
    constructor(page) {
        this.ordersSelector = page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']");
        this.orderListSelector = page.locator("tbody .ng-star-inserted");
        this.orderIdSelector = page.locator("label[class='ng-star-inserted']");

    }


    async getOrderID() {
        const orderId = await this.orderIdSelector.textContent();
        console.log(orderId);
        return orderId.trim();
    }

    async verifyReturnedOrderId(orderId) {
        console.log("Fetched Order ID:", orderId); // Debugging step
        if (!orderId) {
            throw new Error("Order ID not found");
        }
    }

    async placeOrder() {
        await this.ordersSelector.click();
        await this.orderListSelector.first().waitFor();
    }

}

module.exports = {OrdersReviewPage};