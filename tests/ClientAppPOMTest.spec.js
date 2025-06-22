const {test, expect} = require("@playwright/test");
const {POManager} = require("../pages/POManager");

const loginDataSet = JSON.parse(JSON.stringify(require("../DTOs/loginDTO.json")));
const userDetailsDataSet = JSON.parse(JSON.stringify(require("../DTOs/userDetailsDTO.json")));

test("Client App Login", async ({page}) => {


    await loginPage.goTo();
    await loginPage.validLogin(loginDataSet.email, loginDataSet.password);

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
