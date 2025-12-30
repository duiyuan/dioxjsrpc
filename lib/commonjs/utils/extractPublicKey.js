"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPublicKey = extractPublicKey;
// import base32Encode from "base32-encode"
const base32_decode_1 = __importDefault(require("base32-decode"));
const crc32c_js_1 = __importDefault(require("crc-32/crc32c.js"));
const buffer_1 = require("./buffer");
function extractPublicKey(address) {
    const [splitAddr] = address.split(':');
    const addressUintArr = new Uint8Array((0, base32_decode_1.default)(splitAddr, 'Crockford'));
    const publicKey = addressUintArr.slice(0, 32);
    const checkAddrUintArr = PK2Addr(publicKey);
    if ((0, buffer_1.areUint8ArraysEqual)(addressUintArr, checkAddrUintArr)) {
        return publicKey;
    }
    return null;
}
function PK2Addr(publicKey) {
    const rollingCRC = 3;
    const encryptMethod = 0x3;
    let errorCorrectingCode = crc32c_js_1.default.buf(publicKey, rollingCRC);
    errorCorrectingCode = (errorCorrectingCode & 0xfffffff0) | encryptMethod;
    errorCorrectingCode = errorCorrectingCode >>> 0;
    const buffer = new Int32Array([errorCorrectingCode]).buffer;
    const errorCorrectingCodeBuffer = new Uint8Array(buffer);
    const mergedBuffer = (0, buffer_1.concat)(publicKey, errorCorrectingCodeBuffer);
    return mergedBuffer;
}
//# sourceMappingURL=extractPublicKey.js.map