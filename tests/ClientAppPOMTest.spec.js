const {test, expect} = require("@playwright/test");
const {LoginPage} = require("../pages/LoginPage");
const {DashboardPage} = require("../pages/DashboardPage");

test("Client App Login", async ({page}) => {
    const automationTestPracticeTextSelector = page.locator("div[class='left mt-1'] p");
    const redBlinkTextSelector = page.locator(".m-2.blink_me");


    const email = "selormonray14@gmail.com";
    const productName = "IPHONE 13 PRO";
    const password = "playwrightTester14";

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);



    await loginPage.goTo();
    await loginPage.validLogin(email, password);

    await expect(automationTestPracticeTextSelector).toContainText("Automation Practice");
    await expect(redBlinkTextSelector).toHaveText("User can only see maximum 9 products on a page");

    await dashboardPage.searchAndAddProductsToCart(productName);
    await dashboardPage.navigateToCart()




    const countrySelector = page.locator("input[placeholder='Select Country']");
    const cvvCodeSelector = page.locator("input[type='text']").nth(1);
    const nameOnCardSelector = page.locator("input[type='text']").nth(2);
    const products = page.locator(".card-body");

    this.successSelector = page.locator("div[aria-label='Product Added To Cart']");
    const placeOrderButton = page.locator(".btnn.action__submit");
    const thankYouOrderSelector = page.locator(".hero-primary");
    const thankYouText = " Thankyou for the order. ";
    const ordersSelector = page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']");
    const orderListSelector = page.locator("tbody .ng-star-inserted");
    const orderIdSelector = page.locator("label[class='ng-star-inserted']");
    // const viewButtonSelectors = page.locator("tbody .btn.btn-primary");
    // const orderSummaryOrderIdSelector = page.locator(".col-text.-main");



    const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
    expect(bool).toBe(true);
    expect(bool).toBeTruthy();

    // go to checkout
    await checkoutButton.click();
    await cvvCodeSelector.fill("225");
    await nameOnCardSelector.fill("Sel Onray");

    // fill country sequentially and handling autosuggestion dropdown
    await countrySelector.pressSequentially("india");
    const countryDropdownOptions = page.locator(".ta-results");
    await countryDropdownOptions.waitFor();
    const countryOptionsCount = await countryDropdownOptions.locator("button").count();

    for (let i = 0; i < countryOptionsCount; i++) {
        const text = await countryDropdownOptions.locator("button").nth(i).textContent();
        if (text?.trim() === "India") {  // Use trim() to avoid space issues
            await countryDropdownOptions.locator("button").nth(i).click();  // Ensure correct button is clicked
            break;
        }
    }

    await placeOrderButton.click();
    await thankYouOrderSelector.isVisible();
    await expect(thankYouOrderSelector).toContainText(thankYouText.trim());
    // get the text content from the orderID selector
    const orderId = await orderIdSelector.textContent();

    await ordersSelector.click();
    await orderListSelector.first().waitFor();
    // iterate through the order list and find your order and view

    console.log(orderId);
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
