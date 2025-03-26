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
const calculateAverageRentByRegion_1 = require("../calculateAverageRentByRegion");
const loadData_1 = require("../loadData");
jest.mock("../loadData", () => ({
    loadData: jest.fn(),
}));
describe("calculateAverageMonthlyRentForRegion", () => {
    const mockProperties = [
        { id: 'p_1',
            address: '1 holloway',
            postcode: 'G12 1BC',
            monthlyRentPence: '10000',
            region: 'ENGLAND',
            capacity: '1',
            tenancyEndDate: '2020-01-12' },
        { id: 'p_2',
            address: '2 holloway',
            postcode: 'G13 2EF',
            monthlyRentPence: '30000',
            region: 'WALES',
            capacity: '2',
            tenancyEndDate: '2026-02-12' },
        { id: 'p_2',
            address: '2 holloway',
            postcode: 'G14 3LD',
            monthlyRentPence: '20000',
            region: 'ENGLAND',
            capacity: '3',
            tenancyEndDate: '2025-02-01' }
    ];
    const mockTenants = [
        {
            id: 'id_1',
            propertyId: 'pid_1',
            name: 'Jennifer 1'
        },
        {
            id: 'id_2',
            propertyId: 'pid_2',
            name: 'Jennifer 2'
        },
        {
            id: 'id_3',
            propertyId: 'pid_3',
            name: 'Jennifer 3'
        }
    ];
    beforeEach(() => {
        jest.clearAllMocks();
        loadData_1.loadData.mockResolvedValueOnce(mockProperties);
        loadData_1.loadData.mockResolvedValueOnce(mockTenants);
    });
    test("calculates average rent for a region correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, calculateAverageRentByRegion_1.calculateAverageMonthlyRentForRegion)("ENGLAND")).toEqual(15000);
    }));
    test("throws an error when no properties are found in the region", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, calculateAverageRentByRegion_1.calculateAverageMonthlyRentForRegion)("UNKNOWN_REGION")).rejects
            .toThrow("No properties were found in this region.");
    }));
    test("handles case insensitivity in region names", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, calculateAverageRentByRegion_1.calculateAverageMonthlyRentForRegion)("england")).toEqual(15000);
    }));
});
