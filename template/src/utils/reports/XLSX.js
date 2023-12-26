import ExcelJS from "exceljs";

const DEFAULT_HEADER_CONFIGURATIONS = {
    fill: {
        type: 'pattern',
        pattern: 'darkVertical',
        fgColor: { argb: '0070AD47' },
        bgColor: { argb: '0070AD47' }
    },
    border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
    },
    alignment: {
        vertical: 'center',
        horizontal: 'center'
    }
};

export async function exportXLSX(
    data,
    getColumnsAndRows,
    fileName = "Relatório Pró Disciplinas",
    headerConfigurations = DEFAULT_HEADER_CONFIGURATIONS
) {
    const workbook = new ExcelJS.Workbook();

    const { columns, rows, ...rest } = getColumnsAndRows(data);

    //Caso o getColumnsAndRows nao retorne o atributo ele tem um valor default
    const sheetsNames = rest.sheetsNames || [];

    const interator = (!!sheetsNames.length ? sheetsNames : data);

    if (Array.isArray(columns[0]))
        interator.forEach((period, idx) => {
            addWorksheet(workbook, period, columns[idx], rows[idx], sheetsNames[idx], headerConfigurations);
        });
    else
        interator.forEach((period, idx) => {
            addWorksheet(workbook, period, columns, rows[idx], sheetsNames[idx], headerConfigurations);
        });


    await downloadWorkbook(workbook, fileName);
}

export async function downloadWorkbook(workbook, fileName) {
    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], { type: "application/octet-binary" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.xlsx`;
    a.click();
    a.remove();
}

function addWorksheet(
    workbook,
    period,
    columns,
    row,
    sheetName,
    headerConfigurations
) {
    const worksheet = workbook.addWorksheet(sheetName);
    worksheet.columns = columns;

    addHeaderConfiguration(worksheet, headerConfigurations);

    worksheet.addRows(row);
}

export function addHeaderConfiguration(worksheet, configuration, lineHeader = 1) {
    const properties = Object.keys(configuration);

    for (let i = 0; i < worksheet.columns.length; i++) {
        properties.forEach((item) => {
            worksheet.getCell((String.fromCharCode(i + 65)) + lineHeader)[item] = configuration[item];
        })
    }
}

export function styleCell(styles, cell) {
    const properties = Object.keys(styles);

    properties.forEach((item) => {
        cell[item] = styles[item];
    })
}




//     workbook.addWorksheet(worksheetName);
//     const worksheet = workbook.getWorksheet(worksheetName);

//     const columns = [
//         { header: "Código", key: "reference", width: 30 },
//         { header: "Status", key: "status", width: 15 },
//         { header: "Área", key: "area", width: 30 },
//         { header: "Bairro", key: "neighborhood", width: 20 }
//     ];

//     if (includeServiceStart)
//         columns.push({
//             header: "Tempo de Início de atendimento",
//             key: "timeToServiceStart",
//             width: 30
//         })

//     if (includeResolutionTime)
//         columns.push({
//             header: "Tempo de resolução de ocorrência",
//             key: "timeToServiceResponse",
//             width: 30
//         })

//     worksheet.columns = columns;

//     headerConfiguration(worksheet, {
//         fill: {
//             type: 'pattern',
//             pattern: 'darkVertical',
//             fgColor: { argb: '00FBCC08' },
//             bgColor: { argb: 'FFFBCC08' }
//         },
//         border: {
//             top: { style: 'thin' },
//             left: { style: 'thin' },
//             bottom: { style: 'thin' },
//             right: { style: 'thin' }
//         },
//         alignment: {
//             vertical: 'center',
//             horizontal: 'center'
//         }
//     });

//     worksheet.addRows(rows);

//     const borderAndColorWhite = {
//         border: {
//             top: { style: 'thin' },
//             left: { style: 'thin' },
//             bottom: { style: 'thin' },
//             right: { style: 'thin' }
//         },
//         font: {
//             color: { argb: 'FFFFFFFF' }
//         }
//     };

//     const styles = {
//         'Em análise': {
//             fill: {
//                 type: 'pattern',
//                 pattern: 'darkVertical',
//                 fgColor: { argb: '002C62C1' },
//                 bgColor: { argb: 'FF2C62C1' }
//             },
//             ...borderAndColorWhite
//         },
//         'Novo': {
//             fill: {
//                 type: 'pattern',
//                 pattern: 'darkVertical',
//                 fgColor: { argb: '00DB5050' },
//                 bgColor: { argb: 'FFDB5050' }
//             },
//             ...borderAndColorWhite
//         },
//         'Resolvido': {
//             fill: {
//                 type: 'pattern',
//                 pattern: 'darkVertical',
//                 fgColor: { argb: '003BB54E' },
//                 bgColor: { argb: 'FF3BB54E' }
//             },
//             ...borderAndColorWhite
//         },
//         'Indeferido': {
//             fill: {
//                 type: 'pattern',
//                 pattern: 'darkVertical',
//                 fgColor: { argb: '0057576D' },
//                 bgColor: { argb: 'FF57576D' }
//             },
//             ...borderAndColorWhite
//         }
//     };

//     columnConditionalMultiStyle(worksheet, worksheet.getColumn('status'), styles,
//         (cell) => { return cell.value }
//     );
// }



// /**
//  * A função de @param callback deve retornar o nome que define quais dos estilos
//  * utilizar do objeto "styles". A função de callback recebe, respectivamente,
//  * 2 parâmetros a célula em si e um contador que indica a linha desta célula
// */
// function columnConditionalMultiStyle(worksheet, column, styles, callback) {
//     const letterColumn = (String.fromCharCode(column.number + 64));

//     for (let i = 2; i < column.values.length; i++) {
//         const cell = worksheet.getCell(`${letterColumn}${i}`);
//         const currentStyle = styles[callback(cell, i)];

//         if (currentStyle) {
//             const currentProperties = Object.keys(currentStyle);

//             currentProperties.forEach((item) => {
//                 cell[item] = currentStyle[item];
//             });
//         }
//     }
// }

// function addTimeInfo(rows, includeServiceStart, includeResolutionTime) {
//     const newRows = {};

//     Object.keys(rows).forEach((nameObject) => {
//         let newArray = rows[nameObject];

//         if (includeServiceStart) {
//             newArray.forEach(addTimeToServiceStart);
//         }

//         if (includeResolutionTime)
//             newArray.forEach(addTimeToServiceResponse);

//         newRows[nameObject] = newArray;
//     })

//     return newRows;
// }

// function addTimeToServiceResponse(row, index, theArray) {
//     const time = new Date(row.updatedAt) - new Date(row.createdAt);

//     theArray[index] = {
//         ...row,
//         timeToServiceResponse: convertTimestampToDay(time)
//     };
// }

// function addTimeToServiceStart(row, index, theArray) {
//     const time = new Date(row.updatedAt) - new Date(row.createdAt);

//     theArray[index] = {
//         ...row,
//         timeToServiceStart: convertTimestampToDay(time)
//     };
// }


// //Exemplo de uso da função "columnConditionalStyle"
// //Caso deseje utilizá-la, não esqueça de descomentar a função
// /*columnConditionalStyle(worksheet, worksheet.getColumn('type'),
//     {
//         true: {
//             fill: {
//                 type: 'pattern',
//                 pattern: 'darkVertical',
//                 fgColor: { argb: '00AFD095' },
//                 bgColor: { argb: 'FFAFD095' }
//             },
//             border: {
//                 top: { style: 'thin' },
//                 left: { style: 'thin' },
//                 bottom: { style: 'thin' },
//                 right: { style: 'thin' }
//             }
//         },
//         false: {
//             fill: {
//                 type: 'pattern',
//                 pattern: 'darkVertical',
//                 fgColor: { argb: '00ED9BA4' },
//                 bgColor: { argb: 'FFED9BA4' }
//             },
//             border: {
//                 top: { style: 'thin' },
//                 left: { style: 'thin' },
//                 bottom: { style: 'thin' },
//                 right: { style: 'thin' }
//             }
//         }
//     },
//     (cell) => { return cell.value === 'Embarque' });*/
// /*


// function columnConditionalStyle(worksheet, column, style, condition) {
//     const letterColumn = (String.fromCharCode(column.number + 64));

//     for (let i = 2; i < column.values.length; i++) {
//         const cell = worksheet.getCell(`${letterColumn}${i}`);
//         const currentStyle = condition(cell, i) ? style.true : style.false;
//         const currentProperties = Object.keys(currentStyle);

//         currentProperties.forEach((item) => {
//             cell[item] = currentStyle[item];
//         });
//     }
// }*/
