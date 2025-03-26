"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadData = loadData;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
function loadData(path) {
    return new Promise((resolve, reject) => {
        const processedData = [];
        fs_1.default.createReadStream(path)
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => processedData.push(data))
            .on('end', () => resolve(processedData))
            .on('error', (err) => reject(err));
    });
}
