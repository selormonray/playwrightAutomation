import {expect, test} from "@playwright/test";


test("Pop Up Validations", async ({page}) => {

    const showHideSelector = await page.locator("#displayed-text");
    const hideSelector = await page.locator("#hide-textbox");
    const confirmButton = await page.locator("#confirmbtn");
    const mouseHoverButton = await page.locator("#mousehover");


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(showHideSelector).toBeVisible();
    await hideSelector.click();
    await expect(await page.locator("#displayed-text")).toBeHidden();
    page.on('dialog', dialog => dialog.dismiss()); //handling Java/JS pop ups

    // hovering over an element
    await mouseHoverButton.hover();





})