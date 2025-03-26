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
exports.validatePropertyPostcodes = validatePropertyPostcodes;
const loadData_1 = require("./loadData");
const node_path_1 = __importDefault(require("node:path"));
function validatePropertyPostcodes() {
    return __awaiter(this, void 0, void 0, function* () {
        const properties = yield (0, loadData_1.loadData)(node_path_1.default.resolve(__dirname, 'properties.csv'));
        return properties.filter((property) => !isPostcodeValid(property)).map(property => property.id);
    });
}
function isPostcodeValid(property) {
    const regex1 = /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][ABDEFGHJLNPQRSTUWXYZ]{2}$/;
    const regex2 = /^BFPO ?[0-9]{1,4}$/;
    const regex3 = /^([AC-FHKNPRTV-Y]\d{2}|D6W)? ?[0-9AC-FHKNPRTV-Y]{4}$/;
    return regex1.test(property.postcode) || regex2.test(property.postcode) || regex3.test(property.postcode);
}
