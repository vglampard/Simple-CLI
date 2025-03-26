import { Property } from '../../types/property.interface';
import { loadData } from '../loadData';
import { validatePropertyPostcodes } from '../validateAllPropertyPostcodes';

jest.mock("../loadData", () => ({
    loadData: jest.fn(),
}));

describe("validatePropertyPostcodes", () => {
    const validProperties: Array<Property> = [
        { id: 'p_1', address: '1 Street', postcode: 'SW1A 1AA', monthlyRentPence: '10000', region: 'ENGLAND', capacity: '1', tenancyEndDate: '2025-12-01' },
        { id: 'p_2', address: '2 Avenue', postcode: 'EC1A 1BB', monthlyRentPence: '20000', region: 'SCOTLAND', capacity: '2', tenancyEndDate: '2026-01-10' },
        { id: 'p_3', address: '3 Lane', postcode: 'BFPO 123', monthlyRentPence: '15000', region: 'WALES', capacity: '3', tenancyEndDate: '2027-06-15' }
    ];

    const invalidProperties: Array<Property> = [
        { id: 'p_4', address: '4 Road', postcode: 'INVALID1', monthlyRentPence: '12000', region: 'ENGLAND', capacity: '2', tenancyEndDate: '2024-09-30' },
        { id: 'p_5', address: '5 Boulevard', postcode: '123 ABC', monthlyRentPence: '13000', region: 'SCOTLAND', capacity: '1', tenancyEndDate: '2025-03-20' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("returns an empty array when all properties have valid postcodes", async () => {
        (loadData as jest.Mock).mockResolvedValue(validProperties);

        const result = await validatePropertyPostcodes();
        expect(result).toEqual([]);
    });

    test("returns a list of invalid property IDs when some properties have invalid postcodes", async () => {
        (loadData as jest.Mock).mockResolvedValue([...validProperties, ...invalidProperties]);

        const result = await validatePropertyPostcodes();
        expect(result).toEqual(['p_4', 'p_5']);
    });

    test("returns all property IDs when all properties have invalid postcodes", async () => {
        (loadData as jest.Mock).mockResolvedValue(invalidProperties);

        const result = await validatePropertyPostcodes();
        expect(result).toEqual(['p_4', 'p_5']);
    });

    test("throws an error when loadData fails", async () => {
        (loadData as jest.Mock).mockRejectedValue(new Error("Failed to load data"));

        await expect(validatePropertyPostcodes()).rejects.toThrow("Failed to load data");
    });

});
