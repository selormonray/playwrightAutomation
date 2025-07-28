import {Locator, Page} from "@playwright/test";

export class OrdersReviewPage {


    country: Locator;
    dropdown: Locator;
    emailId: Locator;
    page: Page;
    submit: Locator;
    orderConfirmationText: Locator;
    orderId: Locator;





}

module.exports = {OrdersReviewPage};
