const {test, expect, request} = require("@playwright/test");


const loginPayLoad = {userEmail: "selormonray14@gmail.com", userPassword: "playwrightTester14"};
const orderPayLoad = {orders: [{country: "Ghana", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};
let token;
let orderID;

/*
*  Sets up an API context
*  Sends a POST request to log in
*  Ensures the response is successful
*  Extracts and stores the authentication token
* */

test.beforeAll(async () => {
    //login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {data: loginPayLoad}
    );

    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;

    //creating an order
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayLoad,
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        })
    //get the entire order json and save it in the orderResponseJson
    const orderResponseJson = orderResponse.json();
    // get the orderID from the orderResponseJson
    orderID = orderResponseJson.orders[0];

});


test("Place Order", async ({page}) => {
    const automationTestPracticeTextSelector = page.locator("div[class='left mt-1'] p");
    const redBlinkTextSelector = page.locator(".m-2.blink_me");
    const thankYouText = " Thankyou for the order. ";
    const ordersSelector = page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']");
    const orderListSelector = page.locator("tbody .ng-star-inserted");


    // insert token in local storage before the page loads thereby bypassing the login step
    await page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, token);
    await page.goto("https://rahulshettyacademy.com/client");

    await expect(automationTestPracticeTextSelector).toContainText("Automation Practice");
    await expect(redBlinkTextSelector).toHaveText("User can only see maximum 9 products on a page");

    await ordersSelector.click();
    await orderListSelector.first().waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();

});
