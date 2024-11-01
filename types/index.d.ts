type Provider = string | { dioxide: string; rpc: string }

interface KeyValue<T = any> {
  [props: string]: T
}

interface CommonResponse<T> {
  Status: number
  Message: string
  Result?: T
}

declare namespace DIOX {
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
    Packing?: string // 是否打包交易
    Relays?: Array<TxDetail> // 交易打包列表
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

  interface Block {
    Height: number
    BlockTime: number
    Initiator: string
    Target: string
    IsFinalized: number | undefined
    Invocation: {
      Return: number | any
      Input: {
        Reward: string
        Amount: string
        To: string
        [key: string]: any
      }
      GasOffered?: number
      GasPrice?: number
      GasFee?: number
      TokenSupply?: string[]
    }
    Func: string
    TxnHash: string
    TxnStatus: string
    RelayReturn: string
    TokenSymbol?: string
    TokenInitial?: string
    TokenDecimals?: number
    RelayGroupIndex: number
    TokenAmount?: string
  }

  interface Address {
    Symbol?: string
    Delegator?: string
    TotalSupply?: string
    ID?: number
    Flags?: number // 右移22位取低6位 代表Decimals
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
interface AddrBalance {
  Address: string
  Height: 49
  State: {
    Balance: string
  }
  Wallet: { symbol: string; amount: string }[]
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

type DioxScanChainBasicInfo = CommonResponse<{
  AvgGasPrice: number
}>

type Override = CommonResponse<{
  Address: string
  Height: number
  NextISN: number
}>

interface OriginalTxn {
  gasprice: string
  sender: string
  function: string
  args: KeyValue,
  delegatee?: string
  gaslimit?: string
  tokens?: string[]
  scale?: number
}