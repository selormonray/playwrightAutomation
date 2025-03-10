const { test, expect, request } = require("@playwright/test");
const APIUtils = require("./utils/APIUtils");

const loginPayLoad = { userEmail: "selormonray14@gmail.com", userPassword: "playwrightTester14" };
const orderPayLoad = { orders: [{ country: "Ghana", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
let response;

test.beforeAll(async ({ request }) => {
    const apiUtils = new APIUtils(request, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

    expect(response).toHaveProperty("token");
    expect(response).toHaveProperty("orderID");
});

