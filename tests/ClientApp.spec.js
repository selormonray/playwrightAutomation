const {test, expect} = require("@playwright/test");


test("Client App Login", async ({page}) => {
    const emailSelector = page.locator("#userEmail");
    const passwordSelector = page.locator("#userPassword");
    const loginButton = page.locator("#login");
    const forgotPasswordLink = page.locator(".forgot-password-link");
    const automationTestPracticeTextSelector = page.locator("div[class='left mt-1'] p");
    const redBlinkTextSelector = page.locator(".m-2.blink_me");
    const products = page.locator(".card-body");
    const productName = "IPHONE 13 PRO";
    const successSelector = page.locator("div[aria-label='Product Added To Cart']");


    await page.goto("https://rahulshettyacademy.com/client");
    await emailSelector.fill("selormonray14@gmail.com");
    await passwordSelector.fill("playwrightTester14");
    await loginButton.click();
    await expect(automationTestPracticeTextSelector).toContainText("Automation Practice");
    await expect(redBlinkTextSelector).toHaveText("User can only see maximum 9 products on a page");

    const productsCount = await products.count();
    // loop through the product count
    for ( let i = 0; i < productsCount; i++ ) {
       if (await products.nth(i).locator("b").textContent() === productName ) {
           await products.nth(i).locator("text= Add To Cart").click();
           break;
       }
    }
    await expect(successSelector).toBeVisible();

});
