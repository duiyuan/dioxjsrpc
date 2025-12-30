interface IPowDifficulty {
    originTxn: ArrayBuffer;
    hashSize?: number;
    ttl?: number;
}
declare class PowDifficulty {
    hashSize: number;
    targetNum: bigint;
    nonZeroBytes: number;
    originTxn: ArrayBuffer;
    powData: ArrayBuffer;
    ttl: number;
    constructor({ originTxn, hashSize, ttl }: IPowDifficulty);
    LeadingZeroBits(x: bigint): number;
    Set(denominator: number): void;
    IsFulfilled(sha256Buffer: ArrayBuffer): boolean;
    getNonce(): number[];
    getHashMixinNonnce(): ArrayBuffer;
}
export default PowDifficulty;
//# sourceMappingURL=powDifficulty.d.ts.map