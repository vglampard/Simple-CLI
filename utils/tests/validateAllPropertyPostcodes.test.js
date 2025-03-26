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
Object.defineProperty(exports, "__esModule", { value: true });
const loadData_1 = require("../loadData");
const validateAllPropertyPostcodes_1 = require("../validateAllPropertyPostcodes");
jest.mock("../loadData", () => ({
    loadData: jest.fn(),
}));
describe("validatePropertyPostcodes", () => {
    const validProperties = [
        { id: 'p_1', address: '1 Street', postcode: 'SW1A 1AA', monthlyRentPence: '10000', region: 'ENGLAND', capacity: '1', tenancyEndDate: '2025-12-01' },
        { id: 'p_2', address: '2 Avenue', postcode: 'EC1A 1BB', monthlyRentPence: '20000', region: 'SCOTLAND', capacity: '2', tenancyEndDate: '2026-01-10' },
        { id: 'p_3', address: '3 Lane', postcode: 'BFPO 123', monthlyRentPence: '15000', region: 'WALES', capacity: '3', tenancyEndDate: '2027-06-15' }
    ];
    const invalidProperties = [
        { id: 'p_4', address: '4 Road', postcode: 'INVALID1', monthlyRentPence: '12000', region: 'ENGLAND', capacity: '2', tenancyEndDate: '2024-09-30' },
        { id: 'p_5', address: '5 Boulevard', postcode: '123 ABC', monthlyRentPence: '13000', region: 'SCOTLAND', capacity: '1', tenancyEndDate: '2025-03-20' }
    ];
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("returns an empty array when all properties have valid postcodes", () => __awaiter(void 0, void 0, void 0, function* () {
        loadData_1.loadData.mockResolvedValue(validProperties);
        const result = yield (0, validateAllPropertyPostcodes_1.validatePropertyPostcodes)();
        expect(result).toEqual([]);
    }));
    test("returns a list of invalid property IDs when some properties have invalid postcodes", () => __awaiter(void 0, void 0, void 0, function* () {
        loadData_1.loadData.mockResolvedValue([...validProperties, ...invalidProperties]);
        const result = yield (0, validateAllPropertyPostcodes_1.validatePropertyPostcodes)();
        expect(result).toEqual(['p_4', 'p_5']);
    }));
    test("returns all property IDs when all properties have invalid postcodes", () => __awaiter(void 0, void 0, void 0, function* () {
        loadData_1.loadData.mockResolvedValue(invalidProperties);
        const result = yield (0, validateAllPropertyPostcodes_1.validatePropertyPostcodes)();
        expect(result).toEqual(['p_4', 'p_5']);
    }));
    test("throws an error when loadData fails", () => __awaiter(void 0, void 0, void 0, function* () {
        loadData_1.loadData.mockRejectedValue(new Error("Failed to load data"));
        yield expect((0, validateAllPropertyPostcodes_1.validatePropertyPostcodes)()).rejects.toThrow("Failed to load data");
    }));
});
