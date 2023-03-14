import Papa from "papaparse";
import { Duplex } from "stream";

const importOptions = {
    "labanquepostale": {
        "csv": {
            date: [3, 1],
            dayTimespan: 30,
            balance: [4, 1],
            transactions: {
                startLine: 7,
                dateCol: 0,
                descriptionCol: 1,
                valueCol: 2
            }
        }
    }
}

function bufferToStream(myBuffer) {
    let tmp = new Duplex();
    tmp.push(myBuffer);
    tmp.push(null);
    return tmp;
}

export async function importFile(file, bank) {
    let stream = bufferToStream(await file.toBuffer());

    switch (bank) {
        case 'labanquepostale':
            return convertFromDatable(
                await csvToDatatable(stream),
                importOptions[bank].csv);
    }
}

function csvToDatatable(csv) {
    return new Promise((resolve, reject) => {
        Papa.parse(csv, {
            delimiter: ";",
            complete: function(results) {
                resolve(results.data);
            },
            error: reject
        });
    });
}

function convertToFloat(string)
{
    return parseFloat(string.replace(',', '.'));
}

function convertToDate(string)
{
    let parts = string.split("/");
    let dt = new Date(parseInt(parts[2], 10),
                  parseInt(parts[1], 10) - 1,
                  parseInt(parts[0], 10));
                   
    return dt;
}

function convertFromDatable(datatable, options) {
    let transactions = [];
    let balance = convertToFloat(datatable[options.balance[0]][options.balance[1]].replace());
    let date = convertToDate(datatable[options.date[0]][options.date[1]]);
    let dateMin = new Date(date);
    dateMin.setDate(dateMin.getDate() - options.dayTimespan);

    for (let i = options.transactions.startLine; i < datatable.length; i++)
    {
        transactions.push({
            date: convertToDate(datatable[i][options.transactions.dateCol]),
            description: datatable[i][options.transactions.descriptionCol],
            value: convertToFloat(datatable[i][options.transactions.valueCol])
        });
    }

    return {
        balance,
        dateMin: dateMin,
        dateMax: date,
        transactions
    }
}