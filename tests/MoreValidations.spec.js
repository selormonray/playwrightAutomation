import {expect, test} from "@playwright/test";


test("Pop Up Validations", async ({page}) => {

    const showHideSelector = await page.locator("#displayed-text");
    const hideSelector = await page.locator("#hide-textbox");


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(showHideSelector).toBeVisible();
    await hideSelector.click();
    await expect(await page.locator("#displayed-text")).toBeHidden();
    page.on('dialog', dialog => dialog.dismiss()); //handling Java/JS pop ups

    const framesPage = page.locator("#course-frame");
    await framesPage.locator(".new-navbar-highlighter[href='lifetime-access']").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
})

test("Screenshot & Visual Comparison", async ({page}) => {

    const showHideSelector = await page.locator("#displayed-text");


    const hideSelector = await page.locator("#hide-textbox");

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(showHideSelector).toBeVisible();

    // taking a partial screenshot of an element
    await showHideSelector.screenshot({path: "partialScreenshot.png"})


    await hideSelector.click();
    // takes screenshot of page
    await page.screenshot({path: "./screenshot.png"});

    await expect(await page.locator("#displayed-text")).toBeHidden();

});

test("Visual Testing", async ({page}) => {

    await page.goto("https://google.com/");


    expect(await page.screenshot()).toMatchSnapshot('landing.png');

})