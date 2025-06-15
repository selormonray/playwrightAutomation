const {expect} = require("@playwright/test");

class CartPage {

    constructor(page) {

        this.checkoutButton = page.locator("li[class='totalRow'] button[type='button']");
        this.iPhoneLocator = page.locator("h3:has-text('IPHONE 13 PRO')");
        this.checkoutButton = page.locator("li[class='totalRow'] button[type='button']");

    }

    async verifyPresenceOfSelectedIPhone(page) {

        const bool = await this.iPhoneLocator.isVisible();
        expect(bool).toBe(true);
        expect(bool).toBeTruthy();


    }


    async navigateToCheckoutPage() {
        await this.checkoutButton.click()
    }


}

module.exports = {CartPage};