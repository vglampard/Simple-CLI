import fs from 'fs';
import csv from 'csv-parser';

export function loadData(path: string): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
        const processedData: Array<any> = [];
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', (data) => processedData.push(data))
            .on('end', () => resolve(processedData))
            .on('error', (err) => reject(err));
    })
}