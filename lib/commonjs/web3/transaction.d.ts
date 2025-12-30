import { ExcutedTxCond } from '../api/transactions';
import { OriginalTxn } from '../api/type';
declare class Transaction {
    private txnServices;
    private overViewServices;
    constructor();
    getTxn(hash: string): Promise<import("../api/type").DIOX.TxDetail>;
    private compose;
    sign(originalTxn: OriginalTxn, secretKey: Uint8Array): Promise<{
        rawTxData: string;
        hash: string;
    }>;
    send(originTxn: OriginalTxn, secretKey: Uint8Array): Promise<string>;
    sendRawTx(rawTxData: string): Promise<string>;
    private insertPK;
    getEstimatedFee(originTxn: OriginalTxn): Promise<string | number | bigint>;
    calculateGasFee(options: {
        average: number;
        scale: number;
        gasLimit: number;
    }): number | string | bigint;
    getDepositTxByBlock(params: ExcutedTxCond): Promise<import("../api/type").DIOX.DepositTxSum[]>;
    transfer({ to, amount, secretKey, ttl }: {
        to: string;
        amount: string;
        secretKey: Uint8Array;
        ttl?: number;
    }): Promise<string>;
    transferFCA({ symbol, to, amount, secretKey, ttl, }: {
        symbol: string;
        to: string;
        amount: string;
        secretKey: Uint8Array;
        ttl?: number;
    }): Promise<string>;
    private sk2base32Address;
}
export { Transaction };
