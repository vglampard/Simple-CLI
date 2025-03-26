import { Property } from '../types/property.interface';
import { loadData } from './loadData';
import path from 'node:path';
import { Tenant } from '../types/tenant.interface';

export async function calculateMonthlyRentPerTenantForProperty(propertyId: string, pennies = false): Promise<number> {
    const properties: Array<Property> = await loadData(path.resolve(__dirname, 'properties.csv'));
    const tenants: Array<Tenant> = await loadData( path.resolve(__dirname , 'tenants.csv'))

    const property = properties.find((property)=> property.id === propertyId);
    if (!property){
        throw new Error(`A property with that id does not exist - please confirm that ${propertyId} is a valid id.`);
    }

    const numberOfTenants: number = tenants.filter((tenant)=> tenant.propertyId === property.id).length;
    if (numberOfTenants === 0){
        throw new Error(`There are no tenants at this property.`);
    }
    let sumInPenniesPerTenant = Number(property.monthlyRentPence)/numberOfTenants;
    return pennies ? sumInPenniesPerTenant : (sumInPenniesPerTenant/100)
}