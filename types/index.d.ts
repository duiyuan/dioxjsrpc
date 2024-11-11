type Provider = string | { dioxide: string; rpc: string }

interface KeyValue<T = any> {
  [props: string]: T
}

interface CommonResponse<T> {
  Status: number
  Message: string
  Result?: T
}

interface TokenItem {
  Address?: string
  TokenID: number
  Amount?: string
  Symbol: string
  Height?: number
  FutureMint?: number
  Decimals: number
  Balance?: number | string
  Wallet?: { symbol: string; amount: string }[]
  IconUrl?: string
  Metadata?: DIOX.MetaData
}

/** address */
interface AddrBaseInfo {
  Address: string
  State: {
    Metadata: DIOX.MetaData
  }
}

interface Blocks {
  TotalNum: number
  TxType: string
  ListData: DIOX.Block[]
}

type DioxScanTxResponse = CommonResponse<{
  TotalNum: number
  ListData: DIOX.TxSummary[]
}>

type DioxScanChainBasicInfo = CommonResponse<DIOX.ChainStatus>

type Override = CommonResponse<{
  Address: string
  Height: number
  NextISN: number
}>
