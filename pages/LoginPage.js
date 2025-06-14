class LoginPage {

    constructor(page) {
        this.page = page;
        this.loginButton = page.locator("#login");
        this.emailSelector = page.locator("#userEmail");
        this.passwordSelector = page.locator("#userPassword");
        this.forgotPasswordLink = page.locator(".forgot-password-link");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(email, password) {

        await this.emailSelector.fill(email);
        await this.passwordSelector.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState("networkidle")

    }


}

module.exports = {LoginPage};