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




}

module.exports = {CheckoutPage};