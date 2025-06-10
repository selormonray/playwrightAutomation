const ExcelJs = require('exceljs');

async function excelTest() {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile("/Users/selormahorlu/Downloads/exceldownloadTest.xlsx");


    // Check sheet name
    workbook.eachSheet((sheet) => {
        console.log(`Found sheet: ${sheet.name}`);
    });


    const worksheet = workbook.getWorksheet('Sheet1'); // Use actual name from output above
    if (!worksheet) {
        console.error('Worksheet not found!');

    }

    worksheet.eachRow((row) => {
        row.eachCell((cell) => {
            console.log(cell.value);
        });
    });


}

