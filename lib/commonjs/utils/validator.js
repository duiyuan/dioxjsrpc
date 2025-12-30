"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidAddress = isValidAddress;
const base32_decode_1 = __importDefault(require("base32-decode"));
const base32_encode_1 = __importDefault(require("base32-encode"));
const crc32c_js_1 = __importDefault(require("crc-32/crc32c.js"));
const buffer_1 = require("./buffer");
function isValidAddress(addr) {
    try {
        const [addressStr] = addr.split(':');
        const address = new Uint8Array((0, base32_decode_1.default)(addressStr, 'Crockford'));
        const publicKey = address.slice(0, 32);
        let errorCorrectingCode = crc32c_js_1.default.buf(publicKey, 3);
        errorCorrectingCode = (errorCorrectingCode & 0xfffffff0) | 0x3;
        errorCorrectingCode = errorCorrectingCode >>> 0;
        const buffer = new Int32Array([errorCorrectingCode]).buffer;
        const errorCorrectingCodeBuffer = new Uint8Array(buffer);
        const mergedBuffer = (0, buffer_1.concat)(publicKey, errorCorrectingCodeBuffer);
        const encodedMergeBuffer = (0, base32_encode_1.default)(mergedBuffer, 'Crockford');
        return encodedMergeBuffer === addressStr.toUpperCase();
    }
    catch (error) {
        console.error('Exception ' + error);
        return false;
    }
}
//# sourceMappingURL=validator.js.map