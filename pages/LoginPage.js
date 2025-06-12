class LoginPage {

    constructor(page) {
        this.page = page;
        this.loginButton = page.locator("#login");
        this.emailSelector = page.locator("#userEmail");
        this.passwordSelector = page.locator("#userPassword");
    }


}

module.exports = {LoginPage};