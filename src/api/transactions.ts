import Request from './request'

type ListParmas = {
  address?: string
  addresstxntype?: string
  shardIndex?: string
  height?: number
  pos?: number
  limit?: number
}

export function getComposeUrl(rpcProvider: string) {
  const encodeUri = encodeURI(rpcProvider + '/api?req=tx.compose')
  return encodeUri
}
export function getLimitUrl(rpcProvider: string) {
  const encodeUri = encodeURI(rpcProvider + '/api?req=tx.estimate_gas')
  return encodeUri
}
export function getSendUrl(rpcProvider: string) {
  const encodeUri = encodeURI(rpcProvider + '/api?req=tx.send')
  return encodeUri
}

class TransactionService extends Request {

  getListByAddress(params?: ListParmas) {
    return this.get<DioxScanTxResponse>('', {
      data: {
        module: 'address',
        action: 'listtxn',
        ...params,
      },
    })
  }

  getAverageGasPrice() {
    return this.get<DioxScanChainBasicInfo>('', {
      data: {
        module: 'chain',
        action: 'status',
      },
    })
  }

  compose(body: string) {
    return this.post<{
      err?: number
      rsp: string
      ret: { TxData: string; GasOffered: number }
    }>(getComposeUrl(this.rpcProvider), { body })
  }

  generateISN(params: { address: string }) {
    return this.get<Override>('', {
      data: {
        module: 'address',
        action: 'status',
        ...params,
      },
    })
  }

  sendTransaction(body: string) {
    return this.post<{
      err?: number
      rsp: string
      ret: { Hash: string; Shard: number }
    }>(getSendUrl(this.rpcProvider), { body })
  }

  getTransactionByHash(hash: string) {
    return this.get<DioxScanTxResponse>('', {
      data: {
        module: 'txn',
        action: 'details',
        hash,
      },
    })
  }
}

export default TransactionService
