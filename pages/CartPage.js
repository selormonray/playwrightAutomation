const {expect} = require("@playwright/test");

class CartPage {

    constructor(page) {

        this.checkoutButton = page.locator("li[class='totalRow'] button[type='button']");
        this.iPhoneLocator = page.locator("h3:has-text('IPHONE 13 PRO')");

    }

    async verifyPresenceOfSelectedIPhone(page) {

        const bool = await this.iPhoneLocator.isVisible();
        expect(bool).toBe(true);
        expect(bool).toBeTruthy();


    }


}

module.exports = {CartPage};