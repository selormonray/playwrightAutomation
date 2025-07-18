const {test, expect, request} = require("@playwright/test");
const APIUtils = require("../utils/APIUtils");

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

    await ordersSelector.click();
    await orderListSelector.first().waitFor();
    const rows = await page.locator("tbody tr");

    let orderFound = false;
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderID && rowOrderId.includes(response.orderID)) {
            await rows.nth(i).locator("button").first().click();
            orderFound = true;
            break;
        }
    }

    expect(orderFound).toBeTruthy();
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderID.includes(orderIdDetails)).toBeTruthy();
});