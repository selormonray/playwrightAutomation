const {test, expect} = require("@playwright/test");
const {POManager} = require("../pages/POManager");

const dataset = JSON.parse(JSON.stringify(require("../DTOs/loginDTO.json")));
const data2 = JSON.parse(JSON.stringify(require("../DTOs/userDetailsDTO.json")));
/*
for (const data of dataset) {
    test(`Client App Login Parameterization ${data.email}`, async ({page}) => {

        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getDashboardPage();
        const cartPage = poManager.getCartPage();
        const checkoutPage = poManager.getCheckoutPage();
        const ordersReviewPage = poManager.getOrdersReviewPage();
        const orderHistoryPage = poManager.getOrdersHistoryPage();


        await loginPage.goTo();
        await loginPage.validLogin(data.email, data.password);

        await dashboardPage.dashBoardPageVerifications(page);
        await dashboardPage.searchAndAddProductsToCart(userDetailsDataSet.productName);
        await dashboardPage.navigateToCart();

        await cartPage.verifyPresenceOfSelectedIPhone();
        await cartPage.navigateToCheckoutPage();
        console.log(userDetailsDataSet.cvvCode);

        await checkoutPage.fillForms(userDetailsDataSet.cvvCode, userDetailsDataSet.nameOnCardText);
        await checkoutPage.placeOrder();
        await checkoutPage.verifySuccessfullyPlacedOrder();

        const orderId = await ordersReviewPage.getOrderID();

        await ordersReviewPage.verifyReturnedOrderId(orderId);

        await ordersReviewPage.placeOrder();

        await orderHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

    });
}
*/
