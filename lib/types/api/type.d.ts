export declare namespace DIOX {
    interface MetaData {
        Description?: string;
        IconUrl?: string;
        Name?: string;
        Website?: string;
        Social?: {
            Github: string;
            Discord: string;
            Twitter: string;
            Telegram: string;
            Facebook: string;
            Email: string;
        };
    }
    interface TxSummary {
        Height: number;
        ShardIndex: number;
        ExecIndex: number;
        RelayGroupIndex: number;
        ShardOrder: number;
        BlockTime: number;
        TxnHash: string;
        TxnType: string;
        Initiator: string;
        Target: string;
        OriginalTxnHash: string;
        Invocation: Invocation;
        TxnTime: number;
        Func: string;
    }
    interface DepositTxSum {
        Address: string;
        TokenSymbol: string;
        AcType: string;
        TokenAmount: string;
        Height: number;
        ShardIndex: number;
        ExecIndex: number;
        RelayGroupIndex: number;
        ShardOrder: number;
        BlockTime: number;
        TxnHash: string;
        TxnType: string;
        Initiator: string;
        Target: string;
        OriginalTxnHash: string;
        IsFinalized: 1;
        Func: string;
        Contract: string;
        Invocation: {
            Input: {
                [key: string]: any;
            };
            GasFee: string;
            Return: [number, number];
            GasPrice: string;
            GasOffered: number;
        };
        Sort: number;
        TokenDecimals: number;
    }
    interface TxDetail {
        BlockTime: number;
        Height: number;
        Initiator: string;
        Address: string;
        BuildNum: number;
        ConfirmedBy: string;
        ConfirmState?: string;
        ExecStage: string;
        Function: string;
        GasOffered: number;
        GasPrice: string;
        Grouped: false;
        Hash: string;
        Packing?: string;
        Relays?: Array<TxDetail>;
        Input: {
            [key: string]: string | number;
        };
        Invocation: Invocation;
        Mode: string;
        OrigExecIdx: number;
        OrigTxHash: string;
        Shard: number[];
        Size: number;
        Signers?: string[];
        Timestamp: number;
        ISN?: number;
    }
    interface Block {
        Size: number;
        Scope: string;
        Throughput: number;
        Shard: [number, number];
        Prev: string;
        BlockInterval: number;
        Consensus: number;
        ScheduledTxnCount: number;
        UserInitiatedTxnCount: number;
        IntraRelayTxnCount: number;
        InboundRelayTxnCount: number;
        OutboundRelayTxnCount: number;
        DeferredRelayTxnCount: number;
        DispatchedRelayTxnCount: number;
        ExecutionCount: number;
        MasterBlock: string;
        BlockMerkleLeaf: string;
        ConfirmedTxnHash: string;
        ConfirmedTxnMerkle: string;
        ConsensusHeaderHash?: string;
        ProcessedTxnMerkle: string;
        ChainStateMerkle: string;
        GlobalChainStateMerkle: string;
        GlobalProcessedTxnMerkle: string;
        GlobalTxnBlockMerkleLeaf: string;
        ShardOutboundRelayMerkle: string;
        ShardProcessedTxnMerkle: string;
        ShardTxnBlockMerkle: string;
        ShardOrder?: number;
        TotalGasFee: string;
        AvgGasPrice: string;
        Hash: string;
        Height: number;
        Timestamp: number;
        Miner: string;
        Stage: string;
        State: string;
        PowDifficulty: number;
        PowNonce: string;
        ScalingNext: boolean;
        Uncles: string[];
        Transactions: {
            Scheduled: string[];
            Confirmed: string[];
            DispatchRelays: string[];
            Deferred: string[];
        };
        Snapshot?: string;
    }
    interface Invocation {
        Return: [number, number];
        Input: {
            Reward: string;
            Amount: string;
            To: string;
            [key: string]: any;
        };
        GasOffered?: string;
        GasPrice?: string;
        GasFee?: string;
        TokenSupply?: string[];
    }
    interface ExcutedTx {
        Height: number;
        BlockTime: number;
        Initiator: string;
        Target: string;
        IsFinalized: number | undefined;
        OriginalTxnHash: string;
        Invocation: Invocation;
        Func: string;
        Contract: string;
        TxnHash: string;
        TxnStatus: string;
        RelayReturn: string;
        TokenSymbol?: string;
        TokenInitial?: string;
        TokenDecimals?: number;
        RelayGroupIndex: number;
        TokenAmount?: string;
    }
    interface BlockResp {
        TotalNum: number;
        ListData: ExcutedTx[];
    }
    interface Address {
        Symbol?: string;
        Delegator?: string;
        TotalSupply?: string;
        ID?: number;
        Flags?: number;
        Metadata?: MetaData;
        Address?: string;
        Balance?: string;
        Height?: number;
        Name?: string;
        Hash?: string;
        Wallet?: {
            [id: string]: string | number;
        }[];
        Definition?: {
            hash: string;
            name: string;
            series: number;
        };
    }
    interface ChainStatus {
        BlockInterval: number;
        ForkRate: number;
        TotalBlocks: number;
        Difficulty: number;
        AvgGasPrice: number;
        ShardOrder: number;
        Throughput: number;
        TotalTxn: number;
        TotalStateSize: number;
        MempoolSize: number;
        AddressCount: number;
        Height: number;
        DeployName: string;
        ChainVersion: number;
        NumShards: number;
    }
}
export interface OriginalTxn {
    gasprice?: string | number;
    sender: string;
    function: string;
    args: KeyValue;
    delegatee?: string | number;
    gaslimit?: string | number;
    tokens?: {
        [key: string]: string;
    }[];
    ttl?: number;
    scale?: number;
}
export interface AddrBalance {
    Address: string;
    Height: number;
    State: {
        Balance: string;
    };
    Wallet: {
        symbol: string;
        amount: string;
    }[];
}
export interface TxDetailResponse {
    Hash: string;
    Content: DIOX.TxDetail;
}
export type DioxScanTxResponse = CommonResponse<{
    TotalNum: number;
    ListData: DIOX.TxSummary[];
}>;
export interface TokenItem {
    Address?: string;
    TokenID: number;
    Amount?: string;
    Symbol: string;
    Height?: number;
    FutureMint?: number;
    Decimals: number;
    Balance?: number | string;
    Wallet?: {
        symbol: string;
        amount: string;
    }[];
    IconUrl?: string;
    Metadata?: DIOX.MetaData;
}
export interface AddrBaseInfo {
    Address: string;
    State: {
        Metadata: DIOX.MetaData;
    };
}
export interface Blocks {
    TotalNum: number;
    TxType: string;
    ListData: DIOX.Block[];
}
export type DioxScanChainBasicInfo = CommonResponse<DIOX.ChainStatus>;
export type Override = CommonResponse<{
    Address: string;
    Height: number;
    NextISN: number;
}>;
/**
 * dx module: information query module, query chain information
 */
/**
 * Shard information
 */
export interface ShardInfo {
    Throughput: number;
    TxnCount: number[];
    MempoolSize: number;
    TotalStateSize: number;
}
/**
 * Global shard information
 */
export type GlobalInfo = ShardInfo;
/**
 * Overview response type
 */
export interface OverviewResponse {
    VersionName: string;
    DeployName: string;
    ChainVersion: number;
    Time: number;
    BlockTime: number;
    ShardOrder: number;
    ShardOnDuty: number[];
    BlackListSize: number;
    ScalingOut: boolean;
    Rebase: boolean;
    BlockFallBehind: number;
    BaseHeight: number;
    HeadHash: string;
    HeadHeight: number;
    HeadBlockOutWeight: number;
    FinalizedBlock: [string, number];
    ArchivedHeight: [string, number];
    AvgGasPrice: string;
    TxnCount: [number, number, number, number, number, number];
    IdAllocated?: [number, number];
    Throughput?: number;
    HeadOutWeight?: number;
    BlockInterval?: number;
    HashRate?: number;
    ForkRate?: number;
    FinalityDistance?: number;
    Difficulty?: number;
    Global?: GlobalInfo;
    Shards?: ShardInfo[];
}
export interface CommittedHeadHeightResponse {
    HeadHeight: number;
    HeadHash: string;
}
export interface ShardInfoResponse {
    ShardIndex: number;
    Height: number;
    SnapshotHeight: number;
    BlockInMem: number;
    ResidentTxn: number;
    PendingTxn: number;
    RequestingTxn: number;
    StateSize: number;
    AccumTxnCount: number[];
}
/**
 * Mempool transaction
 */
export interface MempoolTransaction {
    /** Transaction ID */
    TXID: string;
    /** Transaction state */
    State: string;
}
/**
 * Mempool response when no shard_index is specified
 * Contains transactions grouped by shard ("g" for global, numbers for shards)
 */
export type MempoolAllShardsResponse = {
    [shardIndex: string]: MempoolTransaction[];
};
/**
 * Mempool response when shard_index is specified
 * Returns array of transactions for that specific shard
 */
export type MempoolSingleShardResponse = MempoolTransaction[];
/**
 * Mempool response - can be either all shards or single shard
 */
export type MempoolResponse = MempoolAllShardsResponse | MempoolSingleShardResponse;
/**
 * Contract state commit information
 */
export interface ContractStateCommit {
    Height: number;
    Proof: number;
    Shard: number[];
}
/**
 * Contract state response
 */
export interface ContractStateResponse {
    Size: number;
    Contract: string;
    State: Record<string, any>;
    BuildNum: string;
    Commit: ContractStateCommit;
}
/**
 * Consensus header block information
 */
export interface ConsensusHeaderBlock {
    Size: number;
    Version: number;
    Prev: string;
    Height: number;
    ShardOrder: number;
    Timestamp: number;
    ScheduledTxnCount: number;
    UserInitiatedTxnCount: number;
    IntraRelayTxnCount: number;
    InboundRelayTxnCount: number;
    OutboundRelayTxnCount: number;
    DeferredRelayTxnCount: number;
    ShardBlockMerkle: string;
    ShardChainStateMerkle: string;
    ShardProcessedTxnMerkle: string;
    ShardOutboundRelayMerkle: string;
    GlobalBlockMerkleLeaf: string;
    GlobalChainStateMerkle: string;
    GlobalProcessedTxnMerkle: string;
    Consensus: string;
    Miner: string;
    TotalGasFee: string;
    AvgGasPrice: string;
    ScalingNext: boolean;
    SnapshotCarried: number;
    Uncles: any[];
    PowTarget: [number, number];
    PowDifficulty: number;
    PowNonce: string;
    Hash: string;
    BlockInterval: number;
    Throughput: number;
    ForkRate: number;
    Stage: string;
    DispatchedRelayTxnCount: number;
    Reward: string;
}
/**
 * Consensus header range query response
 */
export interface ConsensusHeaderRangeResponse {
    Start: number;
    End: number;
    Blocks: ConsensusHeaderBlock[];
}
/**
 * Consensus header response - single block or range
 */
export type ConsensusHeaderResponse = ConsensusHeaderBlock | ConsensusHeaderRangeResponse;
/**
 * Transaction block transactions info
 */
export interface TransactionBlockTransactions {
    Scheduled: string[];
    Confirmed: string[];
    DispatchedRelays: string[];
    Deferred: string[];
}
/**
 * Transaction block information
 */
export interface TransactionBlock {
    Size: number;
    Version: number;
    Scope: string;
    Shard: number[];
    Prev: string;
    ScheduledTxnCount: number;
    UserInitiatedTxnCount: number;
    IntraRelayTxnCount: number;
    InboundRelayTxnCount: number;
    OutboundRelayTxnCount: number;
    DeferredRelayTxnCount: number;
    DispatchedRelayTxnCount: number;
    ExecutionCount: number;
    ConsensusHeaderHash: string;
    BlockMerkleLeaf: string;
    ConfirmedTxnHash: string;
    ConfirmedTxnMerkle: string;
    ProcessedTxnMerkle: string;
    ChainStateMerkle: string;
    TotalGasFee: string;
    AvgGasPrice: string;
    Hash: string;
    Height: number;
    Timestamp: number;
    Miner: string;
    State: string;
    Transactions: TransactionBlockTransactions;
}
/**
 * Transaction block range query response
 */
export interface TransactionBlockRangeResponse {
    Start: number;
    End: number;
    Blocks: TransactionBlock[];
}
/**
 * Transaction block response - single block or range
 */
export type TransactionBlockResponse = TransactionBlock | TransactionBlockRangeResponse;
/**
 * Transaction runtime info
 */
export interface TransactionRuntime {
    Confirmed: string[];
}
/**
 * Transaction invocation info
 */
export interface TransactionInvocation {
    Status: string;
    Return: [number, number];
    CoinDelta: string;
    GasFee: string;
    Relays: string[];
}
/**
 * Transaction response
 */
export interface TransactionResponse {
    Hash: string;
    Runtime: TransactionRuntime;
    BuildNum: number;
    GasOffered: number;
    GasPrice: string;
    Grouped: boolean;
    uTxnSize: number;
    Mode: string;
    OrigExecIdx: number;
    Function: string;
    Input: Record<string, any>;
    Invocation: TransactionInvocation;
    Stage: string;
    Height: number;
    Shard: number[];
    ConfirmedBy: string;
    ConfirmState: string;
}
/**
 * Dapp info response
 */
export interface DappInfoResponse {
    DAppID: string | number;
    Address: string;
}
/**
 * Generate key response
 */
export interface GenerateKeyResponse {
    PrivateKey: string;
    PublicKey: string;
    Address: string;
    Shard: number | string;
}
/**
 * Contract info response
 */
export interface ContractInfoResponse {
    ContractID: number;
    ContractVersionID: number;
    Functions: string[];
    InterfaceImplemented: string[];
}
/**
 * Token info response
 */
export interface TokenInfoResponse {
    Address: string;
    TokenID: number;
}
export declare enum ConsensusHeaderQueryType {
    HEIGHT = 0,
    HASH = 1,
    RANGE = 2
}
export declare enum KeyAlgorithm {
    ED25519 = 0,
    ETHEREUM = 1,
    SM2 = 2
}
//# sourceMappingURL=type.d.ts.map