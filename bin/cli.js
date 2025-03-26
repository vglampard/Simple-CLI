#!/usr/bin/env node
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
const commander_1 = require("commander");
const getPropertyStatus_1 = require("../utils/getPropertyStatus");
const validateAllPropertyPostcodes_1 = require("../utils/validateAllPropertyPostcodes");
const calculateMonthlyRentForPropertyPerTenant_1 = require("../utils/calculateMonthlyRentForPropertyPerTenant");
const calculateAverageRentByRegion_1 = require("../utils/calculateAverageRentByRegion");
const program = new commander_1.Command();
program
    .name("Reposit CLI")
    .description("A CLI tool for working with property and tenant data")
    .version("1.0.0");
program
    .command("status <property_id>")
    .description("Checks status of a property.")
    .action((property_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(yield (0, getPropertyStatus_1.getPropertyStatus)(property_id));
    }
    catch (error) {
        console.error(`🚨${error.message}`);
        process.exit(1);
    }
}));
program
    .command("checkPostcodes")
    .description("Returns a list of any of your properties that have an invalid UK postcode.")
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    const invalidPostcodes = yield (0, validateAllPropertyPostcodes_1.validatePropertyPostcodes)();
    if (invalidPostcodes.length) {
        console.log(invalidPostcodes);
    }
    else {
        console.log('All postcodes are valid.');
    }
}));
program
    .command("propertyRentPerTenant <property_id>")
    .description("Returns the average rent per tenant for a given property in pounds, can add flag to convert to pennies.")
    .option("-p, --pennies", "Return the rent in pennies.")
    .action((property_id, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(yield (0, calculateMonthlyRentForPropertyPerTenant_1.calculateMonthlyRentPerTenantForProperty)(property_id, options.pennies));
    }
    catch (error) {
        console.error(`🚨${error.message}`);
        process.exit(1);
    }
}));
program
    .command("rentPerRegion <region>")
    .description("Returns the average rent per month for a given region, in pennies.")
    .action((region) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(yield (0, calculateAverageRentByRegion_1.calculateAverageMonthlyRentForRegion)(region));
    }
    catch (error) {
        console.error(`🚨${error.message}`);
        process.exit(1);
    }
}));
program.parse(process.argv);
