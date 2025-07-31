export class POManager {

    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    ordersHistoryPage: OrdersHistoryPage;
    ordersReviewPage: OrdersReviewPage;
    cartPage: CartPage;
    page: Page;


    constructor(page: Page) {
        this.page = page;


    }


}

module.exports.POManager = {POManager};