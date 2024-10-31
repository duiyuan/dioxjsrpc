

import { fullAddress, isValidAddress } from "../utils"
import AddressService from "../api/address"
import { getDefaultToken, NET } from "../constants"
import { Transaction } from './transaction'
// import { DioFunction } from "./constants"

class Web3 {
  private net: NET
  private addrService: AddressService
  public composeTransaction: Transaction["compose"]
  public signTransaction: Transaction["sign"]
  public getTransaction: Transaction["getTxn"]
  public sendTransaction: Transaction["send"]
  public getEstimatedFee: Transaction["getGas"]

  constructor(net: NET) {
    this.net = net || NET.TEST
    this.addrService = new AddressService(this.net)
    const txn = new Transaction(this.net)
    this.composeTransaction = txn.compose.bind(txn)
    this.signTransaction = txn.sign.bind(txn)
    this.getTransaction = txn.getTxn.bind(txn)
    this.sendTransaction = txn.send.bind(txn)
    this.getEstimatedFee = txn.getGas.bind(txn)
    console.log("Dioxide initialized with net: ", this.net)
  }

  private checkAddress(address: string) {
    if (!address || !isValidAddress(address)) {
      throw new Error("Address is not valid")
    }
    const [addr] = address.split(":")
    address = addr + ':ed25519'
  }

  async getBalance(address: string) {
    this.checkAddress(address)
    return this.addrService.getBalance(fullAddress(address)).then((res) => {
      const dToken = getDefaultToken()
      const balance = res.Result?.State?.Balance.match(/\d+/g)
      if (res.Result?.Wallet) {
        const defaultToken = res.Result?.Wallet?.find(
          (w) => w.symbol === dToken.symbol
        )
        if (defaultToken) {
          return BigInt((defaultToken?.amount || '0').toString().split(':')[0])
        }
      }
      return balance ? BigInt(balance[0]) : BigInt(0)
    })
  }

  async getAddressInfo(address: string) {
    this.checkAddress(address)
    return this.addrService.getBaseInfo(fullAddress(address))
  }
}

export {
  Web3
}