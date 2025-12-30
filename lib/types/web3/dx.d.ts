/**
 * @description dx module: information query module, query chain information
 * @description rpc module: rpc call module, call rpc api
 */
import Request from '../api/request';
import DxService from '../api/dx';
import { ConsensusHeaderQueryType, KeyAlgorithm } from '../api/type';
export default class Dx extends Request {
    dxSvc: DxService;
    constructor();
    overview(): Promise<import("../api/type").OverviewResponse>;
    getCommittedHeadHeight(): Promise<import("../api/type").CommittedHeadHeightResponse>;
    isMining(): Promise<{
        Mining: boolean;
    }>;
    getShardInfo(shard_index: number | string): Promise<import("../api/type").ShardInfoResponse>;
    getShardIndexByScope(scope: 'global' | 'shard' | 'address' | 'uint32' | 'uint64' | 'uint128' | 'uint256' | 'uint512', scope_key?: string): Promise<{
        ShardIndex: number;
    }>;
    getMempool(shard_index?: string | number, archived?: string | number): Promise<import("../api/type").MempoolResponse>;
    getContractState(contract_with_scope: string, scope_key: string): Promise<import("../api/type").ContractStateResponse>;
    getConsensusHeader(params: {
        query_type: ConsensusHeaderQueryType;
        height?: number;
        hash?: string;
        start?: number;
        end?: number;
        runtime?: boolean;
    }): Promise<import("../api/type").ConsensusHeaderResponse>;
    getTransactionBlock(params: {
        query_type: ConsensusHeaderQueryType;
        shard_index: string | number;
        height?: number;
        hash?: string;
        start?: number;
        end?: number;
        runtime?: boolean;
    }): Promise<import("../api/type").TransactionBlockResponse>;
    getTransactionByHash(hash: string, shard_index?: number | string): Promise<import("../api/type").TransactionResponse>;
    getDappInfo(name: string): Promise<import("../api/type").DappInfoResponse>;
    /**
     * Generate key pair
     * @param shard_index Optional. Shard index
     * @param algo Optional. Key algorithm: 0 = ed25519, 1 = ethereum, 2 = sm2
     */
    generateKey(shard_index?: string | number, algo?: KeyAlgorithm): Promise<import("../api/type").GenerateKeyResponse>;
    getISNByAddress(address: string): Promise<{
        ISN: number;
    }>;
    getContractInfo(contract: string): Promise<import("../api/type").ContractInfoResponse>;
    getTokenInfo(symbol: string): Promise<import("../api/type").TokenInfoResponse>;
    getBlockTime(height: number): Promise<{
        BlockMinedTime: number;
    }>;
}
//# sourceMappingURL=dx.d.ts.map