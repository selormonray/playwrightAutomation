const {expect} = require("@playwright/test");

class DashboardPage {

    constructor(page) {
        this.products = page.locator(".card-body");
        this.cartSelector = page.locator("[routerlink='/dashboard/cart']");
        this.cartItemSelector = page.locator("div li");
        this.automationTestPracticeTextSelector = page.locator("div[class='left mt-1'] p");
        this.redBlinkTextSelector = page.locator(".m-2.blink_me");

    }



}

module.exports = {DashboardPage};