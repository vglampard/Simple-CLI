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
const getPropertyStatus_1 = require("../getPropertyStatus");
const loadData_1 = require("../loadData");
jest.mock("../loadData", () => ({
    loadData: jest.fn(),
}));
describe("getPropertyStatus", () => {
    const mockProperties = [
        {
            id: 'p_1',
            address: '1 Holloway',
            postcode: 'G12 1BC',
            monthlyRentPence: '10000',
            region: 'ENGLAND',
            capacity: '2',
            tenancyEndDate: '2026-01-12'
        },
        {
            id: 'p_2',
            address: '2 Holloway',
            postcode: 'G13 2EF',
            monthlyRentPence: '30000',
            region: 'WALES',
            capacity: '1',
            tenancyEndDate: '2023-01-12'
        },
        {
            id: 'p_3',
            address: '3 Holloway',
            postcode: 'G14 3LD',
            monthlyRentPence: '20000',
            region: 'ENGLAND',
            capacity: '3',
            tenancyEndDate: '2025-10-01'
        },
        {
            id: 'p_4',
            address: '4 Holloway',
            postcode: 'G14 4LD',
            monthlyRentPence: '20000',
            region: 'ENGLAND',
            capacity: '4',
            tenancyEndDate: '2022-10-01'
        }
    ];
    const mockTenants = [
        { id: 'id_1', propertyId: 'p_1', name: 'Tenant 1' },
        { id: 'id_2', propertyId: 'p_1', name: 'Tenant 2' },
        { id: 'id_3', propertyId: 'p_3', name: 'Tenant 3' },
        { id: 'id_4', propertyId: 'p_4', name: 'Tenant 4' }
    ];
    beforeEach(() => {
        jest.clearAllMocks();
        loadData_1.loadData.mockResolvedValueOnce(mockProperties);
        loadData_1.loadData.mockResolvedValueOnce(mockTenants);
    });
    test("returns PROPERTY_VACANT when there are no tenants", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, getPropertyStatus_1.getPropertyStatus)("p_2")).resolves.toEqual("PROPERTY_VACANT");
    }));
    test("returns PARTIALLY_VACANT when the property has tenants but not at full capacity and tenancy end date has not passed", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, getPropertyStatus_1.getPropertyStatus)("p_3")).resolves.toEqual("PARTIALLY_VACANT");
    }));
    test("returns PROPERTY_ACTIVE when the property is fully occupied and tenancy end date has not passed", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, getPropertyStatus_1.getPropertyStatus)("p_1")).resolves.toEqual("PROPERTY_ACTIVE");
    }));
    test("returns PROPERTY_OVERDUE when the tenancy end date has passed and there are tenants", () => __awaiter(void 0, void 0, void 0, function* () {
        loadData_1.loadData.mockResolvedValueOnce(mockProperties);
        loadData_1.loadData.mockResolvedValueOnce(mockTenants);
        yield expect((0, getPropertyStatus_1.getPropertyStatus)("p_4")).resolves.toEqual("PROPERTY_OVERDUE");
    }));
    test("throws an error when the property ID does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, getPropertyStatus_1.getPropertyStatus)("UNKNOWN_ID")).rejects.toThrow("A Property with that id does not exist");
    }));
});
