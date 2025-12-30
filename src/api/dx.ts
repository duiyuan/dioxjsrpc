/**
 * @description dx module: information query module, query chain information
 * @description rpc module: rpc call module, call rpc api
 */

import json from 'json-bigint'
import { shakeKeyValue } from '../utils'
import provider from './provider'
import Request from './request'
import {
  CommittedHeadHeightResponse,
  ConsensusHeaderQueryType,
  ConsensusHeaderResponse,
  ContractInfoResponse,
  ContractStateResponse,
  DappInfoResponse,
  GenerateKeyResponse,
  MempoolResponse,
  OverviewResponse,
  ShardInfoResponse,
  TokenInfoResponse,
  TransactionBlockResponse,
  TransactionResponse,
  KeyAlgorithm,
} from './type'

class DxService extends Request {
  getRpcUrl(func: string) {
    const { rpc } = provider.get()
    const encodeUri = encodeURI(rpc + '/api?req=' + func)

    return encodeUri
  }

  async overview(): Promise<OverviewResponse> {
    const rpcUrl = this.getRpcUrl('dx.overview')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: OverviewResponse
    }>(rpcUrl, {})

    return this.handleResponse(resp)
  }

  async committedHeadHeight(): Promise<CommittedHeadHeightResponse> {
    const rpcUrl = this.getRpcUrl('dx.committed_head_height')
    const resp = await this.get<{
      err?: number
      rsp: string
      ret: CommittedHeadHeightResponse
    }>(rpcUrl, {})

    return this.handleResponse(resp)
  }

  async isMining(): Promise<{ Mining: boolean }> {
    const rpcUrl = this.getRpcUrl('dx.mining')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: { Mining: boolean }
    }>(rpcUrl, {})

    return this.handleResponse(resp)
  }

  async shardInfo(shard_index: number | string): Promise<ShardInfoResponse> {
    const rpcUrl = this.getRpcUrl('dx.shard_info')

    const resp = await this.post<{
      err?: number
      rsp: string
      ret: ShardInfoResponse
    }>(rpcUrl, { body: json.stringify({ shard_index }) })

    return this.handleResponse(resp)
  }

  /**
   * @param scope: global/shard/address/uint32/uint64/uint128/uint256/uint512, scope name
   * @param scope_key: string, scope key
   * @returns ShardIndex: uint16
   */
  async shardIndex(
    scope: 'global' | 'shard' | 'address' | 'uint32' | 'uint64' | 'uint128' | 'uint256' | 'uint512',
    scope_key?: string,
  ): Promise<{ ShardIndex: number }> {
    const rpcUrl = this.getRpcUrl('dx.shard_index')

    const resp = await this.post<{
      err?: number
      rsp: string
      ret: { ShardIndex: number }
    }>(rpcUrl, { body: json.stringify({ scope, scope_key }) })

    return this.handleResponse(resp)
  }

  async mempool(shard_index?: string | number, archived?: string | number): Promise<MempoolResponse> {
    const rpcUrl = this.getRpcUrl('dx.mempool')

    const resp = await this.post<{
      err?: number
      rsp: string
      ret: MempoolResponse
    }>(rpcUrl, { body: json.stringify({ shard_index, archived }) })

    return this.handleResponse(resp)
  }

  /**
   * @param contract_with_scope: name search: <dapp>.<contract>.<scope>; cid search: <cid>.<scope>
   * @param scope_key: string, scope key
   */
  async contractState(contract_with_scope: string, scope_key: string): Promise<ContractStateResponse> {
    const rpcUrl = this.getRpcUrl('dx.contract_state')

    const resp = await this.post<{
      err?: number
      rsp: string
      ret: ContractStateResponse
    }>(rpcUrl, { body: json.stringify({ contract_with_scope, scope_key }) })

    return this.handleResponse(resp)
  }

  async consensusHeader(params: {
    query_type: ConsensusHeaderQueryType
    height?: number
    hash?: string
    start?: number
    end?: number
    runtime?: boolean
  }): Promise<ConsensusHeaderResponse> {
    const rpcUrl = this.getRpcUrl('dx.consensus_header')

    const resp = await this.post<{
      err?: number
      rsp: string
      ret: ConsensusHeaderResponse
    }>(rpcUrl, { body: json.stringify(params) })

    return this.handleResponse(resp)
  }

  async transactionBlock(params: {
    query_type: ConsensusHeaderQueryType
    shard_index: string | number
    height?: number
    hash?: string
    start?: number
    end?: number
    runtime?: boolean
  }): Promise<TransactionBlockResponse> {
    const rpcUrl = this.getRpcUrl('dx.transaction_block')

    const resp = await this.post<{
      err?: number
      rsp: string
      ret: TransactionBlockResponse
    }>(rpcUrl, { body: json.stringify(params) })

    return this.handleResponse(resp)
  }

  async transactionByHash(hash: string, shard_index?: number | string): Promise<TransactionResponse> {
    const rpcUrl = this.getRpcUrl('dx.transaction')

    const resp = await this.post<{
      err?: number
      rsp: string
      ret: TransactionResponse
    }>(rpcUrl, { body: json.stringify({ hash, shard_index }) })

    return this.handleResponse(resp)
  }

  async dappInfo(name: string): Promise<DappInfoResponse> {
    const rpcUrl = this.getRpcUrl('dx.dapp')

    const resp = await this.post<{
      err?: number
      rsp: string
      ret: DappInfoResponse
    }>(rpcUrl, { body: json.stringify({ name }) })

    return this.handleResponse(resp)
  }

  async generateKey(shard_index?: string | number, algo?: KeyAlgorithm): Promise<GenerateKeyResponse> {
    const rpcUrl = this.getRpcUrl('dx.generate_key')

    const params = shakeKeyValue({ shard_index, algo }) as KeyValue<any>

    if (Object.keys(params).length > 0) {
      const resp = await this.post<{
        err?: number
        rsp: string
        ret: GenerateKeyResponse
      }>(rpcUrl, { body: json.stringify(params) })
      return this.handleResponse(resp)
    } else {
      const resp = await this.get<{
        err?: number
        rsp: string
        ret: GenerateKeyResponse
      }>(rpcUrl, {})
      return this.handleResponse(resp)
    }
  }

  async isn(address: string): Promise<{ ISN: number }> {
    const rpcUrl = this.getRpcUrl('dx.isn')

    const resp = await this.post<{
      err?: number
      rsp: string
      ret: { ISN: number }
    }>(rpcUrl, { body: json.stringify({ address }) })

    return this.handleResponse(resp)
  }

  async contractInfo(contract: string): Promise<ContractInfoResponse> {
    const rpcUrl = this.getRpcUrl('dx.contract_info')

    const resp = await this.post<{
      err?: number
      rsp: string
      ret: ContractInfoResponse
    }>(rpcUrl, { body: json.stringify({ contract }) })

    return this.handleResponse(resp)
  }

  async tokenInfo(symbol: string): Promise<TokenInfoResponse> {
    const rpcUrl = this.getRpcUrl('dx.token')

    const resp = await this.post<{
      err?: number
      rsp: string
      ret: TokenInfoResponse
    }>(rpcUrl, { body: json.stringify({ symbol }) })

    return this.handleResponse(resp)
  }

  async blockTime(height: number): Promise<{ BlockMinedTime: number }> {
    const rpcUrl = this.getRpcUrl('dx.block_time')

    const resp = await this.post<{
      err?: number
      rsp: string
      ret: { BlockMinedTime: number }
    }>(rpcUrl, { body: json.stringify({ height }) })

    return this.handleResponse(resp)
  }
}

export default DxService
