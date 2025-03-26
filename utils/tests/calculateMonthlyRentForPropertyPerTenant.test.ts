import { Property } from '../../types/property.interface';
import { Tenant } from '../../types/tenant.interface';
import { loadData } from '../loadData';
import { calculateMonthlyRentPerTenantForProperty } from '../calculateMonthlyRentForPropertyPerTenant';

jest.mock("../loadData", () => ({
    loadData: jest.fn(),
}));

describe("calculateMonthlyRentPerTenantForProperty", () => {
    const mockProperties: Array<Property> = [
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

    const mockTenants: Array<Tenant> = [
        { id: 't_1', propertyId: 'p_1', name: 'Tenant A' },
        { id: 't_2', propertyId: 'p_1', name: 'Tenant B' },
        { id: 't_3', propertyId: 'p_2', name: 'Tenant C' },
        { id: 't_4', propertyId: 'p_2', name: 'Tenant D' },
        { id: 't_5', propertyId: 'p_2', name: 'Tenant E' }
    ];

    beforeEach( () => {
        jest.clearAllMocks();

        (loadData as jest.Mock)
            .mockResolvedValueOnce(mockProperties)
            .mockResolvedValueOnce(mockTenants);
    });

    test("calculates rent per tenant correctly (default GBP)", async () => {
         expect(await calculateMonthlyRentPerTenantForProperty("p_1")).toEqual(50);
    });

    test("calculates rent per tenant correctly (pennies format)", async () => {
        const ans = await calculateMonthlyRentPerTenantForProperty("p_2", true)
        expect(ans)
            .toEqual(10000);
    });

    test("throws an error if property does not exist", async () => {
        await expect(calculateMonthlyRentPerTenantForProperty("p_999"))
            .rejects.toThrow("A property with that id does not exist - please confirm that p_999 is a valid id.");
    });

    test("throws an error if property has no tenants", async () => {
        await expect(calculateMonthlyRentPerTenantForProperty("p_3"))
            .rejects.toThrow("There are no tenants at this property.");
    });

});