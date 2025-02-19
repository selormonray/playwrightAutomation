const {test, expect} = require("@playwright/test");

// step by step steps to open a fresh browser instance
// .only runs the only test alone
test("Test Case Name 1", async ({browser}) => {
    // this opens a fresh instance of a browser
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://automationexercise.com/");
    await page.title();
    console.log(await page.title());
    await expect(page).toHaveTitle("Automation Exercise");
    await page.locator("a[href='/login']").click();
    await page
        .locator("input[data-qa='login-email']")
        .fill("selormonray14@gmail.com");
    await page
        .locator("input[placeholder='Password']")
        .fill("autom@tionExercise10");
    await page.locator("button[data-qa='login-button']").click();

    const usernameLocator = page.locator("ul[class='nav navbar-nav'] li a b");
    console.log(await usernameLocator.textContent());
    await expect(usernameLocator).toContainText("Selorm Onray");
    await expect(usernameLocator).toBeVisible();
});

test("Test 2", async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await page.locator(" [type='password']").fill("learning");
    await signIn.click();
    console.log(await page.locator(" [style*='block']").textContent());
    await expect(page.locator(" [style*='block']")).toContainText("Incorrect");

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();

    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test("UI Control Test", async ({page}) => {
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const userRadioBtn = page.locator(".radiotextsty").last();
    const loginDropdown = page.locator("select.form-control");
    const agreeCheckBoxBtn = page.locator("#terms");
    const okayBtn = page.locator("#okayBtn");
    const blinkingTextLocator = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await loginDropdown.selectOption("Teacher"); //put the value inside the select function

    // selecting a button
    await userRadioBtn.click();

    // verify the radio button was actually clicked
    await expect(userRadioBtn).toBeChecked();
    await userRadioBtn.isChecked();
    await okayBtn.click();

    // await agreeCheckBoxBtn.click();
    await agreeCheckBoxBtn.click();

    // verify checkbox was checked
    await expect(agreeCheckBoxBtn).toBeChecked();
    await agreeCheckBoxBtn.isChecked();

    // checking attribute value of blinking text
    await expect(blinkingTextLocator).toHaveAttribute("class", "blinkingText");
});

test("Test Case Name 2", async ({page}) => {
    await page.goto("https://www.google.com/");
});

// directly opens browser without calling the step by step steps
test("Handling Child Elements", async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#username");
    const blinkingTextLocator = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");    /***
    //this listens for any new page opening - the promise could be pending, fulfilled or rejected
    await context.waitForEvent('page');
    await blinkingTextLocator.click(); // new page gets opened here
    ***/

    /*
    * Promise.all([...]) ensures that both the click action and waiting
    *  for the new page event happen together.
    * */
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkingTextLocator.click()
    ]);


    // pull email ID from child tab and use it on the parent tab
    // split the text grabbed in the variable redText

    const redText = await newPage.locator(".im-para.red").textContent();
    const arrayText =  redText.split("@")
    const domain = arrayText[1].split(" ")[0]
    // console.log(domain);

    // now switch back to the parent tab and continue with execution
    await userName.fill(domain);
    console.log(userName.textContent());

});