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



});
