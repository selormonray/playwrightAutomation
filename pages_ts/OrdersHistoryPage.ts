pageimport
{
    test, expect, Locator, Page
}
from
'@playwright/test';

export class OrdersHistoryPage
{
    orderdIdDetails: Locator;
    rows: Locator;
    ordersTable: Locator;
    page: Page;

    constructor(page: Page)


}

module.exports = {OrdersHistoryPage};
