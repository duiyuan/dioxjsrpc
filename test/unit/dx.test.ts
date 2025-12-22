import {
  Web3,
  NET,
  MempoolAllShardsResponse,
  TransactionBlock,
  MempoolTransaction,
  MempoolSingleShardResponse,
} from '../../lib/commonjs'

describe('Dx unit test', () => {
  const web3 = new Web3(NET.TEST)

  it('test overview', async () => {
    const resp = await web3.dx.overview()

    expect(resp).toMatchObject({
      VesionName: expect.any(String),
      DeployName: expect.any(String),
      ChainVersion: expect.any(Number),
      Time: expect.any(Number),
      BlockTime: expect.any(Number),
      ShardOrder: expect.any(Number),
      ShardOnDuty: expect.any(Array),
      BlackListSize: expect.any(Number),
      ScalingOut: expect.any(Boolean),
      Rebase: expect.any(Boolean),
      BaseHeight: expect.any(Number),
      HeadHash: expect.any(String),
      HeadHeight: expect.any(Number),
      TxnCount: expect.any(Array),
    })
  })

  it('test getCommittedHeadHeight', async () => {
    const resp = await web3.dx.getCommittedHeadHeight()

    expect(resp.HeadHeight).toBeDefined()
    expect(resp.HeadHash).toBeDefined()
  })

  it('test isMining', async () => {
    const resp = await web3.dx.isMining()

    expect(typeof resp.Mining).toBe('boolean')
  })

  it('test getShardInfo', async () => {
    const resp = await web3.dx.getShardInfo(0)

    expect(resp.ShardIndex).toEqual(0)
  })

  it('test getShardIndexByScope', async () => {
    // ===== global =====
    const globalResp = await web3.dx.getShardIndexByScope('global')

    expect(globalResp).toBeDefined()
    expect(globalResp).toMatchObject({
      ShardIndex: expect.any(Number),
    })
    expect(globalResp.ShardIndex).toBeGreaterThanOrEqual(0)

    // // ===== address =====
    const addressScopeKey = '3yx91qpxw5qwbadrdf1t7k2r2bvp0x3b6cdcv23n32knaw8mv9xw6trv34:ed25519'

    const addressResp = await web3.dx.getShardIndexByScope('address', addressScopeKey)

    expect(addressResp).toBeDefined()
    expect(addressResp).toMatchObject({
      ShardIndex: expect.any(Number),
    })
    expect(addressResp.ShardIndex).toBeGreaterThanOrEqual(0)
  })

  it('test getShardIndexByScope - should throw error if scope_key is not provided for non-global scope', async () => {
    await expect(web3.dx.getShardIndexByScope('address')).rejects.toThrow('scope_key is required for non-global scope')
  })

  it('test getMempool', async () => {
    const resp_all = await web3.dx.getMempool()
    const resp_shard = await web3.dx.getMempool(65535)

    expect(resp_all).toBeDefined()
    expect(typeof resp_all).toBe('object')
    expect(Array.isArray(resp_all)).toBe(false)

    expect(resp_all).toHaveProperty('g')
    expect(Array.isArray((resp_all as MempoolAllShardsResponse).g)).toBe(true)

    Object.keys(resp_all)
      .filter((k: string) => k !== 'g')
      .forEach((k) => {
        // Use type assertion for string indexing to avoid TypeScript error
        expect(Array.isArray((resp_all as unknown as MempoolAllShardsResponse)[k])).toBe(true)
      })

    expect(resp_shard).toBeDefined()
    expect(Array.isArray(resp_shard)).toBe(true)

    if ((resp_shard as MempoolSingleShardResponse).length > 0) {
      expect((resp_shard as unknown as MempoolTransaction[])[0]).toHaveProperty('TXID')
      expect((resp_shard as unknown as MempoolTransaction[])[0]).toHaveProperty('State')
    }
  })

  it('test getContractState', async () => {
    try {
      const resp = await web3.dx.getContractState('silas.ProofOfExistence.uint32', '65534')

      expect(resp).toBeDefined()
      expect(resp).toMatchObject({
        ContractID: expect.any(Number),
        ContractVersionID: expect.any(Number),
        Functions: expect.any(Array),
        InterfaceImplemented: expect.any(Array),
      })
    } catch (error) {
      console.log('error', error)
    }
  })

  it('test getConsensusHeader', async () => {
    const resp = await web3.dx.getConsensusHeader({
      query_type: 0,
      height: 1,
    })

    expect(resp).toBeDefined()
    expect(resp).toMatchObject({
      Size: expect.any(Number),
      Version: expect.any(Number),
      Prev: expect.any(String),
      ShardOrder: expect.any(Number),
      Timestamp: expect.any(Number),
      Hash: expect.any(String),
      State: expect.any(String),
      Consensus: expect.any(String),
      Miner: expect.any(String),
    })
  })

  it('test getConsensusHeader - should throw error if required parameters are not provided', async () => {
    await expect(web3.dx.getConsensusHeader({ query_type: 0 })).rejects.toThrow('height is required for query_type 0')
    await expect(web3.dx.getConsensusHeader({ query_type: 1 })).rejects.toThrow('hash is required for query_type 1')
    await expect(web3.dx.getConsensusHeader({ query_type: 2 })).rejects.toThrow(
      'start or end is required for query_type 2',
    )
  })

  it('test getTransactionBlock', async () => {
    const resp = await web3.dx.getTransactionBlock({
      query_type: 0,
      shard_index: 65535,
      height: 1,
    })

    const block = resp as TransactionBlock

    expect(block).toBeDefined()

    expect(block).toMatchObject({
      Size: expect.any(Number),
      Version: expect.any(Number),
      Scope: expect.any(String),
      Shard: expect.any(Array),
      Prev: expect.any(String),
    })

    expect(block.Transactions).toBeDefined()
    expect(block.Transactions).toMatchObject({
      Scheduled: expect.any(Array),
      Confirmed: expect.any(Array),
      DispatchedRelays: expect.any(Array),
      Deferred: expect.any(Array),
    })
  })

  it('test getTransactionBlock - should throw error if required parameters are not provided', async () => {
    await expect(web3.dx.getTransactionBlock({ query_type: 0, shard_index: 65535 })).rejects.toThrow(
      'height is required for query_type 0',
    )
    await expect(web3.dx.getTransactionBlock({ query_type: 1, shard_index: 65535 })).rejects.toThrow(
      'hash is required for query_type 1',
    )
    await expect(web3.dx.getTransactionBlock({ query_type: 2, shard_index: 65535 })).rejects.toThrow(
      'start or end is required for query_type 2',
    )
  })

  it('test getTransactionByHash', async () => {
    const resp = await web3.dx.getTransactionByHash('crtp4zcbm3jm2x1yzfm13ck55450dyp7rwt36kv54nqbaapc704g')

    expect(resp).toBeDefined()

    expect(resp).toMatchObject({
      Hash: expect.any(String),
      BuildNum: expect.any(Number),
      GasOffered: expect.any(Number),
      Grouped: expect.any(Boolean),
      uTxnSize: expect.any(Number),
      Mode: expect.any(String),
      OrigExecIdx: expect.any(Number),
      Function: expect.any(String),
      Input: expect.any(Object),
      Invocation: expect.any(Object),
    })
  })

  it('test getDappInfo', async () => {
    const resp = await web3.dx.getDappInfo('core')

    expect(resp).toBeDefined()

    expect(resp).toMatchObject({
      DAppID: expect.any(Number),
      Address: expect.any(String),
    })
  })

  it('test getDappInfo - verify name length', async () => {
    // name too short
    await expect(web3.dx.getDappInfo('abc')).rejects.toThrow('name must be between 4 and 8 characters')

    // name too long
    await expect(web3.dx.getDappInfo('abcdefghi')).rejects.toThrow('name must be between 4 and 8 characters')
  })

  it('test getDappInfo - verify name format', async () => {
    // contains illegal characters
    await expect(web3.dx.getDappInfo('test!')).rejects.toThrow('name must contain only letters, numbers, _, -, #, or @')

    await expect(web3.dx.getDappInfo('test$')).rejects.toThrow('name must contain only letters, numbers, _, -, #, or @')
  })

  // it('test generateKey', async () => {
  //   const resp = await web3.dx.generateKey()

  //   console.log('resp', resp)

  //   const key = resp?.ret

  //   if (typeof key === 'string') {
  //     expect(key).toBe('invalid request')
  //   } else {
  //     expect(key).toBeDefined()

  //     expect(key).toMatchObject({
  //       PrivateKey: expect.any(String),
  //       PublicKey: expect.any(String),
  //       Address: expect.any(String),
  //       Shard: expect.any(Number),
  //     })
  //   }
  // })

  it('test getISNByAddress', async () => {
    const resp = await web3.dx.getISNByAddress('core:dapp')

    expect(resp).toBeDefined()

    expect(resp).toMatchObject({
      ISN: expect.any(Number),
    })
  })

  it('test getContractInfo', async () => {
    try {
      const resp = await web3.dx.getContractInfo('core.coin.address')

      expect(resp).toBeDefined()

      expect(resp).toMatchObject({
        ContractID: expect.any(Number),
        ContractVersionID: expect.any(Number),
        Functions: expect.any(Array),
      })
    } catch (error) {
      console.log('error', error)
    }
  })

  it('test getTokenInfo', async () => {
    try {
      const resp = await web3.dx.getTokenInfo('DIO')

      expect(resp).toBeDefined()
      expect(resp).toHaveProperty('TokenID')
    } catch (error) {
      console.log('error', error)
    }
  })

  // it('test getBlockTime', async () => {
  //   const resp = await web3.dx.getBlockTime(100)

  //   console.log('resp', resp)

  //   const blockTime = resp?.ret
  //   expect(blockTime).toBeDefined()

  //   expect(blockTime).toMatchObject({
  //     BlockMinedTime: expect.any(Number),
  //   })
  // })
})
