import { Property } from '../types/property.interface';
import { loadData } from './loadData';
import path from 'node:path';
import { Tenant } from '../types/tenant.interface';

export async function getPropertyStatus(propertyId: string): Promise<string>{
    const properties: Array<Property> = await loadData(path.resolve(__dirname, 'properties.csv'));
    const tenants: Array<Tenant> = await loadData(path.resolve(__dirname, 'tenants.csv'));
    const currentDate = new Date();

    const property = properties.find((p) => p.id === propertyId);

    if (!property) {
        throw new Error(`A Property with that id does not exist - please confirm that ${propertyId} is a valid id.`);
    }

    const numberOfTenants = tenants.filter((tenant) => tenant.propertyId === property.id).length;
    const tenancyEndDate = new Date(property.tenancyEndDate);

    if (numberOfTenants === 0) {
        return 'PROPERTY_VACANT';
    }

    if (numberOfTenants < +property.capacity && currentDate <= tenancyEndDate) {
        return 'PARTIALLY_VACANT';
    }

    if (numberOfTenants >= +property.capacity && currentDate <= tenancyEndDate) {
        return 'PROPERTY_ACTIVE';
    }

    if (numberOfTenants > 0 && currentDate > tenancyEndDate) {
        return 'PROPERTY_OVERDUE';
    }

    return 'status unknown';
}