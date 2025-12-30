import Request from './request';
import { DIOX } from './type';
export declare function getComposeUrl(): string;
export declare function getLimitUrl(): string;
export declare function getSendUrl(): string;
export interface ExcutedTxCond {
    height: number;
    limit?: number;
    pos?: number;
}
declare class TransactionService extends Request {
    compose(body: string): Promise<{
        err?: number;
        rsp: string;
        ret: {
            TxData: string;
            GasOffered: number;
        };
    }>;
    sendTransaction(body: string): Promise<{
        err?: number;
        rsp: string;
        ret: {
            Hash: string;
            Shard: number;
        };
    }>;
    getTransactionByHash(hash: string): Promise<DIOX.TxDetail>;
    getDepositTx(params: ExcutedTxCond): Promise<DIOX.DepositTxSum[]>;
}
export default TransactionService;
//# sourceMappingURL=transactions.d.ts.map