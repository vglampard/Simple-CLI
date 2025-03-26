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
const calculateMonthlyRentForPropertyPerTenant_1 = require("../calculateMonthlyRentForPropertyPerTenant");
jest.mock("../loadData", () => ({
    loadData: jest.fn(),
}));
describe("calculateMonthlyRentPerTenantForProperty", () => {
    const mockProperties = [
        {
            id: 'p_1',
            address: '1 Holloway',
            postcode: 'G12 1BC',
            monthlyRentPence: '10000',
            region: 'ENGLAND',
            capacity: '2',
            tenancyEndDate: '2027-01-01'
        },
        {
            id: 'p_2',
            address: '2 Holloway',
            postcode: 'G13 2EF',
            monthlyRentPence: '30000',
            region: 'WALES',
            capacity: '3',
            tenancyEndDate: '2026-02-12'
        },
        {
            id: 'p_3',
            address: '3 Holloway',
            postcode: 'G14 3LD',
            monthlyRentPence: '50000',
            region: 'SCOTLAND',
            capacity: '2',
            tenancyEndDate: '2025-03-01'
        }
    ];
    const mockTenants = [
        { id: 't_1', propertyId: 'p_1', name: 'Tenant A' },
        { id: 't_2', propertyId: 'p_1', name: 'Tenant B' },
        { id: 't_3', propertyId: 'p_2', name: 'Tenant C' },
        { id: 't_4', propertyId: 'p_2', name: 'Tenant D' },
        { id: 't_5', propertyId: 'p_2', name: 'Tenant E' }
    ];
    beforeEach(() => {
        jest.clearAllMocks();
        loadData_1.loadData
            .mockResolvedValueOnce(mockProperties)
            .mockResolvedValueOnce(mockTenants);
    });
    test("calculates rent per tenant correctly (default GBP)", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, calculateMonthlyRentForPropertyPerTenant_1.calculateMonthlyRentPerTenantForProperty)("p_1")).toEqual(50);
    }));
    test("calculates rent per tenant correctly (pennies format)", () => __awaiter(void 0, void 0, void 0, function* () {
        const ans = yield (0, calculateMonthlyRentForPropertyPerTenant_1.calculateMonthlyRentPerTenantForProperty)("p_2", true);
        expect(ans)
            .toEqual(10000);
    }));
    test("throws an error if property does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, calculateMonthlyRentForPropertyPerTenant_1.calculateMonthlyRentPerTenantForProperty)("p_999"))
            .rejects.toThrow("A property with that id does not exist - please confirm that p_999 is a valid id.");
    }));
    test("throws an error if property has no tenants", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, calculateMonthlyRentForPropertyPerTenant_1.calculateMonthlyRentPerTenantForProperty)("p_3"))
            .rejects.toThrow("There are no tenants at this property.");
    }));
});
