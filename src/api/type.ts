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
    Invocation: Invocation
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
    Invocation: Invocation
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

export interface OriginalTxn {
  gasprice: string | number
  sender: string
  function: string
  args: KeyValue
  delegatee?: string | number
  gaslimit?: string | number
  tokens?: { [key: string]: string }[]
  scale?: number
}

export interface AddrBalance {
  Address: string
  Height: 49
  State: {
    Balance: string
  }
  Wallet: { symbol: string; amount: string }[]
}

export interface TxDetailResponse {
  Hash: string
  Content: DIOX.TxDetail
}