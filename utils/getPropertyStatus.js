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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropertyStatus = getPropertyStatus;
const loadData_1 = require("./loadData");
const node_path_1 = __importDefault(require("node:path"));
function getPropertyStatus(propertyId) {
    return __awaiter(this, void 0, void 0, function* () {
        const properties = yield (0, loadData_1.loadData)(node_path_1.default.resolve(__dirname, 'properties.csv'));
        const tenants = yield (0, loadData_1.loadData)(node_path_1.default.resolve(__dirname, 'tenants.csv'));
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
    });
}
