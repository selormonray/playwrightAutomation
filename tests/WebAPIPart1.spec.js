const {test, expect} = require("@playwright/test");
const APIUtils = require("../utils/APIUtils");

// Test data
const loginPayload = {
    userEmail: "selormonray14@gmail.com",
    userPassword: "playwrightTester14",
};

