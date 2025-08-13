import {Locator, Page} from "@playwright/test";

export class LoginPage {
    signInbutton: Locator;
    userName: Locator;
    password: Locator;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");

    }


}

module.exports = {LoginPage};