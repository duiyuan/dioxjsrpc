/**
 * @description tx module: transaction module, compose, sign, send, sendWithSK on chain
 * @description rpc module: rpc call module, call rpc api
 */

import Request from '../api/request'
import TxService from '../api/tx'

export default class Tx extends Request {
  txSvc: TxService

  constructor() {
    super()
    this.txSvc = new TxService()
  }

  /**
   * Compose transaction
   * @param params Transaction parameters
   * @param params.function Required. Contract method call, format: `<dapp>.<contract>.<function>`
   *
   * **System Contract Methods:**
   *
   * **core.coin** (Native token contract)
   * - `core.coin.faucet` - Get 1 SATOSHI_UNIT (100000000) DIO tokens, no gas cost, no args
   * - `core.coin.mint` - Mint DIO tokens, no gas cost. Args: { Amount: number }
   * - `core.coin.burn` - Burn DIO tokens, costs gas. Args: { Amount: number }
   * - `core.coin.transfer` - Transfer DIO tokens, costs gas. Args: { To: string, Amount: number }
   *
   * **core.wallet** (Wallet contract for tokens created by create_token)
   * - `core.wallet.transfer` - Transfer tokens, costs gas. Args: { To: string, TokenId: string, Amount: number }
   * - `core.wallet.burn` - Burn tokens. Args: { TokenId: string, Amount: number }
   * - `core.wallet.reclaim` - Reclaim gas refund and token residual from other shards.
   *   Args: { Refund: boolean, Residual: boolean, Token: string }
   *
   * **core.delegation** (Dapp, token, contract management)
   * - `core.delegation.create` - Create dapp.
   *   Args: { Type: 10, Name: string (length 4-8), Deposit: number (min 10000000) }
   * - `core.delegation.deploy_contracts` - Deploy contracts.
   *   Args: { code: string[], cargs: string[], time?: number (default 20s) }
   * - `core.delegation.create_token` - Create token.
   *   Args: {
   *     MinterFlags: 0|1|2|3 (0: no mint unchangeable, 1: mint allowed changeable, 2: no mint unchangeable, 3: mint allowed unchangeable),
   *     TokenStates: 0|1 (0: minter changeable, 1: minter unchangeable),
   *     Minter: number (contract id, can be 0 initially),
   *     Symbol: string (uppercase),
   *     InitSupply: number,
   *     Deposit: number (min 10000000),
   *     Decimals: number (1-31)
   *   }
   * - `core.delegation.set_token_minter` - Set token minter.
   *   Args: { Minter: number (contract id), MinterFlags: 0|1|2|3 }
   *
   * **core.profile**
   * - `core.profile.set` - Set metadata. Args: { Metadata: object }
   *
   * @param params.args Required. Contract method arguments as JSON object
   * @param params.sender Optional. Sender address, required if not a delegate call
   * @param params.delegatee Optional. Delegatee address, use dapp address for contract deployment
   * @param params.gasprice Optional. Gas price, defaults to current average gasprice
   * @param params.ttl Optional. Time to live in minutes, range 1-480, default 30
   * @param params.sigcount Optional. Number of signers, default 1
   * @param params.tokens Optional. Tokens to carry, format `[{tokenId: amount}, ...]`, amount as string
   * @param params.gaslimit Optional. Max gas limit (uint32), max 4294967295
   * @param params.isn Optional. Custom transaction isn field, defaults to next expected isn from tx pool
   */
  async compose(params: {
    function: string
    args: Record<string, any>
    sender?: string
    delegatee?: string
    gasprice?: number
    ttl?: number
    sigcount?: number
    tokens?: Record<string, string>[]
    gaslimit?: number
    isn?: string
  }) {
    return this.txSvc.compose(params)
  }

  async sign(params: { sk: string[]; txdata: string }) {
    return this.txSvc.sign(params)
  }

  async send(params: { txdata: string }) {
    return this.txSvc.send(params)
  }

  /**
   * Send transaction with private key (compose + sign + send in one step)
   * @param params Transaction parameters
   * @param params.privatekey Required. User private key
   * @param params.function Required. Full contract method name, format: `<DappName>.<ContractName>.<Scope>.<FunctionName>`
   * @param params.args Optional. Contract method arguments
   * @param params.delegatee Optional. Delegatee address, use dapp address for contract deployment
   * @param params.tokens Optional. Tokens to carry, format `[{tokenId: amount}, ...]`, amount as big integer string
   */
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
