import { fullAddress, isValidAddress } from '../utils'
import AddressService from '../api/address'
import { getDefaultToken, NET } from '../constants'
import { Transaction } from './transaction'
import provider from '../api/provider'
import Blocks from '../api/block'
import Overview from '../api/overview'

// import { DioFunction } from "./constants"

class Web3 {
  private net: Provider
  private addrService: AddressService
  public composeTransaction: Transaction['compose']
  public signTransaction: Transaction['sign']
  public getTransaction: Transaction['getTxn']
  public sendTransaction: Transaction['send']
  public getEstimatedFee: Transaction['getGas']

  blocks: Blocks
  overview: Overview

  constructor(net: Provider) {
    this.net = net || NET.TEST
    provider.set(this.net)
    this.addrService = new AddressService()
    const txn = new Transaction()
    this.composeTransaction = txn.compose.bind(txn)
    this.signTransaction = txn.sign.bind(txn)
    this.getTransaction = txn.getTxn.bind(txn)
    this.sendTransaction = txn.send.bind(txn)
    this.getEstimatedFee = txn.getGas.bind(txn)

    this.blocks = new Blocks()
    this.overview = new Overview()

    console.log('Dioxide initialized with net: ', this.net)
  }

  setProvider(net: Provider) {
    provider.set(this.net)
  }

  private checkAddress(address: string) {
    if (!address || !isValidAddress(address)) {
      throw new Error('Address is not valid')
    }
  }

  async getBalance(address: string) {
    const fullAddr = fullAddress(address)
    this.checkAddress(fullAddr)
    return this.addrService.getBalance(fullAddr).then((res) => {
      const dToken = getDefaultToken()
      const balance = res.Result?.State?.Balance.match(/\d+/g)
      if (res.Result?.Wallet) {
        const defaultToken = res.Result?.Wallet?.find(
          (w) => w.symbol === dToken.symbol,
        )
        if (defaultToken) {
          return BigInt((defaultToken?.amount || '0').toString().split(':')[0])
        }
      }
      return balance ? BigInt(balance[0]) : BigInt(0)
    })
  }

  async getAddressInfo(address: string) {
    const fullAddr = fullAddress(address)
    this.checkAddress(fullAddr)
    return this.addrService.getBaseInfo(fullAddr).then(res => res.Result).catch(err => ({
    }))
  }

  async getAddressTokens(address: string) {
    const fullAddr = fullAddress(address)
    this.checkAddress(fullAddr)
    return this.addrService.getTokens(fullAddr)
  }
}

export { Web3 }
