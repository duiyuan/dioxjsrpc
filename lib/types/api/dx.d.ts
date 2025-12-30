/**
 * @description dx module: information query module, query chain information
 * @description rpc module: rpc call module, call rpc api
 */
import Request from './request';
import { CommittedHeadHeightResponse, ConsensusHeaderQueryType, ConsensusHeaderResponse, ContractInfoResponse, ContractStateResponse, DappInfoResponse, GenerateKeyResponse, MempoolResponse, OverviewResponse, ShardInfoResponse, TokenInfoResponse, TransactionBlockResponse, TransactionResponse, KeyAlgorithm } from './type';
declare class DxService extends Request {
    getRpcUrl(func: string): string;
    overview(): Promise<OverviewResponse>;
    committedHeadHeight(): Promise<CommittedHeadHeightResponse>;
    isMining(): Promise<{
        Mining: boolean;
    }>;
    shardInfo(shard_index: number | string): Promise<ShardInfoResponse>;
    /**
     * @param scope: global/shard/address/uint32/uint64/uint128/uint256/uint512, scope name
     * @param scope_key: string, scope key
     * @returns ShardIndex: uint16
     */
    shardIndex(scope: 'global' | 'shard' | 'address' | 'uint32' | 'uint64' | 'uint128' | 'uint256' | 'uint512', scope_key?: string): Promise<{
        ShardIndex: number;
    }>;
    mempool(shard_index?: string | number, archived?: string | number): Promise<MempoolResponse>;
    /**
     * @param contract_with_scope: name search: <dapp>.<contract>.<scope>; cid search: <cid>.<scope>
     * @param scope_key: string, scope key
     */
    contractState(contract_with_scope: string, scope_key: string): Promise<ContractStateResponse>;
    consensusHeader(params: {
        query_type: ConsensusHeaderQueryType;
        height?: number;
        hash?: string;
        start?: number;
        end?: number;
        runtime?: boolean;
    }): Promise<ConsensusHeaderResponse>;
    transactionBlock(params: {
        query_type: ConsensusHeaderQueryType;
        shard_index: string | number;
        height?: number;
        hash?: string;
        start?: number;
        end?: number;
        runtime?: boolean;
    }): Promise<TransactionBlockResponse>;
    transactionByHash(hash: string, shard_index?: number | string): Promise<TransactionResponse>;
    dappInfo(name: string): Promise<DappInfoResponse>;
    generateKey(shard_index?: string | number, algo?: KeyAlgorithm): Promise<GenerateKeyResponse>;
    isn(address: string): Promise<{
        ISN: number;
    }>;
    contractInfo(contract: string): Promise<ContractInfoResponse>;
    tokenInfo(symbol: string): Promise<TokenInfoResponse>;
    blockTime(height: number): Promise<{
        BlockMinedTime: number;
    }>;
}
export default DxService;
//# sourceMappingURL=dx.d.ts.map