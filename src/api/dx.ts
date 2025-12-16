/**
 * @description dx module: information query module, query chain information
 * @description rpc module: rpc call module, call rpc api
 */

import provider from './provider'
import Request from './request'
import {
  CommittedHeadHeightResponse,
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
} from './type'

class DxService extends Request {
  getRpcUrl(func: string) {
    const { rpc } = provider.get()
    const encodeUri = encodeURI(rpc + '/api?req=' + func)

    return encodeUri
  }

  async overview() {
    const rpcUrl = this.getRpcUrl('dx.overview')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: OverviewResponse
    }>(rpcUrl, {})

    return resp
  }

  async committedHeadHeight() {
    const rpcUrl = this.getRpcUrl('dx.committed_head_height')
    const resp = await this.get<{
      err?: number
      rsp: string
      ret: CommittedHeadHeightResponse
    }>(rpcUrl, {})

    return resp
  }
  async isMining() {
    const rpcUrl = this.getRpcUrl('dx.mining')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: { Mining: boolean }
    }>(rpcUrl, {})

    return resp
  }

  async shardInfo(shard_index: number | string) {
    const rpcUrl = this.getRpcUrl('dx.shard_info')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: ShardInfoResponse
    }>(rpcUrl, { data: { shard_index } })

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
  ) {
    const rpcUrl = this.getRpcUrl('dx.shard_index')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: { ShardIndex: number }
    }>(rpcUrl, { data: { scope, scope_key } })

    return resp
  }

  async mempool(shard_index?: string | number, archived?: string | number) {
    const rpcUrl = this.getRpcUrl('dx.mempool')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: MempoolResponse
    }>(rpcUrl, { data: { shard_index, archived } })

    return resp
  }

  /**
   * @param contract_with_scope: name search: <dapp>.<contract>.<scope>; cid search: <cid>.<scope>
   * @param scope_key: string, scope key
   */
  async contractState(contract_with_scope: string, scope_key: string) {
    const rpcUrl = this.getRpcUrl('dx.contract_state')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: ContractStateResponse
    }>(rpcUrl, { data: { contract_with_scope, scope_key } })

    return resp
  }

  async consensusHeader(params: {
    query_type: 0 | 1 | 2
    height?: number
    hash?: string
    start?: number
    end?: number
    runtime?: boolean
  }) {
    const rpcUrl = this.getRpcUrl('dx.consensus_header')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: ConsensusHeaderResponse
    }>(rpcUrl, { data: params })

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
  }) {
    const rpcUrl = this.getRpcUrl('dx.transaction_block')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: TransactionBlockResponse
    }>(rpcUrl, { data: params })

    return resp
  }

  async transactionByHash(hash: string, shard_index?: number | string) {
    const rpcUrl = this.getRpcUrl('dx.transaction')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: TransactionResponse
    }>(rpcUrl, { data: { hash, shard_index } })

    return resp
  }

  async dappInfo(name: string) {
    const rpcUrl = this.getRpcUrl('dx.dapp')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: DappInfoResponse
    }>(rpcUrl, { data: { name } })

    return resp
  }

  async generateKey(shard_index?: string | number, algo?: number) {
    const rpcUrl = this.getRpcUrl('dx.generate_key')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: GenerateKeyResponse
    }>(rpcUrl, { data: { shard_index, algo } })

    return resp
  }

  async isn(address: string) {
    const rpcUrl = this.getRpcUrl('dx.isn')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: { ISN: number }
    }>(rpcUrl, { data: { address } })

    return resp
  }

  async contractInfo(contract: string) {
    const rpcUrl = this.getRpcUrl('dx.contract_info')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: ContractInfoResponse
    }>(rpcUrl, { data: { contract } })

    return resp
  }

  async tokenInfo(symbol: string) {
    const rpcUrl = this.getRpcUrl('dx.token')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: TokenInfoResponse
    }>(rpcUrl, { data: { symbol } })

    return resp
  }

  async blockTime(height: number) {
    const rpcUrl = this.getRpcUrl('dx.block_time')

    const resp = await this.get<{
      err?: number
      rsp: string
      ret: { BlockMinedTime: number }
    }>(rpcUrl, { data: { height } })

    return resp
  }
}

export default DxService
