import {
  Web3,
  NET,
  MempoolAllShardsResponse,
  MempoolTransaction,
  MempoolSingleShardResponse,
  TransactionBlock,
} from '../../lib/commonjs'

describe('Dx unit test', () => {
  const web3 = new Web3(NET.TEST)

  it('test overview', async () => {
    const resp = await web3.dx.overview()

    expect(resp?.ret).toMatchObject({
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

    if (typeof resp?.ret === 'string') {
      expect(resp?.ret).toBe('invalid request')
    } else {
      expect(resp?.ret.HeadHeight).toBeDefined()
      expect(resp?.ret.HeadHash).toBeDefined()
    }
  })

  it('test isMining', async () => {
    const resp = await web3.dx.isMining()

    if (typeof resp?.ret === 'string') {
      expect(resp?.ret).toBe('invalid request')
    } else {
      expect(typeof resp?.ret.Mining).toBe('boolean')
    }
  })

  it('test getShardInfo', async () => {
    const resp = await web3.dx.getShardInfo(0)

    if (typeof resp?.ret === 'string') {
      expect(resp?.ret).toBe('invalid request')
    } else {
      expect(resp?.ret.ShardIndex).toEqual(0)
    }
  })

  it('test getShardIndexByScope', async () => {
    // ===== global =====
    const globalResp = await web3.dx.getShardIndexByScope('global')

    expect(globalResp).toBeDefined()
    expect(globalResp).toMatchObject({
      ret: {
        ShardIndex: expect.any(Number),
      },
    })

    if (typeof globalResp?.ret === 'string') {
      expect(globalResp?.ret).toBe('invalid request')
    } else {
      expect(globalResp.ret.ShardIndex).toBeGreaterThanOrEqual(0)
    }

    // // ===== address =====
    const addressScopeKey = '3yx91qpxw5qwbadrdf1t7k2r2bvp0x3b6cdcv23n32knaw8mv9xw6trv34:ed25519'

    const addressResp = await web3.dx.getShardIndexByScope('address', addressScopeKey)

    expect(addressResp).toBeDefined()

    if (typeof addressResp?.ret === 'string') {
      expect(addressResp?.ret).toBe('invalid request')
    } else {
      expect(addressResp).toMatchObject({
        ret: {
          ShardIndex: expect.any(Number),
        },
      })
      expect(addressResp.ret.ShardIndex).toBeGreaterThanOrEqual(0)
    }
  })

  it('test getShardIndexByScope - should throw error if scope_key is not provided for non-global scope', async () => {
    await expect(web3.dx.getShardIndexByScope('address')).rejects.toThrow('scope_key is required for non-global scope')
  })

  it('test getMempool', async () => {
    const resp_all = await web3.dx.getMempool()
    const resp_shard = await web3.dx.getMempool(65535)

    expect(resp_all?.ret).toBeDefined()

    if (typeof resp_all?.ret === 'string') {
      expect(resp_all?.ret).toBe('invalid request')
    } else {
      expect(typeof resp_all?.ret).toBe('object')
      expect(Array.isArray(resp_all?.ret)).toBe(false)

      expect(resp_all?.ret).toHaveProperty('g')
      expect(Array.isArray((resp_all?.ret as MempoolAllShardsResponse).g)).toBe(true)

      Object.keys(resp_all?.ret)
        .filter((k: string) => k !== 'g')
        .forEach((k) => {
          // Use type assertion for string indexing to avoid TypeScript error
          expect(Array.isArray((resp_all?.ret as unknown as MempoolAllShardsResponse)[k])).toBe(true)
        })
    }

    expect(resp_shard?.ret).toBeDefined()

    if (typeof resp_shard?.ret === 'string') {
      expect(resp_shard?.ret).toBe('invalid request')
    } else {
      expect(Array.isArray(resp_shard?.ret)).toBe(true)

      if ((resp_shard?.ret as MempoolSingleShardResponse).length > 0) {
        expect((resp_shard?.ret as unknown as MempoolTransaction[])[0]).toHaveProperty('TXID')
        expect((resp_shard?.ret as unknown as MempoolTransaction[])[0]).toHaveProperty('State')
      }
    }
  })

  it('test getContractState', async () => {
    const resp = await web3.dx.getContractState('silas.ProofOfExistence.uint32', '65534')

    if (typeof resp?.ret === 'string') {
      expect(resp?.ret).toBe('invalid contract')
    } else {
      expect(resp?.ret).toBeDefined()
      expect(resp?.ret).toMatchObject({
        ContractID: expect.any(Number),
        ContractVersionID: expect.any(Number),
        Functions: expect.any(Array),
        InterfaceImplemented: expect.any(Array),
      })
    }
  })

  it('test getConsensusHeader', async () => {
    const resp = await web3.dx.getConsensusHeader({
      query_type: 0,
      height: 1,
    })

    const header = resp?.ret

    if (typeof header === 'string') {
      expect(header).toBe('invalid request')
    } else {
      expect(header).toBeDefined()
      expect(header).toMatchObject({
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
    }
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

    const block = resp?.ret as TransactionBlock

    if (typeof block === 'string') {
      expect(block).toBe('invalid request')
    } else {
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
    }
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

    const transaction = resp?.ret

    if (typeof transaction === 'string') {
      expect(transaction).toBe('invalid request')
    } else {
      expect(transaction).toBeDefined()

      expect(transaction).toMatchObject({
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
    }
  })

  it('test getDappInfo', async () => {
    const resp = await web3.dx.getDappInfo('core')

    const dappInfo = resp?.ret

    if (typeof dappInfo === 'string') {
      expect(dappInfo).toBe('invalid request')
    } else {
      expect(dappInfo).toBeDefined()

      expect(dappInfo).toMatchObject({
        DAppID: expect.any(Number),
        Address: expect.any(String),
      })
    }
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

    const isn = resp?.ret
    expect(isn).toBeDefined()

    expect(isn).toMatchObject({
      ISN: expect.any(Number),
    })
  })

  it('test getContractInfo', async () => {
    const resp = await web3.dx.getContractInfo('core.coin.address')

    const contractInfo = resp?.ret
    expect(contractInfo).toBeDefined()

    if (typeof contractInfo === 'string') {
      expect(contractInfo).toBe('invalid contract')
    } else {
      expect(contractInfo).toMatchObject({
        ContractID: expect.any(Number),
        ContractVersionID: expect.any(Number),
        Functions: expect.any(Array),
      })
    }
  })

  it('test getTokenInfo', async () => {
    const resp = await web3.dx.getTokenInfo('DIO')

    const tokenInfo = resp?.ret

    if (typeof tokenInfo !== 'string') {
      expect(tokenInfo).toBeDefined()
      expect(tokenInfo).toHaveProperty('TokenID')
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
