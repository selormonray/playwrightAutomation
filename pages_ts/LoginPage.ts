import {Locator, Page} from "@playwright/test";

export class LoginPage {
    signInbutton: Locator;
    userName: Locator;
    password: Locator;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.signInbutton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goTo() {
    }


}

module.exports = {LoginPage};