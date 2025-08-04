import {Locator, Page} from '@playwright/test';

export class OrdersHistoryPage {
    private readonly page: Page;
    private readonly ordersTable: Locator;
    private readonly tableRows: Locator;
    private readonly orderIdDetails: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ordersTable = page.locator('tbody');
        this.tableRows = this.ordersTable.locator('tr');
        this.orderIdDetails = page.locator('.col-text');
    }

    async searchOrderAndSelect(orderId: string): Promise<void> {
        await this.ordersTable.waitFor();

        const rowCount = await this.tableRows.count();
        for (let i = 0; i < rowCount; i++) {
            const row = this.tableRows.nth(i);
            const rowOrderId = await row.locator('th').textContent();

            if (rowOrderId && orderId.includes(rowOrderId)) {
                await row.locator('button').first().click();
                break;
            }
        }
    }

    async getOrderId(): Promise<string | null> {
        return this.orderIdDetails.textContent();
    }
}