/**
 * @description dx module: information query module, query chain information
 * @description rpc module: rpc call module, call rpc api
 */

import Request from '../api/request'
import DxService from '../api/dx'
import { ConsensusHeaderQueryType, KeyAlgorithm } from '../api/type'

export default class Dx extends Request {
  dxSvc: DxService

  constructor() {
    super()
    this.dxSvc = new DxService()
  }

  async overview() {
    return this.dxSvc.overview()
  }

  async getCommittedHeadHeight() {
    return this.dxSvc.committedHeadHeight()
  }

  async isMining() {
    return this.dxSvc.isMining()
  }

  async getShardInfo(shard_index: number | string) {
    return this.dxSvc.shardInfo(shard_index)
  }

  async getShardIndexByScope(
    scope: 'global' | 'shard' | 'address' | 'uint32' | 'uint64' | 'uint128' | 'uint256' | 'uint512',
    scope_key?: string,
  ) {
    if (scope !== 'global' && !scope_key) {
      throw new Error('scope_key is required for non-global scope')
    }

    return this.dxSvc.shardIndex(scope, scope_key)
  }

  async getMempool(shard_index?: string | number, archived?: string | number) {
    return this.dxSvc.mempool(shard_index, archived)
  }

  async getContractState(contract_with_scope: string, scope_key: string) {
    return this.dxSvc.contractState(contract_with_scope, scope_key)
  }

  async getConsensusHeader(params: {
    query_type: ConsensusHeaderQueryType
    height?: number
    hash?: string
    start?: number
    end?: number
    runtime?: boolean
  }) {
    if (params?.query_type === 0 && !params?.height) {
      throw new Error('height is required for query_type 0')
    }
    if (params?.query_type === 1 && !params?.hash) {
      throw new Error('hash is required for query_type 1')
    }
    if (params?.query_type === 2 && !params?.start && !params?.end) {
      throw new Error('start or end is required for query_type 2')
    }

    return this.dxSvc.consensusHeader(params)
  }

  async getTransactionBlock(params: {
    query_type: ConsensusHeaderQueryType
    shard_index: string | number
    height?: number
    hash?: string
    start?: number
    end?: number
    runtime?: boolean
  }) {
    if (params?.query_type === 0 && !params?.height) {
      throw new Error('height is required for query_type 0')
    }
    if (params?.query_type === 1 && !params?.hash) {
      throw new Error('hash is required for query_type 1')
    }
    if (params?.query_type === 2 && !params?.start && !params?.end) {
      throw new Error('start or end is required for query_type 2')
    }

    return this.dxSvc.transactionBlock(params)
  }

  async getTransactionByHash(hash: string, shard_index?: number | string) {
    return this.dxSvc.transactionByHash(hash, shard_index)
  }

  async getDappInfo(name: string) {
    const nameRegex = /^[A-Za-z0-9_\-#@]+$/

    if (name.length < 4 || name.length > 8) {
      throw new Error('name must be between 4 and 8 characters')
    }

    if (!nameRegex.test(name)) {
      throw new Error('name must contain only letters, numbers, _, -, #, or @')
    }

    return this.dxSvc.dappInfo(name)
  }

  /**
   * Generate key pair
   * @param shard_index Optional. Shard index
   * @param algo Optional. Key algorithm: 0 = ed25519, 1 = ethereum, 2 = sm2
   */
  async generateKey(shard_index?: string | number, algo?: KeyAlgorithm) {
    if (
      algo !== undefined &&
      !(algo === KeyAlgorithm.ED25519 || algo === KeyAlgorithm.ETHEREUM || algo === KeyAlgorithm.SM2)
    ) {
      throw new Error('Invalid algo parameter. Must be 0 (ed25519), 1 (ethereum), or 2 (sm2)')
    }
    return this.dxSvc.generateKey(shard_index, algo)
  }

  async getISNByAddress(address: string) {
    return this.dxSvc.isn(address)
  }

  async getContractInfo(contract: string) {
    return this.dxSvc.contractInfo(contract)
  }

  async getTokenInfo(symbol: string) {
    return this.dxSvc.tokenInfo(symbol)
  }

  async getBlockTime(height: number) {
    return this.dxSvc.blockTime(height)
  }
}
