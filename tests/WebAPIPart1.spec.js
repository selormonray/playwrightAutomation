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

