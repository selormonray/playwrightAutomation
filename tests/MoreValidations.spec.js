import {expect, test} from "@playwright/test";


test("Pop Up Validations", async ({page}) => {

    const showHideSelector = await page.locator("#displayed-text");
    const hideSelector = await page.locator("#hide-textbox");


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(showHideSelector).toBeVisible();
    await hideSelector.click();
    await expect(await page.locator("#displayed-text")).toBeHidden();





   /* await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();
*/




})