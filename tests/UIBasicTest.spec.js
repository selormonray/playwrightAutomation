const { test, expect } = require("@playwright/test");

// step by step steps to open a fresh browser instance
// .only runs the only test alone
test("Test Case Name 1", async ({ browser }) => {
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

test.only("Test 2", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");

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

  const cardTitles = page.locator(".card-body a");
  // console.log(await cardTitles.textContent());
  // console.log(await cardTitles.nth(1).textContent());

  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

// directly opens browser without calling the step by step steps
test("Test Case Name 2", async ({ page }) => {
  await page.goto("https://www.google.com/");
});
