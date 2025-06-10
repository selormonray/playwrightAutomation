const ExcelJs = require('exceljs');

async function excelTest() {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile("/Users/selormahorlu/Downloads/exceldownloadTest.xlsx");

}

excelTest();