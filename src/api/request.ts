import querystring from 'query-string'
import json from 'json-bigint'
import fetch, { Response, RequestInit } from 'node-fetch'
import { shakeKeyValue } from '../utils/string'
import provider from './provider'

export declare namespace DIOX {
  interface MetaData {
    Description?: string
    IconUrl?: string
    Name?: string
    Website?: string
    Social?: {
      Github: string
      Discord: string
      Twitter: string
      Telegram: string
      Facebook: string
      Email: string
    }
  }

  interface TxSummary {
    Height: number
    ShardIndex: number
    ExecIndex: number
    RelayGroupIndex: number
    ShardOrder: number
    BlockTime: number
    TxnHash: string
    TxnType: string
    Initiator: string
    Target: string
    OriginalTxnHash: string
    Invocation: any
    TxnTime: number
    Func: string
  }

  interface TxDetail {
    BlockTime: number
    Height: number
    Initiator: string
    Address: string
    BuildNum: number
    ConfirmedBy: string
    ConfirmState?: string
    ExecStage: string
    Function: string
    GasOffered: number
    GasPrice: string
    Grouped: false
    Hash: string
    Packing?: string
    Relays?: Array<TxDetail>
    Input: {
      [key: string]: string | number
    }
    Invocation: {
      [key: string]: string | number
    }
    Mode: string
    OrigExecIdx: number
    OrigTxHash: string
    Shard: number[]
    Size: number
    Signers?: string[]
    Timestamp: number
    ISN?: number
  }

  interface Invocation {
    Return: [number, number]
    Input: {
      Reward: string
      Amount: string
      To: string
      [key: string]: any
    }
    GasOffered?: string
    GasPrice?: string
    GasFee?: string
    TokenSupply?: string[]
  }

  interface ExcutedTx {
    Height: number
    BlockTime: number
    Initiator: string
    Target: string
    IsFinalized: number | undefined
    OriginalTxnHash: string
    Invocation: Invocation
    Func: string
    Contract: string
    TxnHash: string
    TxnStatus: string
    RelayReturn: string
    TokenSymbol?: string
    TokenInitial?: string
    TokenDecimals?: number
    RelayGroupIndex: number
    TokenAmount?: string
  }

  interface BlockResp {
    TotalNum: number
    ListData: ExcutedTx[]
  }

  interface Address {
    Symbol?: string
    Delegator?: string
    TotalSupply?: string
    ID?: number
    Flags?: number
    Metadata?: MetaData
    Address?: string
    Balance?: string
    Height?: number
    Name?: string
    Hash?: string
    Wallet?: { [id: string]: string | number }[]
    Definition?: {
      hash: string
      name: string
      series: number
    }
  }

  interface ChainStatus {
    BlockInterval: number
    ForkRate: number
    TotalBlocks: number
    Difficulty: number
    AvgGasPrice: number
    ShardOrder: number
    Throughput: number
    TotalTxn: number
    TotalStateSize: number
    MempoolSize: number
    AddressCount: number
    Height: number
    DeployName: string
    ChainVersion: number
    NumShards: number
  }
}

function checkStatus(response: Response) {
  if (response.ok) {
    return response
  } else {
    return Promise.reject(response)
  }
}

export default class Fetcher {
  prune = (url: string) => (url.endsWith('/') ? url.slice(0, -1) : url)

  get<T>(service: string, options: any): Promise<T> {
    return new Promise(async (res) => {
      const { dioxide } = provider.get()
      options = { credentials: 'omit', ...options }

      let absoluteUrl = service.startsWith('http') ? service : dioxide + service

      if (options.data) {
        const data = shakeKeyValue(options.data) || {}
        absoluteUrl += '?' + querystring.stringify(data, { encode: false })
      }

      fetch(absoluteUrl, options)
        .then(checkStatus)
        .then((r) => r.text().then((text) => res(json.parse(text))))
    })
  }

  post<T>(service: string, options: RequestInit = {}): Promise<T> {
    return new Promise(async (res) => {
      const { dioxide } = provider.get()
      const { body } = options
      const concatOption: RequestInit = {
        ...options,
        method: 'post',
        body,
      }
      const absoluteUrl = service.startsWith('http')
        ? service
        : dioxide + (service.startsWith('/') ? service.slice(1) : service)

      fetch(absoluteUrl, concatOption)
        .then(checkStatus)
        .then((r) => r.json().then((json) => res(json as T)))
    })
  }
}
