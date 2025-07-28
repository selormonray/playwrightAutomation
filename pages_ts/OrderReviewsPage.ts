import {Locator, Page} from "@playwright/test";

export class OrdersReviewPage {


    country: Locator;
    dropdown: Locator;
    emailId: Locator;
    page: Page;
    submit: Locator;
    orderConfirmationText: Locator;
    orderId: Locator;

    constructor(page: Page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submit = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");

    }





}

module.exports = {OrdersReviewPage};
