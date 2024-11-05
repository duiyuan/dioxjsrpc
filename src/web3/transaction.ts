import { decode, encode } from 'base64-arraybuffer'
import TransactionService from '../api/transactions'
import { concat } from '../utils'
import PowDifficulty from '../utils/powDifficulty'
import * as ed from '@noble/ed25519'
import OverviewService from '../api/overview'

class Transaction {
  private txnServices: TransactionService
  private overViewServices: OverviewService
  constructor() {
    this.txnServices = new TransactionService()
    this.overViewServices = new OverviewService()
  }

  async getTxn(hash: string) {
    return this.txnServices.getTransactionByHash(hash)
  }

  async compose(originalTxn: OriginalTxn) {
    const { ret, err } = await this.txnServices.compose(
      JSON.stringify(originalTxn),
    )
    if (err) {
      throw new Error(ret.toString())
    }
    return ret.TxData
  }

  async sign(txdata: string, secretKey: string) {
    const unit8ArraySecrectKey = new Uint8Array(decode(secretKey))
    const pk = await ed.getPublicKey(unit8ArraySecrectKey)
    const dataWithPK = this.insertPK(txdata, [
      { encryptedMethodOrderNumber: 0x3, publicKey: pk },
    ])
    const signedInfo = await ed.sign(dataWithPK, unit8ArraySecrectKey)
    const finalInfo = concat(dataWithPK, signedInfo)
    const powDiff = new PowDifficulty(finalInfo.buffer)
    const finalInfowithNonce = powDiff.getHashMixinNonnce()
    return finalInfowithNonce
  }

  async send(originTxn: OriginalTxn, secretKey: string) {
    const txData = await this.compose(originTxn)
    const signData = await this.sign(txData, secretKey)
    const { ret, err } = await this.txnServices.sendTransaction(
      JSON.stringify({
        txdata: encode(signData),
        address: originTxn.sender,
      }),
    )
    if (err) {
      throw new Error(ret.toString())
    }
    return ret.Hash
  }

  private insertPK(
    txData: string,
    pkList: { encryptedMethodOrderNumber: number; publicKey: Uint8Array }[],
  ): Uint8Array {
    const originTxData = new Uint8Array(decode(txData))

    const secSuites: Uint8Array[] = []
    pkList.forEach((el) => {
      const id = new Uint8Array([el.encryptedMethodOrderNumber])
      const pk = el.publicKey
      secSuites.push(id)
      secSuites.push(pk)
    })
    const result = concat(originTxData, ...secSuites)
    return result
  }

  async getEstimatedFee(originTxn: OriginalTxn) {
    const { function: func, args, delegatee, scale = 3, tokens } = originTxn
    const overview = await this.overViewServices.chainStatus()
    const avgGasPrice = overview.Result?.AvgGasPrice || 0
    const to = args.to || args.To

    const { ret, err } = await this.txnServices.compose(
      JSON.stringify({
        sender: to,
        gasprice: avgGasPrice,
        delegatee: delegatee,
        function: func,
        args,
        tokens,
      }),
    )
    if (err) {
      throw new Error(
        'services.compose failed: txdata is empty(' + ret.toString() + ')',
      )
    }

    const gasLimit = ret.GasOffered.toString()
    const gasFee = this.calculateGasFee({
      average: avgGasPrice,
      scale: scale,
      gasLimit: Number(gasLimit),
    })
    return gasFee
  }

  calculateGasFee(options: {
    average: number
    scale: number
    gasLimit: number
  }): number | string | bigint {
    const { average, scale = 3, gasLimit } = options
    const gasPrice = parseInt(((scale - 1) * 0.25 + 0.5) * average + '', 10)
    const gasFee = gasPrice * gasLimit
    return gasFee
  }
}

export { Transaction }
