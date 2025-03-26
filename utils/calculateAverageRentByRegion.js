"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAverageMonthlyRentForRegion = calculateAverageMonthlyRentForRegion;
const node_path_1 = __importDefault(require("node:path"));
const loadData_1 = require("./loadData");
function calculateAverageMonthlyRentForRegion(region) {
    return __awaiter(this, void 0, void 0, function* () {
        const properties = yield (0, loadData_1.loadData)(node_path_1.default.resolve(__dirname, 'properties.csv'));
        const pricesInRegion = properties
            .filter(property => property.region === region.toUpperCase())
            .map(property => +property.monthlyRentPence);
        if (pricesInRegion.length === 0) {
            throw new Error('No properties were found in this region.');
        }
        const totalPrice = pricesInRegion.reduce((a, b) => a + b, 0);
        return Math.round(totalPrice / pricesInRegion.length);
    });
}
