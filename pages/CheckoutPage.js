const {expect} = require("@playwright/test");

class CheckoutPage {


    constructor(page) {
        this.countrySelector = page.locator("input[placeholder='Select Country']");
        this.cvvCodeSelector = page.locator("input[type='text']").nth(1);
        this.nameOnCardSelector = page.locator("input[type='text']").nth(2);

        this.successSelector = page.locator("div[aria-label='Product Added To Cart']");
        this.placeOrderButton = page.locator(".btnn.action__submit");
        this.thankYouOrderSelector = page.locator(".hero-primary");
        this.thankYouText = " Thankyou for the order. ";
        this.ordersSelector = page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']");
        this.orderListSelector = page.locator("tbody .ng-star-inserted");
        this.orderIdSelector = page.locator("label[class='ng-star-inserted']");
        this.countryDropdownOptions = page.locator(".ta-results");
    }


    async fillForms(cvvCode, nameOnCardText) {
        await this.cvvCodeSelector.fill(cvvCode);
        await this.nameOnCardSelector.fill(nameOnCardText);

        // fill country sequentially and handling autosuggestion dropdown
        await this.countrySelector.pressSequentially("india");
        await this.countryDropdownOptions.waitFor();
        const countryOptionsCount = await this.countryDropdownOptions.locator("button").count();

        for (let i = 0; i < countryOptionsCount; i++) {
            const text = await this.countryDropdownOptions.locator("button").nth(i).textContent();
            if (text?.trim() === "India") {  // Use trim() to avoid space issues
                await this.countryDropdownOptions.locator("button").nth(i).click();  // Ensure correct button is clicked
                break;
            }
        }
    }


    async placeOrder() {
        await this.placeOrderButton.click();
    }




}

module.exports = {CheckoutPage};