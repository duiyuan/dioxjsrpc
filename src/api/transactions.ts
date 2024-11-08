import provider from './provider'
import Request, { DIOX } from './request'

export function getComposeUrl() {
  const { rpc } = provider.get()
  const encodeUri = encodeURI(rpc + '/api?req=tx.compose')
  return encodeUri
}
export function getLimitUrl() {
  const { rpc } = provider.get()
  const encodeUri = encodeURI(rpc + '/api?req=tx.estimate_gas')
  return encodeUri
}
export function getSendUrl() {
  const { rpc } = provider.get()
  const encodeUri = encodeURI(rpc + '/api?req=tx.send')
  return encodeUri
}

export interface TxDetailResponse {
  Hash: string
  Content: DIOX.TxDetail
}

class TransactionService extends Request {
  compose(body: string) {
    return this.post<{
      err?: number
      rsp: string
      ret: { TxData: string; GasOffered: number }
    }>(getComposeUrl(), { body })
  }

  sendTransaction(body: string) {
    return this.post<{
      err?: number
      rsp: string
      ret: { Hash: string; Shard: number }
    }>(getSendUrl(), { body })
  }

  async getTransactionByHash(hash: string) {
    const { Status, Message, Result } = await this.get<CommonResponse<TxDetailResponse>>(
      '',
      {
        data: {
          module: 'txn',
          action: 'details',
          hash,
        },
      },
    )
    if (Status) throw Message
    return Result
  }
}

export default TransactionService
