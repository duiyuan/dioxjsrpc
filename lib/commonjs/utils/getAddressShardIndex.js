"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressToShard = void 0;
const base32_decode_1 = __importDefault(require("base32-decode"));
/**
 * address to shard
 * @param address
 * @param shardOrder
 * @returns shard
 */
const addressToShard = (address, shardOrder = 2) => {
    const addressStr = address.split(':')[0];
    if (!addressStr) {
        throw new Error('Invalid address format');
    }
    const unit8Array = new Uint8Array((0, base32_decode_1.default)(addressStr, 'Crockford'));
    const decoded = String.fromCharCode.apply(null, [...unit8Array]);
    if (!decoded || decoded.length != 36)
        throw 'invalid address format';
    const dwords = new Uint32Array(9);
    for (let i = 0; i < 9; i++) {
        dwords[i] = 0;
        for (let j = 0; j < 4; j++) {
            dwords[i] += decoded.charCodeAt(i * 4 + j) << (j * 8);
        }
    }
    const shardDword = dwords[0] ^ dwords[7] ^ dwords[4];
    const shardMask = ~(0xffffffff << shardOrder);
    return shardDword & shardMask;
};
exports.addressToShard = addressToShard;
//# sourceMappingURL=getAddressShardIndex.js.map