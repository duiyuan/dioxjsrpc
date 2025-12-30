export interface IaddressDetails {
    currency: string;
    address: Uint8Array;
    encryptMethod: string;
    encryptMethodOrderNumber: number;
    salt: number;
    alias?: string;
}
export declare function generateAddress(shardIndex?: number): Promise<{
    address: string;
    seed: Uint8Array<ArrayBufferLike>;
}>;
export declare function pk2Address(publicKey: Uint8Array, rollingCRC?: number, encryptMethod?: number, salt?: number, alias?: string): IaddressDetails;
export declare function seed2PairOfKey(seed: Uint8Array, salt?: Uint8Array): Promise<Uint8Array<ArrayBuffer>[] | undefined>;
export declare function encodeAddressBuffer(address: Uint8Array): string;
