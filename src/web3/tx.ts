import Request from '../api/request'
import TxService from '../api/tx'

export default class Tx extends Request {
  private txSvc: TxService

  constructor(opts: { path: string; apiKey?: string }) {
    super(opts)
    this.txSvc = new TxService(opts)
  }

  async compose(params: {
    function: string
    args?: Record<string, any>
    sender?: string
    delegatee?: string
    gasprice?: number
    ttl?: number
  }) {
    return this.txSvc.compose(params)
  }

  async sign(params: { sk: string[]; txdata: string }) {
    return this.txSvc.sign(params)
  }

  async send(params: { txdata: string }) {
    return this.txSvc.send(params)
  }

  async sendWithSK(params: {
    privatekey: string
    function: string
    args?: Record<string, string>
    delegatee?: string
    tokens?: Record<string, string>[]
  }) {
    return this.txSvc.sendWithSK(params)
  }
}
