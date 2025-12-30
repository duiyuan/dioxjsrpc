import { AxiosRequestConfig } from 'axios'
import Request from './request'
import type {
  OverviewResponse,
  GlobalInfo,
  ShardInfo,
  CommittedHeadHeightResponse,
  ShardInfoResponse,
  MempoolResponse,
  ContractStateResponse,
  ConsensusHeaderResponse,
  TransactionBlockResponse,
  TransactionResponse,
  DappInfoResponse,
  GenerateKeyResponse,
  ContractInfoResponse,
  TokenInfoResponse,
} from '../types/dx'

export interface ApiResponse<T> {
  rsp: string
  err?: number
  ret: T
}

class DxService extends Request {
  private path: string

  constructor(opts: { path: string; apiKey?: string }) {
    super(opts)
    this.path = opts.path
  }

  async call<T = any>(func: string, params: any = {}, opts: AxiosRequestConfig = {}): Promise<ApiResponse<T>> {
    return this.rest(`${this.path}/api?req=${func}`, params, opts)
  }

  async overview(): Promise<ApiResponse<OverviewResponse>> {
    const resp = await this.call<OverviewResponse>('dx.overview')
    return resp
  }

  async committedHeadHeight(): Promise<ApiResponse<CommittedHeadHeightResponse>> {
    const resp = await this.call<CommittedHeadHeightResponse>('dx.committed_head_height')
    return resp
  }
  async isMining(): Promise<ApiResponse<{ Mining: boolean }>> {
    const resp = await this.call<{ Mining: boolean }>('dx.mining')
    return resp
  }

  async shardInfo(shard_index: number | string): Promise<ApiResponse<ShardInfoResponse>> {
    const resp = await this.call<ShardInfoResponse>('dx.shard_info', { shard_index })
    return resp
  }

  /**
   * @param scope: global/shard/address/uint32/uint64/uint128/uint256/uint512, scope name
   * @param scope_key: string, scope key
   * @returns ShardIndex: uint16
   */
  async shardIndex(
    scope: 'global' | 'shard' | 'address' | 'uint32' | 'uint64' | 'uint128' | 'uint256' | 'uint512',
    scope_key?: string,
  ): Promise<ApiResponse<{ ShardIndex: number }>> {
    const resp = await this.call<{ ShardIndex: number }>('dx.shard_index', { scope, scope_key })
    return resp
  }

  async mempool(shard_index?: string | number, archived?: string | number): Promise<ApiResponse<MempoolResponse>> {
    const resp = await this.call<MempoolResponse>('dx.mempool', { shard_index, archived })
    return resp
  }

  /**
   * @param contract_with_scope: name search: <dapp>.<contract>.<scope>; cid search: <cid>.<scope>
   * @param scope_key: string, scope key
   */
  async contractState(contract_with_scope: string, scope_key: string): Promise<ApiResponse<ContractStateResponse>> {
    const resp = await this.call<ContractStateResponse>('dx.contract_state', { contract_with_scope, scope_key })
    return resp
  }

  async consensusHeader(params: {
    query_type: 0 | 1 | 2
    height?: number
    hash?: string
    start?: number
    end?: number
    runtime?: boolean
  }): Promise<ApiResponse<ConsensusHeaderResponse>> {
    const resp = await this.call<ConsensusHeaderResponse>('dx.consensus_header', params)
    return resp
  }

  async transactionBlock(params: {
    query_type: 0 | 1 | 2
    shard_index: string | number
    height?: number
    hash?: string
    start?: number
    end?: number
    runtime?: boolean
  }): Promise<ApiResponse<TransactionBlockResponse>> {
    const resp = await this.call<TransactionBlockResponse>('dx.transaction_block', params)
    return resp
  }

  async transactionByHash(hash: string, shard_index?: number | string): Promise<ApiResponse<TransactionResponse>> {
    const resp = await this.call<TransactionResponse>('dx.transaction', { hash, shard_index })
    return resp
  }

  async dappInfo(name: string): Promise<ApiResponse<DappInfoResponse>> {
    const resp = await this.call<DappInfoResponse>('dx.dapp', { name })
    return resp
  }

  async generateKey(shard_index?: string | number, algo?: number): Promise<ApiResponse<GenerateKeyResponse>> {
    const resp = await this.call<GenerateKeyResponse>('dx.generate_key', { shard_index, algo })
    return resp
  }

  async isn(address: string): Promise<ApiResponse<{ ISN: number }>> {
    const resp = await this.call<{ ISN: number }>('dx.isn', { address })
    return resp
  }

  async contractInfo(contract: string): Promise<ApiResponse<ContractInfoResponse>> {
    const resp = await this.call<ContractInfoResponse>('dx.contract_info', { contract })
    return resp
  }

  async tokenInfo(symbol: string): Promise<ApiResponse<TokenInfoResponse>> {
    const resp = await this.call<TokenInfoResponse>('dx.token', { symbol })
    return resp
  }

  async blockTime(height: number): Promise<ApiResponse<{ BlockMinedTime: number }>> {
    const resp = await this.call<{ BlockMinedTime: number }>('dx.block_time', { height })
    return resp
  }
}

export default DxService
export type { OverviewResponse, GlobalInfo, ShardInfo }
