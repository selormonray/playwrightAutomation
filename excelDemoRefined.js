const ExcelJs = require('exceljs');

async function excelTest() {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile("/Users/selormahorlu/Downloads/exceldownloadTest.xlsx");


    // Check sheet name
    workbook.eachSheet((sheet) => {
        console.log(`Found sheet: ${sheet.name}`);
    });




}

excelTest();