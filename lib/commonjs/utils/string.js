"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullAddress = exports.toTokenAmount = exports.bignumberLt = exports.bignumberDiv = exports.bignumberPow = exports.bignumberPlus = exports.bignumberMinus = exports.bignumberMult = exports.shakeKeyValue = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const shakeKeyValue = (params) => {
    if (params && typeof params === 'object') {
        Object.keys(params).forEach((key) => {
            const val = params[key];
            if (['', undefined, null].includes(val)) {
                delete params[key];
            }
        });
        return params;
    }
    return params;
};
exports.shakeKeyValue = shakeKeyValue;
const bignumberMult = (val1, val2) => {
    return new bignumber_js_1.default(val1).multipliedBy(val2).toFixed();
};
exports.bignumberMult = bignumberMult;
const bignumberMinus = (val1, val2) => {
    return new bignumber_js_1.default(val1).minus(new bignumber_js_1.default(val2));
};
exports.bignumberMinus = bignumberMinus;
const bignumberPlus = (val1, val2) => {
    return new bignumber_js_1.default(val1).plus(new bignumber_js_1.default(val2));
};
exports.bignumberPlus = bignumberPlus;
const bignumberPow = (val1, power) => {
    return new bignumber_js_1.default(val1).pow(power);
};
exports.bignumberPow = bignumberPow;
const bignumberDiv = (v1, v2) => {
    return new bignumber_js_1.default(v1).dividedBy(v2);
};
exports.bignumberDiv = bignumberDiv;
const bignumberLt = (v1, v2) => {
    return new bignumber_js_1.default(v1).lt(v2);
};
exports.bignumberLt = bignumberLt;
const toTokenAmount = (amount, decimals) => {
    return (0, exports.bignumberDiv)(amount, new bignumber_js_1.default(10).pow(decimals)).toString();
};
exports.toTokenAmount = toTokenAmount;
const fullAddress = (address) => {
    if (!address)
        return '';
    return `${address.split(':')[0]}:ed25519`;
};
exports.fullAddress = fullAddress;
//# sourceMappingURL=string.js.map