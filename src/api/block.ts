import provider from './provider'
import Request, { DIOX } from './request'

class BlockSvc extends Request {
  getExcutedTx(params: { height: number; limit?: number; pos?: number }) {
    const { limit = 10000, pos = 0, height } = params
    const data = {
      limit,
      pos,
      height,
    }
    const { dioxide } = provider.get()
    const url = `${dioxide}/api?module=block&action=txn_executed`
    return this.get<{
      err?: number
      rsp: string
      ret: DIOX.Block
    }>(url, {
      data,
    })
  }
}

export default BlockSvc
