import {Locator, Page} from "@playwright/test";

export class LoginPage {
    signInbutton: Locator;
    userName: Locator;
    password: Locator;
    page: Page;

    constructor(page: Page) {


    }


}

module.exports = {LoginPage};