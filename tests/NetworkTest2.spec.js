import {expect, test} from "@playwright/test";


test("Security Testing Test", async ({page}) => {

    const emailSelector = page.locator("#userEmail");
    const passwordSelector = page.locator("#userPassword");
    const loginButton = page.locator("#login");
    const automationTestPracticeTextSelector = page.locator("div[class='left mt-1'] p");
    const redBlinkTextSelector = page.locator(".m-2.blink_me");


    await page.goto("https://rahulshettyacademy.com/client");
    await emailSelector.fill("selormonray14@gmail.com");
    await passwordSelector.fill("playwrightTester14");
    await loginButton.click();
    await expect(automationTestPracticeTextSelector).toContainText("Automation Practice");
    await expect(redBlinkTextSelector).toHaveText("User can only see maximum 9 products on a page");

    await page.locator("button[routerlink*='myorders']").click();

    // this sets up network interception: targets the below network request that matches the url pattern
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        // forcing the request to use a hard coded ID that does not exist as part of the order
        route => route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884gt78f6765465b6'}))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");



})