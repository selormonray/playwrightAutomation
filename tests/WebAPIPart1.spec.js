const {test, expect} = require("@playwright/test");
const APIUtils = require("../utils/APIUtils");

// Test data
const loginPayload = {
    userEmail: "selormonray14@gmail.com",
    userPassword: "playwrightTester14",
};

const orderPayload = {
    orders: [{country: "Ghana", productOrderedId: "67a8dde5c0d3e6622a297cc8"}],
};

let apiResponse;

test.beforeAll(async ({request}) => {
    const apiUtils = new APIUtils(request, loginPayload);
    apiResponse = await apiUtils.createOrder(orderPayload);

    expect(apiResponse).toMatchObject({
        token: expect.any(String),
        orderID: expect.any(String),
    });
});

test("Place Order", async ({page}) => {
// Inject token into local storage

    await page.addInitScript((token) => {
        window.localStorage.setItem("token", token);
    }, apiResponse.token);

    await page.goto("https://rahulshettyacademy.com/client");

    // Locators
    const automationPracticeText = page.locator("div[class='left mt-1'] p");
    const redBlinkText = page.locator(".m-2.blink_me");
    const ordersButton = page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']");
    const orderList = page.locator("tbody .ng-star-inserted");
    const rows = page.locator("tbody tr");

    // Assertions for UI elements
    await expect(automationPracticeText).toContainText("Automation Practice");
    await expect(redBlinkText).toHaveText("User can only see maximum 9 products on a page");

    // Navigate to orders
    await ordersButton.click();
    await orderList.first().waitFor();

    // Find and open the matching order
    let orderFound = false;
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const rowOrderId = await row.locator("th").textContent();

        if (apiResponse.orderID && rowOrderId.includes(apiResponse.orderID)) {
            await row.locator("button").first().click();
            orderFound = true;
            break;
        }
    }

    expect(orderFound).toBeTruthy();

    // Verify order details
    const orderDetailsId = await page.locator(".col-text").textContent();
    expect(apiResponse.orderID.includes(orderDetailsId)).toBeTruthy();
});