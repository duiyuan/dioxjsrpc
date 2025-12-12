/**
 * Shard information
 */
export interface ShardInfo {
  Throughput: number
  TxnCount: number[]
  MempoolSize: number
  TotalStateSize: number
}

/**
 * Global shard information
 */
export type GlobalInfo = ShardInfo

/**
 * Overview response type
 */
export interface OverviewResponse {
  VersionName: string
  DeployName: string
  ChainVersion: number
  Time: number
  BlockTime: number
  ShardOrder: number
  ShardOnDuty: number[]
  BlackListSize: number
  ScalingOut: boolean
  Rebase: boolean
  BlockFallBehind: number
  BaseHeight: number
  HeadHash: string
  HeadHeight: number
  HeadBlockOutWeight: number
  FinalizedBlock: [string, number]
  ArchivedHeight: [string, number]
  AvgGasPrice: string
  TxnCount: [number, number, number, number, number, number]
  IdAllocated?: [number, number]
  Throughput?: number
  HeadOutWeight?: number
  BlockInterval?: number
  HashRate?: number
  ForkRate?: number
  FinalityDistance?: number
  Difficulty?: number
  Global?: GlobalInfo
  Shards?: ShardInfo[]
}

export interface CommittedHeadHeightResponse {
  HeadHeight: number
  HeadHash: string
}

export interface ShardInfoResponse {
  ShardIndex: number
  Height: number
  SnapshotHeight: number
  BlockInMem: number
  ResidentTxn: number
  PendingTxn: number
  RequestingTxn: number
  StateSize: number
  AccumTxnCount: number[]
}

/**
 * Mempool transaction
 */
export interface MempoolTransaction {
  /** Transaction ID */
  TXID: string
  /** Transaction state */
  State: string
}

/**
 * Mempool response when no shard_index is specified
 * Contains transactions grouped by shard ("g" for global, numbers for shards)
 */
export type MempoolAllShardsResponse = {
  [shardIndex: string]: MempoolTransaction[]
}

/**
 * Mempool response when shard_index is specified
 * Returns array of transactions for that specific shard
 */
export type MempoolSingleShardResponse = MempoolTransaction[]

/**
 * Mempool response - can be either all shards or single shard
 */
export type MempoolResponse = MempoolAllShardsResponse | MempoolSingleShardResponse

/**
 * Contract state commit information
 */
export interface ContractStateCommit {
  Height: number
  Proof: number
  Shard: number[]
}

/**
 * Contract state response
 */
export interface ContractStateResponse {
  Size: number
  Contract: string
  State: Record<string, any>
  BuildNum: string
  Commit: ContractStateCommit
}

/**
 * Consensus header block information
 */
export interface ConsensusHeaderBlock {
  Size: number
  Version: number
  Prev: string
  Height: number
  ShardOrder: number
  Timestamp: number
  ScheduledTxnCount: number
  UserInitiatedTxnCount: number
  IntraRelayTxnCount: number
  InboundRelayTxnCount: number
  OutboundRelayTxnCount: number
  DeferredRelayTxnCount: number
  ShardBlockMerkle: string
  ShardChainStateMerkle: string
  ShardProcessedTxnMerkle: string
  ShardOutboundRelayMerkle: string
  GlobalBlockMerkleLeaf: string
  GlobalChainStateMerkle: string
  GlobalProcessedTxnMerkle: string
  Consensus: string
  Miner: string
  TotalGasFee: string
  AvgGasPrice: string
  ScalingNext: boolean
  SnapshotCarried: number
  Uncles: any[]
  PowTarget: [number, number]
  PowDifficulty: number
  PowNonce: string
  Hash: string
  BlockInterval: number
  Throughput: number
  ForkRate: number
  Stage: string
  DispatchedRelayTxnCount: number
  Reward: string
}

/**
 * Consensus header range query response
 */
export interface ConsensusHeaderRangeResponse {
  Start: number
  End: number
  Blocks: ConsensusHeaderBlock[]
}

/**
 * Consensus header response - single block or range
 */
export type ConsensusHeaderResponse = ConsensusHeaderBlock | ConsensusHeaderRangeResponse

/**
 * Transaction block transactions info
 */
export interface TransactionBlockTransactions {
  Scheduled: string[]
  Confirmed: string[]
  DispatchedRelays: string[]
  Deferred: string[]
}

/**
 * Transaction block information
 */
export interface TransactionBlock {
  Size: number
  Version: number
  Scope: string
  Shard: number[]
  Prev: string
  ScheduledTxnCount: number
  UserInitiatedTxnCount: number
  IntraRelayTxnCount: number
  InboundRelayTxnCount: number
  OutboundRelayTxnCount: number
  DeferredRelayTxnCount: number
  DispatchedRelayTxnCount: number
  ExecutionCount: number
  ConsensusHeaderHash: string
  BlockMerkleLeaf: string
  ConfirmedTxnHash: string
  ConfirmedTxnMerkle: string
  ProcessedTxnMerkle: string
  ChainStateMerkle: string
  TotalGasFee: string
  AvgGasPrice: string
  Hash: string
  Height: number
  Timestamp: number
  Miner: string
  State: string
  Transactions: TransactionBlockTransactions
}

/**
 * Transaction block range query response
 */
export interface TransactionBlockRangeResponse {
  Start: number
  End: number
  Blocks: TransactionBlock[]
}

/**
 * Transaction block response - single block or range
 */
export type TransactionBlockResponse = TransactionBlock | TransactionBlockRangeResponse

/**
 * Transaction runtime info
 */
export interface TransactionRuntime {
  Confirmed: string[]
}

/**
 * Transaction invocation info
 */
export interface TransactionInvocation {
  Status: string
  Return: [number, number]
  CoinDelta: string
  GasFee: string
  Relays: string[]
}

/**
 * Transaction response
 */
export interface TransactionResponse {
  Hash: string
  Runtime: TransactionRuntime
  BuildNum: number
  GasOffered: number
  GasPrice: string
  Grouped: boolean
  uTxnSize: number
  Mode: string
  OrigExecIdx: number
  Function: string
  Input: Record<string, any>
  Invocation: TransactionInvocation
  Stage: string
  Height: number
  Shard: number[]
  ConfirmedBy: string
  ConfirmState: string
}

/**
 * Dapp info response
 */
export interface DappInfoResponse {
  DAppID: string | number
  Address: string
}

/**
 * Generate key response
 */
export interface GenerateKeyResponse {
  PrivateKey: string
  PublicKey: string
  Address: string
  Shard: number | string
}

/**
 * Contract info response
 */
export interface ContractInfoResponse {
  ContractID: number
  ContractVersionID: number
  Functions: string[]
  InterfaceImplemented: string[]
}

/**
 * Token info response
 */
export interface TokenInfoResponse {
  Address: string
  TokenID: number
}
