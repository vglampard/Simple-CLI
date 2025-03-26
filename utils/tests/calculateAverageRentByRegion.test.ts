import { calculateAverageMonthlyRentForRegion } from '../calculateAverageRentByRegion';
import { Property } from '../../types/property.interface';
import { Tenant } from '../../types/tenant.interface';
import { loadData } from '../loadData';

jest.mock("../loadData", () => ({
    loadData: jest.fn(),
}));

describe("calculateAverageMonthlyRentForRegion", () => {
    const mockProperties: Array<Property> = [
        { id: 'p_1',
            address: '1 holloway',
            postcode: 'G12 1BC',
            monthlyRentPence: '10000',
            region: 'ENGLAND',
            capacity: '1',
            tenancyEndDate: '2020-01-12'},
        { id: 'p_2',
            address: '2 holloway',
            postcode: 'G13 2EF',
            monthlyRentPence: '30000',
            region: 'WALES',
            capacity: '2',
            tenancyEndDate: '2026-02-12'},
        { id: 'p_2',
            address: '2 holloway',
            postcode: 'G14 3LD',
            monthlyRentPence: '20000',
            region: 'ENGLAND',
            capacity: '3',
            tenancyEndDate: '2025-02-01'}
    ];
    const mockTenants: Array<Tenant> = [
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
    ]
    beforeEach(() => {
        jest.clearAllMocks();
        (loadData as jest.Mock).mockResolvedValueOnce(mockProperties);
        (loadData as jest.Mock).mockResolvedValueOnce(mockTenants);

    });
    test("calculates average rent for a region correctly", async () => {
        expect(await calculateAverageMonthlyRentForRegion("ENGLAND")).toEqual(15000);
    });

    test("throws an error when no properties are found in the region", async () => {
        await expect(calculateAverageMonthlyRentForRegion("UNKNOWN_REGION")).rejects
            .toThrow("No properties were found in this region.");
    });

    test("handles case insensitivity in region names", async () => {
        expect(await calculateAverageMonthlyRentForRegion("england")).toEqual(15000);
    });

});