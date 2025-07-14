const {test, expect} = require("@playwright/test");

test.skip("Calendar validations", async ({page}) => {

    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const calendarSelector = page.locator(".react-date-picker__inputGroup");

    await page.getByText(year).click();
    const expectedList = [monthNumber, date, year];
    await page.locator(".react-calendar__tile").nth(Number(monthNumber) - 1).click();
    await page.locator("//abbr[text()='" + date + "']").click();
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await calendarSelector.click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    const inputs = await page.locator(".react-date-picker__inputGroup__input");

    /*
    Selects all input fields in the date picker.
	Ensures there are exactly 3 inputs (Month, Day, Year).
	Iterates through them, retrieves their values, and compares them to the expected values. */

// Ensure we retrieve the count of input fields
    const count = await inputs.count();
    expect(count).toBe(3); // Validate that we have exactly 3 inputs (Month, Date, Year)

    for (let i = 0; i < count; i++) {
        const value = await inputs.nth(i).inputValue(); // Use inputValue() for better accuracy
        expect(value).toBe(expectedList[i]); // Use toBe() instead of toEqual() for primitive values
    }

});