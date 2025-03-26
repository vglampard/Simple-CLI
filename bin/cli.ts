#!/usr/bin/env node

import { Command } from "commander";
import { getPropertyStatus } from '../utils/getPropertyStatus';
import { validatePropertyPostcodes } from '../utils/validateAllPropertyPostcodes';
import { calculateMonthlyRentPerTenantForProperty } from '../utils/calculateMonthlyRentForPropertyPerTenant';
import { calculateAverageMonthlyRentForRegion } from '../utils/calculateAverageRentByRegion';

const program = new Command();

program
    .name("Reposit CLI")
    .description("A CLI tool for working with property and tenant data")
    .version("1.0.0");

program
    .command("status <property_id>")
    .description("Checks status of a property.")
    .action(async (property_id) => {
        try {
            console.log(await getPropertyStatus(property_id));
        } catch (error: any) {
            console.error(`🚨${error.message}`);
            process.exit(1);
        }
    });

program
    .command("checkPostcodes")
    .description("Returns a list of any of your properties that have an invalid UK postcode.")
    .action( async () => {
         const invalidPostcodes = await validatePropertyPostcodes();
         if (invalidPostcodes.length) {
             console.log(invalidPostcodes)
         } else {
             console.log('All postcodes are valid.')
         }
    });

program
    .command("propertyRentPerTenant <property_id>")
    .description("Returns the average rent per tenant for a given property in pounds, can add flag to convert to pennies.")
    .option("-p, --pennies", "Return the rent in pennies.")
    .action(async (property_id, options) => {
        try {
            console.log(await calculateMonthlyRentPerTenantForProperty(property_id, options.pennies))
        } catch (error: any) {
            console.error(`🚨${error.message}`);
            process.exit(1);
        }
    });

program
    .command("rentPerRegion <region>")
    .description("Returns the average rent per month for a given region, in pennies.")
    .action(async (region) => {
        try {
            console.log(await calculateAverageMonthlyRentForRegion(region))
        } catch (error: any) {
            console.error(`🚨${error.message}`);
            process.exit(1);
        }
    });


program.parse(process.argv);

