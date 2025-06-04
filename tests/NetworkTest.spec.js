const {test, expect, request} = require("@playwright/test");
const APIUtils = require("./utils/APIUtils");

const loginPayLoad = {userEmail: "selormonray14@gmail.com", userPassword: "playwrightTester14"};
const orderPayLoad = {orders: [{country: "Ghana", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};
let response;

test.beforeAll(async ({request}) => {
    const apiUtils = new APIUtils(request, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

    expect(response).toHaveProperty("token");
    expect(response).toHaveProperty("orderID");
});

test("Place Order", async ({page}) => {
    await page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    const automationTestPracticeTextSelector = page.locator("div[class='left mt-1'] p");
    const redBlinkTextSelector = page.locator(".m-2.blink_me");
    const ordersSelector = page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']");
    const orderListSelector = page.locator("tbody .ng-star-inserted");

    await expect(automationTestPracticeTextSelector).toContainText("Automation Practice");
    await expect(redBlinkTextSelector).toHaveText("User can only see maximum 9 products on a page");

    // This defines a fake response payload. It mimics what the backend might send when there are no orders
    const fakePayloadOrders = {data: [], message: "No Orders"}

    /* mock the Orders call: intercepting the HTTP request made to the below specified URL,
     so instead of letting the browser contact the server, this will execute the below url */
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/67b7369fc019fb1ad6036203",
        // fetch the real response from the server
        async route => {
            const response = await page.request.fetch(route.request());
            let body = fakePayloadOrders;
            route.fulfill({
                response,
                body,
            })
            // intercepting response - API response -> browser ->render data on front end

        })
    await page.pause();

    await ordersSelector.click();
    await orderListSelector.first().waitFor();
    const rows = await page.locator("tbody tr");
});