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

    async validLogin(email, password) {

        await this.emailSelector.fill(email);
        await this.passwordSelector.fill(password);
        await this.loginButton.click();


    }


}

module.exports = {LoginPage};