const { Web3, utils, NET } = require('../../lib/commonjs')

describe("web3 unit test", () => {
  const web3 = new Web3(NET.TEST)

  it('get address balance', async () => {
    const balance = await web3
      .getBalance('eqfkk71rg18mcjcp63tkcz4xpcxd91wtd5atpwk82j2jmcdeb50j6es2xm')
    expect(+utils.toTokenAmount(balance, 8)).toBeGreaterThan(0)
  })

  it('get address info', async () => {
    const info = await web3
      .getAddressInfo('eqfkk71rg18mcjcp63tkcz4xpcxd91wtd5atpwk82j2jmcdeb50j6es2xm')
    expect(info.Name).toEqual('forTest')
  })

  it('compose get raw data', async () => {
    const raw = await web3
      .composeTransaction({
        args: { Amount: '200000000', To: 'qzysdapqk4q3442fx59y2ajnsbx5maz3d6japb7jngjrqq5xqddh60n420:ed25519' },
        function: 'core.coin.transfer',
        gasprice: '100',
        sender: 'qzysdapqk4q3442fx59y2ajnsbx5maz3d6japb7jngjrqq5xqddh60n420:ed25519',
      })
    expect(raw).not.toBeNull()
  })

  it('send txn and get txn hash', async () => {
    const hash = await web3.sendTransaction(
      {
        args: { Amount: '200000000', To: 'qzysdapqk4q3442fx59y2ajnsbx5maz3d6japb7jngjrqq5xqddh60n420:ed25519' },
        function: 'core.coin.transfer',
        gasprice: '100',
        sender: 'qzysdapqk4q3442fx59y2ajnsbx5maz3d6japb7jngjrqq5xqddh60n420:ed25519',
      },
      'KHwdnMOhputNfUWjqhKECx7CeBjgZoWhen0dgsXS34k=',
    )
    const txn = await web3.getTransaction(hash)
    expect(txn.Result.Hash).toEqual(hash)
  })

  it('should get estimated fee', async () => {
    const gas = await web3.getEstimatedFee({
      args: { Amount: '200000000', To: 'qzysdapqk4q3442fx59y2ajnsbx5maz3d6japb7jngjrqq5xqddh60n420:ed25519' },
      function: 'core.coin.transfer',
      gasprice: '100',
      sender: 'qzysdapqk4q3442fx59y2ajnsbx5maz3d6japb7jngjrqq5xqddh60n420:ed25519',
    })
    expect(gas).not.toBeNull()
  })

  /** utils */

  it('to token amount', () => {
    const amount = utils.toTokenAmount('100000000', 8)
    expect(amount).toEqual('1')
  })

  it('is valid address', () => {
    const result = utils.isValidAddress('qzysdapqk4q3442fx59y2ajnsbx5maz3d6japb7jngjrqq5xqddh60n420')
    expect(result).toEqual(true)
  })

  it('extract publicKey', () => {
    const pk = utils.extractPublicKey('qzysdapqk4q3442fx59y2ajnsbx5maz3d6japb7jngjrqq5xqddh60n420')
    expect(pk).toEqual('QZYSDAPQK4Q3442FX59Y2AJNSBX5MAZ3D6JAPB7JNGJRQQ5XQDDG')
  })
})