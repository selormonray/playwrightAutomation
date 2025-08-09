const {test, expect} = require("@playwright/test");
const APIUtils = require("../utils/APIUtils");

// Test data
const loginPayload = {
    userEmail: "selormonray14@gmail.com",
    userPassword: "playwrightTester14",
};

const orderPayload = {
    orders: [{country: "Ghana", productOrderedId: "67a8dde5c0d3e6622a297cc8"}],
};

let apiResponse;

test.beforeAll(async ({request}) => {
    const apiUtils = new APIUtils(request, loginPayload);
    apiResponse = await apiUtils.createOrder(orderPayload);

    expect(apiResponse).toMatchObject({
        token: expect.any(String),
        orderID: expect.any(String),
    });
});

test("Place Order", async ({page}) => {
// Inject token into local storage
