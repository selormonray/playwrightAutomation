const {test, expect} = require("@playwright/test");
const {POManager} = require("../pages/POManager");

test("Client App Login", async ({page}) => {

    const email = "selormonray14@gmail.com";
    const productName = "IPHONE 13 PRO";
    const password = "playwrightTester14";
    const cvvCode = "255";
    const nameOnCardText = "Sel Onray";

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    const ordersReviewPage = poManager.getOrdersReviewPage();
    const orderHistoryPage = poManager.getOrdersHistoryPage();


    await loginPage.goTo();
    await loginPage.validLogin(email, password);

    await dashboardPage.dashBoardPageVerifications(page);
    await dashboardPage.searchAndAddProductsToCart(productName);
    await dashboardPage.navigateToCart()

    await cartPage.verifyPresenceOfSelectedIPhone();
    await cartPage.navigateToCheckoutPage();

    await checkoutPage.fillForms(cvvCode, nameOnCardText);
    await checkoutPage.placeOrder();
    await checkoutPage.verifySuccessfullyPlacedOrder();

    const orderId = await ordersReviewPage.getOrderID();

    await ordersReviewPage.verifyReturnedOrderId(orderId);

    await ordersReviewPage.placeOrder();

    await orderHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

});
