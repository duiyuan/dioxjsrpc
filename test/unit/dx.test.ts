import {
  ConsensusHeaderBlock,
  ContractInfoResponse,
  DappInfoResponse,
  GenerateKeyResponse,
  MempoolAllShardsResponse,
  MempoolTransaction,
  TransactionBlock,
} from '../../src/types/dx'
import Dx from '../../src/web3/dx'

describe('Dx Module Unit Tests', () => {
  const dx = new Dx({ path: 'http://10.245.32.4:61221' })

  it('test overview', async () => {
    const resp = await dx.overview()

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
    const resp = await dx.getCommittedHeadHeight()

    expect(resp?.ret.HeadHeight).toBeDefined()
    expect(resp?.ret.HeadHash).toBeDefined()
  })

  it('test isMining', async () => {
    const resp = await dx.isMining()

    expect(resp?.ret.Mining).toBeBoolean()
  })

  it('test getShardInfo', async () => {
    const resp = await dx.getShardInfo(65535)

    expect(resp?.ret.ShardIndex).toEqual(65535)
  })

  it('getShardIndexByScope should work for different scopes', async () => {
    // ===== global scope =====
    const globalResp = await dx.getShardIndexByScope('global')

    expect(globalResp).toBeDefined()
    expect(globalResp).toMatchObject({
      ret: {
        ShardIndex: expect.any(Number),
      },
    })
    expect(globalResp.ret.ShardIndex).toBeGreaterThanOrEqual(0)

    // ===== address scope =====
    const addressScopeKey = '3yx91qpxw5qwbadrdf1t7k2r2bvp0x3b6cdcv23n32knaw8mv9xw6trv34:ed25519'

    const addressResp = await dx.getShardIndexByScope('address', addressScopeKey)

    expect(addressResp).toBeDefined()
    expect(addressResp).toMatchObject({
      ret: {
        ShardIndex: expect.any(Number),
      },
    })
    expect(addressResp.ret.ShardIndex).toBeGreaterThanOrEqual(0)
  })

  it('getMempool should return correct structure', async () => {
    const resp_all = await dx.getMempool()
    const resp_shard = await dx.getMempool(65535)

    expect(resp_all?.ret).toBeDefined()
    expect(typeof resp_all?.ret).toBe('object')
    expect(Array.isArray(resp_all?.ret)).toBe(false)

    // global mempool (key is 'g')
    expect(resp_all?.ret).toHaveProperty('g')
    expect(Array.isArray((resp_all?.ret as unknown as MempoolAllShardsResponse).g)).toBe(true)

    // shard mempool (key is string)
    Object.keys(resp_all?.ret)
      .filter((k: string) => k !== 'g')
      .forEach((k) => {
        // Use type assertion for string indexing to avoid TypeScript error
        expect(Array.isArray((resp_all?.ret as unknown as MempoolAllShardsResponse)[k])).toBe(true)
      })

    expect(resp_shard?.ret).toBeDefined()
    expect(Array.isArray(resp_shard?.ret)).toBe(true)

    if ((resp_shard?.ret as unknown as MempoolTransaction[]).length > 0) {
      expect((resp_shard?.ret as unknown as MempoolTransaction[])[0]).toHaveProperty('TXID')
      expect((resp_shard?.ret as unknown as MempoolTransaction[])[0]).toHaveProperty('State')
    }
  })

  it('test getContractState', async () => {
    const resp = await dx.getContractState('silas.ProofOfExistence.uint32', '65534')

    expect(resp?.ret).toBeDefined()
  })

  it('test getConsensusHeader', async () => {
    const resp = await dx.getConsensusHeader({
      query_type: 0,
      height: 1,
    })

    const header = resp?.ret as ConsensusHeaderBlock

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
  })

  it('test getTransactionBlock', async () => {
    const resp = await dx.getTransactionBlock({
      query_type: 0,
      shard_index: 65535,
      height: 1,
    })

    const block = resp?.ret as TransactionBlock
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

  it('test getTransactionByHash', async () => {
    const resp = await dx.getTransactionByHash('3xzxwc1v4wx890wn8dtbmckdr7zkeghrrcvrgt95fn1k3ne3w7w0')

    const transaction = resp?.ret as unknown
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
  })

  it('test getDappInfo', async () => {
    const resp = await dx.getDappInfo('silas')

    const dappInfo = resp?.ret as DappInfoResponse
    expect(dappInfo).toBeDefined()

    expect(dappInfo).toMatchObject({
      DAppID: expect.any(Number),
      Address: expect.any(String),
    })
  })

  it('test generateKey', async () => {
    const resp = await dx.generateKey()

    const key = resp?.ret as GenerateKeyResponse
    expect(key).toBeDefined()

    expect(key).toMatchObject({
      PrivateKey: expect.any(String),
      PublicKey: expect.any(String),
      Address: expect.any(String),
      Shard: expect.any(Number),
    })
  })

  it('test isn', async () => {
    const resp = await dx.getISNByAddress('silas:dapp')

    const isn = resp?.ret as { ISN: number }
    expect(isn).toBeDefined()

    expect(isn).toMatchObject({
      ISN: expect.any(Number),
    })
  })

  it('test contractInfo', async () => {
    const resp = await dx.getContractInfo('silas.ProofOfExistence')

    const contractInfo = resp?.ret as ContractInfoResponse
    expect(contractInfo).toBeDefined()

    expect(contractInfo).toMatchObject({
      ContractID: expect.any(Number),
      ContractVersionID: expect.any(Number),
      Functions: expect.any(Array),
    })
  })

  // it('test tokenInfo', async () => {
  //   const resp = await dx.getTokenInfo('VOID')
  //   const tokenInfo = resp?.ret as TokenInfoResponse
  //   expect(tokenInfo).toBeDefined()

  //   console.log(tokenInfo)
  //   expect(tokenInfo).toMatchObject({
  //     Address: expect.any(String),
  //     TokenID: expect.any(Number),
  //   })
  // })

  // it('test blockTime', async () => {
  //   const resp = await dx.getBlockTime(1)

  //   const blockTime = resp?.ret as { BlockMinedTime: number }
  //   expect(blockTime).toBeDefined()

  //   console.log(blockTime)

  //   expect(blockTime).toMatchObject({
  //     BlockMinedTime: expect.any(Number),
  //   })
  // })
})
