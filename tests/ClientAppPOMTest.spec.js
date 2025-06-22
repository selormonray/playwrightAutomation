const {test, expect} = require("@playwright/test");
const {POManager} = require("../pages/POManager");

const loginDataSet = JSON.parse(JSON.stringify(require("../DTOs/loginDTO.json")));
const userDetailsDataSet = JSON.parse(JSON.stringify(require("../DTOs/userDetailsDTO.json")));

test("Client App Login", async ({page}) => {


    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    const ordersReviewPage = poManager.getOrdersReviewPage();
    const orderHistoryPage = poManager.getOrdersHistoryPage();
    await loginPage.goTo();
    await loginPage.validLogin(loginDataSet.email, loginDataSet.password);

    await dashboardPage.dashBoardPageVerifications(page);
    await dashboardPage.searchAndAddProductsToCart(userDetailsDataSet.productName);
    await dashboardPage.navigateToCart();

    await cartPage.verifyPresenceOfSelectedIPhone();
    await cartPage.navigateToCheckoutPage();
    console.log(userDetailsDataSet.cvvCode);



});
