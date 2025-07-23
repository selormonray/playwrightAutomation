const {Given, When, Then, Before, After} = require("@cucumber/cucumber");
const {POManager} = require("pages/POManager");
const {chromium} = require("@playwright/test");
const loginDataSet = JSON.parse(JSON.stringify(require("DTOs/loginDTO.json")));
const userDetailsDataSet = JSON.parse(JSON.stringify(require("DTOs/userDetailsDTO.json")));

let browser, context, page, poManager;
let orderId;

