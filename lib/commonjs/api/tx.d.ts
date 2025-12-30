/**
 * @description tx module: transaction module, compose, sign, send, sendWithSK on chain
 * @description rpc module: rpc call module, call rpc api
 */
import Request from './request';
export default class Tx extends Request {
    getRpcUrl(func: string): string;
    compose(params: {
        function: string;
        args?: Record<string, any>;
        sender?: string;
        delegatee?: string;
        gasprice?: number;
        ttl?: number;
        sigcount?: number;
        tokens?: Record<string, string>[];
        gaslimit?: number;
        isn?: string;
    }): Promise<{
        TxData: string;
        GasOffered: number;
    }>;
    sign(params: {
        sk: string[];
        txdata: string;
    }): Promise<{
        TxData: string;
    }>;
    send(params: {
        txdata: string;
    }): Promise<{
        Hash: string;
    }>;
    sendWithSK(params: {
        privatekey: string;
        function: string;
        args?: Record<string, any>;
        delegatee?: string;
        tokens?: Record<string, any>[];
    }): Promise<{
        Hash: string;
    }>;
}
