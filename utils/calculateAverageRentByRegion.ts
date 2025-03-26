import { Property } from '../types/property.interface';
import path from 'node:path';
import { loadData } from './loadData';

export async function calculateAverageMonthlyRentForRegion(region: string): Promise<number> {
    const properties: Array<Property> = await loadData(path.resolve(__dirname, 'properties.csv'));

    const pricesInRegion = properties
        .filter(property => property.region === region.toUpperCase())
        .map(property => +property.monthlyRentPence);

    if (pricesInRegion.length === 0) {
        throw new Error('No properties were found in this region.');
    }

    const totalPrice = pricesInRegion.reduce((a, b) => a + b, 0);
    return Math.round(totalPrice / pricesInRegion.length);
}
