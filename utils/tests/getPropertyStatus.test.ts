import { getPropertyStatus } from '../getPropertyStatus';
import { Property } from '../../types/property.interface';
import { Tenant } from '../../types/tenant.interface';
import { loadData } from '../loadData';

jest.mock("../loadData", () => ({
    loadData: jest.fn(),
}));

describe("getPropertyStatus", () => {
    const mockProperties: Array<Property> = [
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

    const mockTenants: Array<Tenant> = [
        { id: 'id_1', propertyId: 'p_1', name: 'Tenant 1' },
        { id: 'id_2', propertyId: 'p_1', name: 'Tenant 2' },
        { id: 'id_3', propertyId: 'p_3', name: 'Tenant 3' },
        { id: 'id_4', propertyId: 'p_4', name: 'Tenant 4' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        (loadData as jest.Mock).mockResolvedValueOnce(mockProperties);
        (loadData as jest.Mock).mockResolvedValueOnce(mockTenants);
    });

    test("returns PROPERTY_VACANT when there are no tenants", async () => {
        await expect(getPropertyStatus("p_2")).resolves.toEqual("PROPERTY_VACANT");
    });


    test("returns PARTIALLY_VACANT when the property has tenants but not at full capacity and tenancy end date has not passed", async () => {
        await expect(getPropertyStatus("p_3")).resolves.toEqual("PARTIALLY_VACANT");
    });

    test("returns PROPERTY_ACTIVE when the property is fully occupied and tenancy end date has not passed", async () => {
        await expect(getPropertyStatus("p_1")).resolves.toEqual("PROPERTY_ACTIVE");
    });

    test("returns PROPERTY_OVERDUE when the tenancy end date has passed and there are tenants", async () => {
        (loadData as jest.Mock).mockResolvedValueOnce(mockProperties);
        (loadData as jest.Mock).mockResolvedValueOnce(mockTenants);

        await expect(getPropertyStatus("p_4")).resolves.toEqual("PROPERTY_OVERDUE");
    });

    test("throws an error when the property ID does not exist", async () => {
        await expect(getPropertyStatus("UNKNOWN_ID")).rejects.toThrow("A Property with that id does not exist");
    });
});
