class LoginPage {

    constructor(page) {
        this.page = page;
        this.loginButton = page.locator("#login");
        this.emailSelector = page.locator("#userEmail");
        this.passwordSelector = page.locator("#userPassword");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }



}

module.exports = {LoginPage};