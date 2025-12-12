import { AxiosRequestConfig } from 'axios'
import Request from './request'
import type { ComposeTxResponse } from '../types/tx'

interface ApiResponse<T> {
  ret: T
}

class TxService extends Request {
  private path: string

  constructor(opts: { path: string; apiKey?: string }) {
    super(opts)
    this.path = opts.path
  }

  async call<T = any>(func: string, params: any = {}, opts: AxiosRequestConfig = {}): Promise<ApiResponse<T>> {
    return this.rest(`${this.path}/api?req=${func}`, params, opts)
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
  }): Promise<ApiResponse<ComposeTxResponse>> {
    const resp = await this.call<ComposeTxResponse>('tx.compose', params)
    return resp
  }

  async sign(params: { sk: string[]; txdata: string }): Promise<ApiResponse<{ TxData: string }>> {
    const resp = await this.call<{ TxData: string }>('tx.sign', params)
    return resp
  }

  async send(params: { txdata: string }): Promise<ApiResponse<{ Hash: string }>> {
    const resp = await this.call<{ Hash: string }>('tx.send', params)
    return resp
  }

  async sendWithSK(params: {
    privatekey: string
    function: string
    args?: Record<string, string>
    delegatee?: string
    tokens?: Record<string, string>[]
  }): Promise<ApiResponse<{ Hash: string }>> {
    const resp = await this.call<{ Hash: string }>('tx.send_withSK', params)
    return resp
  }
}

export default TxService
