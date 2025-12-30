import Request from './request';
import { AddrBaseInfo, DIOX, TokenItem } from './type';
type ListParmas = {
    address?: string;
    addresstxntype?: string;
    shardIndex?: string;
    height?: number;
    pos?: number;
    limit?: number;
};
export declare function getISNUrl(): string;
export declare function getRefundUrl(): string;
export declare function getResidualUrl(): string;
declare class AddressService extends Request {
    private checkAddress;
    getISN(address: string): Promise<number>;
    getTxnListByAddress(params?: ListParmas): Promise<{
        TotalNum: number;
        ListData: DIOX.TxSummary[];
    }>;
    getAddressInfo(address: string): Promise<AddrBaseInfo | {}>;
    getDetailInfo(address: string): Promise<CommonResponse<DIOX.Address>>;
    getBalance(address: string): Promise<string>;
    getAddressTokens(address: string): Promise<TokenItem[]>;
    getAddressTokenBalance(address: string, token: string): Promise<string>;
}
export default AddressService;
//# sourceMappingURL=address.d.ts.map