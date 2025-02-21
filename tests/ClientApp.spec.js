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
    const cartSelector = page.locator("[routerlink='/dashboard/cart']");
    const cartItemSelector = page.locator("div li");
    const checkoutButton = page.locator("li[class='totalRow'] button[type='button']");
    const countrySelector = page.locator("input[placeholder='Select Country']");


    await page.goto("https://rahulshettyacademy.com/client");
    await emailSelector.fill("selormonray14@gmail.com");
    await passwordSelector.fill("playwrightTester14");
    await loginButton.click();
    await expect(automationTestPracticeTextSelector).toContainText("Automation Practice");
    await expect(redBlinkTextSelector).toHaveText("User can only see maximum 9 products on a page");

    await products.last().waitFor();
    const productsCount = await products.count();
    // loop through the products on the page and click on the product you desire
    for ( let i = 0; i < productsCount; i++ ) {
       if (await products.nth(i).locator("b").textContent() === productName ) {
           await products.nth(i).locator("text= Add To Cart").click();
           break;
       }
    }
    // await successSelector.waitFor();
    // await expect(successSelector).toBeVisible();
    await cartSelector.click();

    // we expect item added to cart to be present

    // wait for list of items on cart to load
    await cartItemSelector.first().waitFor();
    const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
    expect(bool).toBe(true);
    expect(bool).toBeTruthy();

    // go to checkout
    await checkoutButton.click();
    // await page.pause();

    // fill country sequentially
    await countrySelector.pressSequentially("ind");
    const countryDropdownOptions = page.locator(".ta-results");
    await countryDropdownOptions.waitFor();
    const countryOptionsCount = await countryDropdownOptions.locator("button").count();
    for ( let i = 0; i < countryOptionsCount; i++ ) {
       const text = await countryDropdownOptions.locator("button").nth(i).textContent();
       if (text === " India") {
           await countryDropdownOptions.locator("button").click();
           break;
       }
    }





});
