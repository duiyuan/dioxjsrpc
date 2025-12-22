# @dioxide-js/dioxjs-nkp
@dioxide-js/dioxjs-nkp is a Nodejs SDK implementation of the [Dioxide RPC API](https://docs.dioxide.network/doc/RPC) and [Dioxide Service AI](https://docs.dioxide.network/doc/Dioscan%20Service%20API/)

## Installation

### Using NPM

```bash
npm install @dioxide-js/web3.js
```

### Using Yarn

```bash
yarn add @dioxide-js/dioxjs-nkp
```

## Getting Started

```js
import { Web3, NET } from '@dioxide-js/dioxjs-nkp';

const web3 = new Web3(NET.TEST);

// Get the balance of an address
const balance = await web3.addr.getBalance('0x1234567890abcdef1234567890abcdef12345678');

// Transfer dio
const txnHash = await web3.txn.transfer({
  to: '0x1234567890abcdef1234567890abcdef12345678:ed25519',
  amount: '10000000000',
  secretKey: secretKey,
})

// Transfer fca token
const txnHash = await web3.txn.transferFCA({
  symbol: 'FCA',
  to: '0x1234567890abcdef1234567890abcdef12345678:ed25519',
  amount: '10000000000',
  secretKey: secretKey,
})
```

## API

### web3.addr

#### web3.addr.getBalance(address: string)
```js
const balance = await web3.addr.getBalance('eqfkk71rg18mcjcp63tkcz4xpcxd91wtd5atpwk82j2jmcdeb50j6es2xm')
// '1000000000000000000000'
```
#### web3.addr.getISN(address: string)
```js
const isn = await web3.addr.getISN('eqfkk71rg18mcjcp63tkcz4xpcxd91wtd5atpwk82j2jmcdeb50j6es2xm')
// 1
```
#### web3.addr.getAddressTokens(address: string)
```js
const tokens = await web3.addr.getAddressTokens('eqfkk71rg18mcjcp63tkcz4xpcxd91wtd5atpwk82j2jmcdeb50j6es2xm')
[{
  TokenID: '5789767',
  Address: 'GXX:token',
  Symbol: 'GXX',
  TokenState: 0,
  Decimals: 8,
  Amount: '3018154202998548',
  StateHeight: 294558
}]
```
#### web3.addr.getAddressTokenBalance(address: string, token: string)
```js
const tokenbalance = await web3.addr.getAddressTokenBalance('eqfkk71rg18mcjcp63tkcz4xpcxd91wtd5atpwk82j2jmcdeb50j6es2xm', 'FXX')
// '1000000000000000000000'
```
#### web3.addr.getAddressInfo(address: string): [DIOX.AddressBaseInfo](#dioxaddressbaseinfo)
```js
const info = await web3.addr.getAddressInfo('eqfkk71rg18mcjcp63tkcz4xpcxd91wtd5atpwk82j2jmcdeb50j6es2xm')
{
  Address: 'eqfkk71rg18mcjcp63tkcz4xpcxd91wtd5atpwk82j2jmcdeb50j6es2xm:ed25519',
  ShardOrder: 2,
  ShardIndex: 2,
  State: {
    Metadata: {
      Name: 'address Name',
      Description: 'address Description',
      IconUrl: 'address Icon'
      Website: 'https://address.website.com',
      Social: {
        Github: string
        Discord: string
        Twitter: string
        Telegram: string
        Facebook: string
        Email: string
      }
    }
  }
}
```
#### web3.addr.getTxnListByAddress(params: [ListParmas](#listparmas)[]): [DIOX.TxSummary](#dioxtxsummary)[]
```js
const txnList = await web3.addr.getTxnListByAddress({address: 'eqfkk71rg18mcjcp63tkcz4xpcxd91wtd5atpwk82j2jmcdeb50j6es2xm'})
{
  TotalNum: 404,
  ListData: DIOX.TxSummary[]
}
```

### web3.txn
#### web3.txn.sign(txdata: [OriginalTxn](#originaltxn), secretKey: string)
```js
const txn = await web3.txn.sign(
  {
    sender: 'eqfkk71rg18mcjcp63tkcz4xpcxd91wtd5atpwk82j2jmcdeb50j6es2xm:ed25519',
    gasprice: 100,
    function: 'core.wallet.transfer',
    args: {
      Amount: '10000000000',
      To: 'qzysdapqk4q3442fx59y2ajnsbx5maz3d6japb7jngjrqq5xqddh60n420:ed25519',
      TokenId: 'GXX',
    },
    ttl: '30',
    tokens: [{'FXX': '10000000000'}]
  },
  secretKey,
)
{
  rawTxData: base64rawdata,
  hash: 'wkapenmgkqre483cg344a8bxstrq4nsj1matcdmtjna03tcmkc10'
}
```
#### web3.txn.send(originalTxn: [OriginalTxn](#originaltxn), secretKey: string)
```js
const txHash = await web3.txn.send(
  {
    sender: 'eqfkk71rg18mcjcp63tkcz4xpcxd91wtd5atpwk82j2jmcdeb50j6es2xm:ed25519',
    gasprice: 100,
    function: 'core.wallet.transfer',
    args: {
      Amount: '10000000000',
      To: 'eqfkk71rg18mcjcp63tkcz4xpcxd91wtd5atpwk82j2jmcdeb50j6es2xm:ed25519',
      TokenId: 'GXX',
    },
    ttl: '30',
  },
  secretKey,
)
//wkapenmgkqre483cg344a8bxstrq4nsj1matcdmtjna03tcmkc10
```
#### web3.txn.getTxn(hash: string): [DIOX.TxDetail](#dioxtxdetail)
```js
const txn = await web3.txn.getTxn('wkapenmgkqre483cg344a8bxstrq4nsj1matcdmtjna03tcmkc10')
//DIOX.TxDetail
```
#### web3.txn.getEstimatedFee(originTxn: [OriginalTxn](#originaltxn))
```js
const txn = await web3.txn.getEstimatedFee({
    sender: '0x1234567890abcdef1234567890abcdef12345678:ed25519',
    gasprice: 100,
    function: 'core.wallet.transfer',
    args: {
      Amount: '10000000000',
      To: '0x1234567890abcdef1234567890abcdef12345678:ed25519',
      TokenId: 'FCA',
    },
  })
//95500
```
#### web3.txn.sendRawTx(rawTxData: string)
```js
const txnHash = await web3.txn.sendRawTx(base64rawData)
//txnHash
```
#### web3.txn.transfer({to: string, amount: string, secretKey: Unit8Array })
```js
const txnHash = await web3.txn.transfer({
  to: '0x1234567890abcdef1234567890abcdef12345678:ed25519',
  amount: '10000000000',
  secretKey: secretKey,
})
//txnHash
```
#### web3.txn.transferFCA({to: string, amount: string, symbol: string, secretKey: Unit8Array })
```js
const txnHash = await web3.txn.transferFCA({
  to: '0x1234567890abcdef1234567890abcdef12345678:ed25519',
  amount: '10000000000',
  symbol: 'FCA',
  secretKey: secretKey,
})
//txnHash
```
### web3.dx

Chain information query module.

#### web3.dx.overview()
Get chain overview information.
```js
const overview = await web3.dx.overview()
// {
//   VersionName: 'v1.0.0',
//   DeployName: 'testnet',
//   ChainVersion: 1,
//   Time: 1703232000,
//   BlockTime: 1000,
//   ShardOrder: 2,
//   ShardOnDuty: [0, 1, 2, 3],
//   HeadHeight: 12345,
//   HeadHash: 'abc123...',
//   ...
// }
```

#### web3.dx.getCommittedHeadHeight()
Get committed head height and hash.
```js
const head = await web3.dx.getCommittedHeadHeight()
// { HeadHeight: 12345, HeadHash: 'abc123...' }
```

#### web3.dx.isMining()
Check if node is mining.
```js
const mining = await web3.dx.isMining()
// { Mining: true }
```

#### web3.dx.getShardInfo(shard_index: number | string)
Get shard information by index.
```js
const shardInfo = await web3.dx.getShardInfo(0)
// {
//   ShardIndex: 0,
//   Height: 12345,
//   SnapshotHeight: 12300,
//   BlockInMem: 100,
//   ResidentTxn: 50,
//   PendingTxn: 10,
//   RequestingTxn: 5,
//   StateSize: 1000000,
//   AccumTxnCount: [100, 200, 300]
// }
```

#### web3.dx.getShardIndexByScope(scope: string, scope_key?: string)
Get shard index by scope. Scope can be: `global`, `shard`, `address`, `uint32`, `uint64`, `uint128`, `uint256`, `uint512`.
```js
// For global scope
const globalShard = await web3.dx.getShardIndexByScope('global')
// { ShardIndex: 65535 }

// For address scope
const addressShard = await web3.dx.getShardIndexByScope('address', 'eqfkk71rg18mcjcp63tkcz4xpcxd91wtd5atpwk82j2jmcdeb50j6es2xm:ed25519')
// { ShardIndex: 2 }
```

#### web3.dx.getMempool(shard_index?: number, archived?: number)
Get mempool transactions. If no shard_index provided, returns all shards.
```js
// Get all shards mempool
const allMempool = await web3.dx.getMempool()
// { g: [...], 0: [...], 1: [...] }

// Get specific shard mempool
const shardMempool = await web3.dx.getMempool(65535)
// [{ TXID: 'abc...', State: 'pending' }, ...]
```

#### web3.dx.getContractState(contract_with_scope: string, scope_key: string)
Get contract state. Contract format: `<dapp>.<contract>.<scope>` or `<cid>.<scope>`.
```js
const state = await web3.dx.getContractState('core.coin.address', 'eqfkk71rg18mcjcp63tkcz4xpcxd91wtd5atpwk82j2jmcdeb50j6es2xm:ed25519')
// {
//   Size: 100,
//   Contract: 'core.coin.address',
//   State: { ... },
//   BuildNum: '1',
//   Commit: { Height: 12345, Proof: 0, Shard: [0, 1] }
// }
```

#### web3.dx.getConsensusHeader(params: object)
Get consensus header by height, hash, or range.
```js
// Query by height
const header = await web3.dx.getConsensusHeader({ query_type: 0, height: 100 })

// Query by hash
const headerByHash = await web3.dx.getConsensusHeader({ query_type: 1, hash: 'abc123...' })

// Query by range
const headers = await web3.dx.getConsensusHeader({ query_type: 2, start: 100, end: 200 })
```

#### web3.dx.getTransactionBlock(params: object)
Get transaction block by height, hash, or range.
```js
const block = await web3.dx.getTransactionBlock({
  query_type: 0,
  shard_index: 65535,
  height: 100
})
// {
//   Size: 1024,
//   Version: 1,
//   Scope: 'global',
//   Shard: [65535, 2],
//   Prev: 'abc...',
//   Transactions: { Scheduled: [], Confirmed: [], DispatchedRelays: [], Deferred: [] },
//   ...
// }
```

#### web3.dx.getTransactionByHash(hash: string, shard_index?: number)
Get transaction by hash.
```js
const tx = await web3.dx.getTransactionByHash('wkapenmgkqre483cg344a8bxstrq4nsj1matcdmtjna03tcmkc10')
// {
//   Hash: 'wkapenmgkqre483cg344a8bxstrq4nsj1matcdmtjna03tcmkc10',
//   Function: 'core.coin.transfer',
//   Input: { To: '...', Amount: '10000000' },
//   ...
// }
```

#### web3.dx.getDappInfo(name: string)
Get dapp information by name. Name must be 4-8 characters, containing only letters, numbers, `_`, `-`, `#`, or `@`.
```js
const dapp = await web3.dx.getDappInfo('core')
// { DAppID: 1, Address: 'core:dapp' }
```

#### web3.dx.generateKey(shard_index?: number, algo?: KeyAlgorithm)
Generate a new key pair. Algo: 0 = ed25519, 1 = ethereum, 2 = sm2.
```js
const key = await web3.dx.generateKey(0, 0)
// {
//   PrivateKey: 'abc123...',
//   PublicKey: 'def456...',
//   Address: 'eqfkk71rg18mcjcp63tkcz4xpcxd91wtd5atpwk82j2jmcdeb50j6es2xm:ed25519',
//   Shard: 0
// }
```

#### web3.dx.getISNByAddress(address: string)
Get ISN (Invocation Sequence Number) by address.
```js
const isn = await web3.dx.getISNByAddress('core:dapp')
// { ISN: 100 }
```

#### web3.dx.getContractInfo(contract: string)
Get contract information.
```js
const contractInfo = await web3.dx.getContractInfo('core.coin.address')
// {
//   ContractID: 1,
//   ContractVersionID: 1,
//   Functions: ['transfer', 'mint', 'burn'],
//   InterfaceImplemented: []
// }
```

#### web3.dx.getTokenInfo(symbol: string)
Get token information by symbol.
```js
const token = await web3.dx.getTokenInfo('DIO')
// { TokenID: 0, Address: 'DIO:token' }
```

#### web3.dx.getBlockTime(height: number)
Get block mined time by height.
```js
const blockTime = await web3.dx.getBlockTime(100)
// { BlockMinedTime: 1703232000 }
```

### web3.tx

Transaction module for composing, signing, and sending transactions.

#### web3.tx.compose(params: object)
Compose a transaction. Returns unsigned transaction data.

**Parameters:**
- `function` (Required): Contract method call, format: `<dapp>.<contract>.<function>`
- `args` (Required): Contract method arguments as JSON object
- `sender` (Optional): Sender address
- `delegatee` (Optional): Delegatee address
- `gasprice` (Optional): Gas price, defaults to current average
- `ttl` (Optional): Time to live in minutes (1-480), default 30
- `sigcount` (Optional): Number of signers, default 1
- `tokens` (Optional): Tokens to carry, format `[{tokenId: amount}, ...]`
- `gaslimit` (Optional): Max gas limit (uint32)
- `isn` (Optional): Custom ISN field

**System Contract Methods:**

| Contract | Method | Description | Args |
|----------|--------|-------------|------|
| `core.coin` | `faucet` | Get test DIO tokens | - |
| `core.coin` | `mint` | Mint DIO tokens | `{ Amount: number }` |
| `core.coin` | `burn` | Burn DIO tokens | `{ Amount: number }` |
| `core.coin` | `transfer` | Transfer DIO tokens | `{ To: string, Amount: number }` |
| `core.wallet` | `transfer` | Transfer tokens | `{ To: string, TokenId: string, Amount: number }` |
| `core.wallet` | `burn` | Burn tokens | `{ TokenId: string, Amount: number }` |
| `core.wallet` | `reclaim` | Reclaim gas/token residual | `{ Refund: boolean, Residual: boolean, Token: string }` |
| `core.delegation` | `create` | Create dapp | `{ Type: 10, Name: string, Deposit: number }` |
| `core.delegation` | `deploy_contracts` | Deploy contracts | `{ code: string[], cargs: string[], time?: number }` |
| `core.delegation` | `create_token` | Create token | `{ Symbol: string, InitSupply: number, Decimals: number, ... }` |
| `core.profile` | `set` | Set metadata | `{ Metadata: object }` |

```js
const composed = await web3.tx.compose({
  sender: 'eqfkk71rg18mcjcp63tkcz4xpcxd91wtd5atpwk82j2jmcdeb50j6es2xm:ed25519',
  function: 'core.coin.transfer',
  args: {
    To: 'qzysdapqk4q3442fx59y2ajnsbx5maz3d6japb7jngjrqq5xqddh60n420:ed25519',
    Amount: 10000000000
  },
  gasprice: 100,
  ttl: 30
})
// { TxData: 'base64encodeddata...', GasOffered: 21000 }
```

#### web3.tx.sign(params: { sk: string[], txdata: string })
Sign a composed transaction with private key(s).
```js
const signed = await web3.tx.sign({
  sk: ['privatekey1'],
  txdata: composed.TxData
})
// { TxData: 'signedbase64data...' }
```

#### web3.tx.send(params: { txdata: string })
Send a signed transaction to the network.
```js
const result = await web3.tx.send({ txdata: signed.TxData })
// { Hash: 'wkapenmgkqre483cg344a8bxstrq4nsj1matcdmtjna03tcmkc10' }
```

#### web3.tx.sendWithSK(params: object)
Compose, sign, and send transaction in one step. **For development use only!**

**Parameters:**
- `privatekey` (Required): User private key
- `function` (Required): Contract method name
- `args` (Optional): Contract method arguments
- `delegatee` (Optional): Delegatee address
- `tokens` (Optional): Tokens to carry

```js
const result = await web3.tx.sendWithSK({
  privatekey: 'your_private_key',
  function: 'core.coin.transfer',
  args: {
    To: 'qzysdapqk4q3442fx59y2ajnsbx5maz3d6japb7jngjrqq5xqddh60n420:ed25519',
    Amount: 10000000000
  }
})
// { Hash: 'wkapenmgkqre483cg344a8bxstrq4nsj1matcdmtjna03tcmkc10' }
```

### utils

#### utils.generateAddress(targetShardIndex: number): { address: string, seed:Unit8Array }
```js
const { address, seed } = utils.generateAddress(1)
// address: qzysdapqk4q3442fx59y2ajnsbx5maz3d6japb7jngjrqq5xqddh60n420: ed25519
```
#### utils.toTokenAmount(amount: string, decimals: number)
```js
const isValid = utils.toTokenAmount('100000000', 8)
//1
```
#### utils.isValidAddress(address: string)
```js
const isValid = utils.isValidAddress('qzysdapqk4q3442fx59y2ajnsbx5maz3d6japb7jngjrqq5xqddh60n420', 0)
//true
```
#### utils.extractPublicKey(address: string)
```js
const shardIndex = utils.extractPublicKey('qzysdapqk4q3442fx59y2ajnsbx5maz3d6japb7jngjrqq5xqddh60n420', 0)
//Unit8Array
```
#### utils.addressToShard(address: string, shardOrder?: number)
```js
const shardIndex = utils.addressToShard('qzysdapqk4q3442fx59y2ajnsbx5maz3d6japb7jngjrqq5xqddh60n420', 0)
//0
```

## types

### DIOX.MetaData
```js
interface MetaData {
    Description: string;
    IconUrl: string;
    Website: string;
    Social: {
        Github: string;
        Discord: string;
        Twitter: string;
        Telegram: string;
        Facebook: string;
        Email: string;
    };
}
```

### DIOX.AddressBaseInfo
```js
interface AddrBaseInfo {
    Address: string;
    State: {
        Metadata: DIOX.MetaData;
    };
}
```

### DIOX.TxSummary
```js
interface TxSummary {
    Height: number;
    ShardIndex: number;
    ExecIndex: number;
    RelayGroupIndex: number;
    ShardOrder: number;
    BlockTime: number;
    TxnHash: string;
    TxnType: string;
    Initiator: string;
    Target: string;
    OriginalTxnHash: string;
    Invocation: Invocation;
    TxnTime: number;
    Func: string;
}
```

### DIOX.TxDetail
```js
interface TxDetail {
    BlockTime: number;
    Height: number;
    Initiator: string;
    Address: string;
    BuildNum: number;
    ConfirmedBy: string;
    ConfirmState?: string;
    ExecStage: string;
    Function: string;
    GasOffered: number;
    GasPrice: string;
    Grouped: false;
    Hash: string;
    Packing?: string;
    Relays?: Array<TxDetail>;
    Input: {
        [key: string]: string | number;
    };
    Invocation: Invocation;
    Mode: string;
    OrigExecIdx: number;
    OrigTxHash: string;
    Shard: number[];
    Size: number;
    Signers?: string[];
    Timestamp: number;
    ISN?: number;
}
```

### OriginalTxn
```js
interface OriginalTxn {
    gasprice: string | number;
    sender: string;
    function: string;
    args: KeyValue;
    delegatee?: string | number;
    gaslimit?: string | number;
    tokens?: {
        [key: string]: string;
    }[];
    ttl: string | number;
    scale?: number;
}
```

### ListParmas
```js
interface ListParams {
  address: string
  addresstxntype?: string
  shardIndex?: string
  height?: number
  pos?: number
  limit?: number
}
```

### OverviewResponse
```js
interface OverviewResponse {
  VersionName: string
  DeployName: string
  ChainVersion: number
  Time: number
  BlockTime: number
  ShardOrder: number
  ShardOnDuty: number[]
  BlackListSize: number
  ScalingOut: boolean
  Rebase: boolean
  BaseHeight: number
  HeadHash: string
  HeadHeight: number
  TxnCount: number[]
  AvgGasPrice: string
}
```

### ShardInfoResponse
```js
interface ShardInfoResponse {
  ShardIndex: number
  Height: number
  SnapshotHeight: number
  BlockInMem: number
  ResidentTxn: number
  PendingTxn: number
  RequestingTxn: number
  StateSize: number
  AccumTxnCount: number[]
}
```

### ContractStateResponse
```js
interface ContractStateResponse {
  Size: number
  Contract: string
  State: Record<string, any>
  BuildNum: string
  Commit: {
    Height: number
    Proof: number
    Shard: number[]
  }
}
```

### ContractInfoResponse
```js
interface ContractInfoResponse {
  ContractID: number
  ContractVersionID: number
  Functions: string[]
  InterfaceImplemented: string[]
}
```

### GenerateKeyResponse
```js
interface GenerateKeyResponse {
  PrivateKey: string
  PublicKey: string
  Address: string
  Shard: number | string
}
```

### TransactionBlock
```js
interface TransactionBlock {
  Size: number
  Version: number
  Scope: string
  Shard: number[]
  Prev: string
  Transactions: {
    Scheduled: string[]
    Confirmed: string[]
    DispatchedRelays: string[]
    Deferred: string[]
  }
  Hash: string
  Height: number
  Timestamp: number
}
```

### KeyAlgorithm
```js
enum KeyAlgorithm {
  ED25519 = 0,
  ETHEREUM = 1,
  SM2 = 2
}
```

### ConsensusHeaderQueryType
```js
enum ConsensusHeaderQueryType {
  HEIGHT = 0,  // Query by height
  HASH = 1,    // Query by hash
  RANGE = 2    // Query by range (start/end)
}
```

## Package.json Scripts

| Script                         | Description                                                        |
| ------------------------------ | ------------------------------------------------------------------ |
| watch                          | Uses `tsc` to build all packages with watch mode                                  |
| build                          | Uses `tsc` to build all packages                                    |
| build:cjs                          | Uses `tsc` to build all packages to commonjs module                                   |
| build:esm                          | Uses `tsc` to build all packages to es module                                    |
| build:types                          | Uses `tsc` to build all packages to ts types                                    |
| build:check                          | Uses `node` to check packages build                                    |
| lint                           | Uses `eslint` to lint all packages                                 |
| lint:fix                       | Uses `eslint` to check and fix any warnings                        |
| test                           | Uses `jest` to run unit tests in each package                      |
