import { Property } from '../types/property.interface';
import { loadData } from './loadData';
import path from 'node:path';

export async function validatePropertyPostcodes(): Promise<Array<string>> {
    const properties: Array<Property> = await loadData(path.resolve(__dirname, 'properties.csv'))
   return  properties.filter((property) => !isPostcodeValid(property)).map(property => property.id);
}

function isPostcodeValid(property: Property){
    const regex1 =/^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][ABDEFGHJLNPQRSTUWXYZ]{2}$/
    const regex2 =/^BFPO ?[0-9]{1,4}$/
    const regex3 =/^([AC-FHKNPRTV-Y]\d{2}|D6W)? ?[0-9AC-FHKNPRTV-Y]{4}$/

    return regex1.test(property.postcode) || regex2.test(property.postcode) || regex3.test(property.postcode)
}