/**
 * @description tx module: transaction module, compose, sign, send, sendWithSK on chain
 * @description rpc module: rpc call module, call rpc api
 */

import json from 'json-bigint'
import provider from './provider'
import Request from './request'

export default class Tx extends Request {
  getRpcUrl(func: string) {
    const { rpc } = provider.get()
    const encodeUri = encodeURI(rpc + '/api?req=' + func)

    return encodeUri
  }

  async compose(params: {
    function: string
    args?: Record<string, any>
    sender?: string
    delegatee?: string
    gasprice?: number
    ttl?: number
    sigcount?: number
    tokens?: Record<string, string>[]
    gaslimit?: number
    isn?: string
  }) {
    return this.post<{
      err?: number
      rsp: string
      ret: { TxData: string; GasOffered: number }
    }>(this.getRpcUrl('tx.compose'), { body: json.stringify(params) })
  }

  async sign(params: { sk: string[]; txdata: string }) {
    return this.post<{
      err?: number
      rsp: string
      ret: { TxData: string }
    }>(this.getRpcUrl('tx.sign'), { body: json.stringify(params) })
  }

  async send(params: { txdata: string }) {
    return this.post<{
      err?: number
      rsp: string
      ret: { Hash: string }
    }>(this.getRpcUrl('tx.send'), { body: json.stringify(params) })
  }

  // send transaction with SK, need to pass in the private key, only for development use !!!
  async sendWithSK(params: {
    privatekey: string
    function: string
    args?: Record<string, string>
    delegatee?: string
    tokens?: Record<string, string>[]
  }) {
    return this.post<{
      err?: number
      rsp: string
      ret: { Hash: string }
    }>(this.getRpcUrl('tx.send_withSK'), { body: json.stringify(params) })
  }
}
