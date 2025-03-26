"use strict";
// 2. Calculate the monthly rent, per tenant for a given property. Please code a solution that satisfies the following acceptance criteria:
//     - KIND OF - accepts an id. Accepts a property.
// - The total property monthly rent is split equally between the tenants.
// - The monthly rent, per tenant can be requested in pence or pounds.
// - If there are no tenants, an error should be thrown.
// - Returns the average monthly rent, per tenant as a number.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMonthlyRentPerTenantForProperty = calculateMonthlyRentPerTenantForProperty;
const loadData_1 = require("./loadData");
const node_path_1 = __importDefault(require("node:path"));
function calculateMonthlyRentPerTenantForProperty(propertyId_1) {
    return __awaiter(this, arguments, void 0, function* (propertyId, pennies = false) {
        const properties = yield (0, loadData_1.loadData)(node_path_1.default.resolve(__dirname, 'properties.csv'));
        const tenants = yield (0, loadData_1.loadData)(node_path_1.default.resolve(__dirname, 'tenants.csv'));
        const property = properties.find((property) => property.id === propertyId);
        if (!property) {
            throw new Error(`A property with that id does not exist - please confirm that ${propertyId} is a valid id.`);
        }
        const numberOfTenants = tenants.filter((tenant) => tenant.propertyId === property.id).length;
        if (numberOfTenants === 0) {
            throw new Error(`There are no tenants at this property.`);
        }
        let sumInPenniesPerTenant = Number(property.monthlyRentPence) / numberOfTenants;
        return pennies ? sumInPenniesPerTenant : (sumInPenniesPerTenant / 100);
    });
}
