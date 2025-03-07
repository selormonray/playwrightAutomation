import {expect, test} from "@playwright/test";


test("Pop Up Validations", async ({page}) => {

    const showHideSelector = await page.locator("#displayed-text");
    const hideSelector = await page.locator("#hide-textbox");
    const confirmButton = await page.locator("#confirmbtn");
    const mouseHoverButton = await page.locator("#mousehover");
    const frameLocator = await page.locator("#courses-iframe");


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(showHideSelector).toBeVisible();
    await hideSelector.click();
    await expect(await page.locator("#displayed-text")).toBeHidden();
    page.on('dialog', dialog => dialog.dismiss()); //handling Java/JS pop ups

    // hovering over an element
    await mouseHoverButton.hover();

    const framesPage = page.locator("#course-frame");
    await framesPage.locator(".new-navbar-highlighter[href='lifetime-access']").click();
    const textCheck = await framesPage.locator(".text h2").textContent();

    console.log(textCheck.split(" ")[1]);








})