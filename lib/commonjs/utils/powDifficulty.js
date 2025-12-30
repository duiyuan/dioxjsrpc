"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const js_sha256_1 = require("js-sha256");
const js_sha512_1 = require("js-sha512");
const NONCE_LEN = 12;
class PowDifficulty {
    constructor({ originTxn, hashSize, ttl }) {
        this.hashSize = hashSize || 32;
        this.targetNum = BigInt(0);
        this.nonZeroBytes = 0;
        this.originTxn = originTxn;
        this.ttl = ttl || 30;
        this.powData = js_sha512_1.sha512.arrayBuffer(this.originTxn);
    }
    LeadingZeroBits(x) {
        let binaryString = x.toString(2);
        let number = 0;
        while (binaryString.length < 64) {
            binaryString = '0' + binaryString;
            number++;
        }
        return number;
    }
    Set(denominator) {
        let num = BigInt('0x8000000000000000') / BigInt(denominator.toFixed(0));
        const shift = this.LeadingZeroBits(num);
        num = BigInt(num) << BigInt(shift);
        const exp = this.hashSize * 8 - 63 - shift;
        const bytes = Math.floor(exp / 8);
        const residue = exp % 8;
        if (residue) {
            this.nonZeroBytes = bytes + 1;
            num >>= BigInt(8) - BigInt(residue);
        }
        else {
            this.nonZeroBytes = bytes;
        }
        this.targetNum = num >> BigInt(32);
        this.nonZeroBytes += 8;
    }
    IsFulfilled(sha256Buffer) {
        const end = this.hashSize;
        const start = this.nonZeroBytes;
        if (this.targetNum <= new DataView(sha256Buffer).getUint32(start - 4, true)) {
            return false;
        }
        for (let i = start; i < end; i++) {
            // console.log(i, sha256Buffer, new DataView(sha256Buffer), 'get nonce')
            const target = new DataView(sha256Buffer).getInt8(i);
            // console.log(target, 'target')
            if (target !== 0) {
                return false;
            }
        }
        return true;
    }
    getNonce() {
        // set diffculty
        this.Set((1000 + (this.originTxn.byteLength + NONCE_LEN) * (this.ttl * 10 + 100)) / 3);
        // loop nonce
        const nonces = [];
        let nonce = 0;
        for (let i = 0; i < 3; i++) {
            while (true) {
                const cloneData = new DataView(this.powData);
                // 64[origin] - 4[nonce]
                cloneData.setUint32(60, nonce, true);
                const powDataWithNonce = js_sha256_1.sha256.arrayBuffer(cloneData.buffer);
                if (this.IsFulfilled(powDataWithNonce)) {
                    nonces[i] = nonce;
                    break;
                }
                nonce++;
            }
            nonce++;
        }
        return nonces;
    }
    getHashMixinNonnce() {
        const nonces = this.getNonce();
        const finalBytes = new Uint8Array(this.originTxn.byteLength + NONCE_LEN);
        finalBytes.set(new Uint8Array(this.originTxn), 0);
        // add nonce to last
        nonces.forEach((nonce, i) => {
            finalBytes.set(new Uint8Array(new Uint32Array([nonce]).buffer), this.originTxn.byteLength + i * 4);
        });
        return finalBytes.buffer;
    }
}
exports.default = PowDifficulty;
//# sourceMappingURL=powDifficulty.js.map