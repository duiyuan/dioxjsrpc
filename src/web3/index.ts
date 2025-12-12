import { NET } from '../constants'
import Address from '../api/address'
import { Transaction, TxOption, SignMethod } from './transaction'
import Account from './account'
import Contract from './contract'
import provider from '../api/provider'
import Blocks from '../api/block'
import Overview from '../api/overview'
import Proof from './proof'
import Dx from './dx'
import Tx from './tx'

class Web3 {
  private net: Provider = NET.TEST

  address?: Address
  txn?: Transaction
  block?: Blocks
  overview?: Overview
  proof?: Proof
  account?: Account
  contract?: Contract
  dx?: Dx
  tx?: Tx

  constructor(config: { net?: Provider } & TxOption = {}) {
    const { net, ...opts } = config
    const options: TxOption = {
      alg: 'sm2',
      showTxFlow: false,
      ...opts,
    }

    const { apiKey, bcBaseUrl } = options

    // validate at least one configuration is provided
    if (!apiKey && !bcBaseUrl) {
      throw new Error(
        'you must provide at least one of the following parameters: apiKey or bcBaseUrl\n' +
          '- use Dioxide service (address, block, etc.): provide net and apiKey\n' +
          '- use bc rpc service: provide bcBaseUrl\n' +
          '- use both services: provide all parameters',
      )
    }

    // initialize regular service (need net and apiKey)
    if (apiKey && net) {
      this.net = net
      provider.set(this.net)
      provider.setApiKey(apiKey)

      this.address = new Address({ apiKey })
      this.block = new Blocks({ apiKey })
      this.overview = new Overview({ apiKey })
      this.account = new Account({ apiKey })
      this.contract = new Contract({ apiKey })
      this.txn = new Transaction(options)
      this.proof = new Proof(options)
    } else if (apiKey && !net) {
      console.warn('you provided apiKey but did not provide net parameter, dioxide service will be unavailable')
    }

    // initialize bc rpc service (only need bcBaseUrl, apiKey is optional)
    if (bcBaseUrl) {
      this.dx = new Dx({ path: bcBaseUrl, apiKey: apiKey || '' })
      this.tx = new Tx({ path: bcBaseUrl, apiKey: apiKey || '' })
    }

    // update net (if provided)
    if (net) {
      this.net = net
    }
  }

  setProvider(net: Provider) {
    this.net = net
    provider.set(net)
  }
}

export { Web3, type SignMethod }
