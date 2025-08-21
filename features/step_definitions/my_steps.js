const {Given, When, Then, Before, After} = require("@cucumber/cucumber");
const {POManager} = require("../../pages/POManager");
const {chromium} = require("@playwright/test");
const loginDataSet = JSON.parse(JSON.stringify(require("../../DTOs/loginDTO.json")));
const userDetailsDataSet = JSON.parse(JSON.stringify(require("../../DTOs/userDetailsDTO.json")));

let browser, context, page, poManager;
let orderId;

Before(async function () {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    poManager = new POManager(page);
});

After(async function () {
    await context.close();
    await browser.close();
});
Given('a login to the ecommerce application using {string} and {string}', async function (email, password) {
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(email, password);
});

When('I add {string} to the cart', async function (productName) {
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.dashBoardPageVerifications(page);
    await dashboardPage.searchAndAddProductsToCart(productName);
    await dashboardPage.navigateToCart();
});
Then('Verify {string} is added to the cart', async function (productName) {
    const cartPage = poManager.getCartPage();
    await cartPage.verifyPresenceOfSelectedIPhone();
    await cartPage.navigateToCheckoutPage();
});

When('I enter valid details and place order', async function () {
    const checkoutPage = poManager.getCheckoutPage();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    orderId = await ordersReviewPage.getOrderID();
    await ordersReviewPage.verifyReturnedOrderId(orderId);
    await ordersReviewPage.placeOrder();
});

Then('Verify order is present in the order history page', async function () {
    const orderHistoryPage = poManager.getOrdersHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderId);
    const historyOrderId = await orderHistoryPage.getOrderId();
    if (!orderId.includes(historyOrderId)) {
        throw new Error('Order not found in history');
    }

})
