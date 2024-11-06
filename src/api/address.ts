import { getDefaultToken } from '../constants'
import { fullAddress, isValidAddress } from '../utils'
import Request, { DIOX } from './request'

type ListParmas = {
  address?: string
  addresstxntype?: string
  shardIndex?: string
  height?: number
  pos?: number
  limit?: number
}

class AddressService extends Request {

  private checkAddress(address: string) {
    if (!address || !isValidAddress(address)) {
      throw new Error('Address is not valid')
    }
  }

  getISN(address: string) {
    return this.get<Override>('', {
      data: {
        module: 'address',
        action: 'status',
        address,
      },
    })
  }

  getListByAddress(params?: ListParmas) {
    return this.get<DioxScanTxResponse>('', {
      data: {
        module: 'address',
        action: 'listtxn',
        ...params,
      },
    })
  }

  getAddressInfo(address: string) {
    const fullAddr = fullAddress(address)
    return this.get<CommonResponse<AddrBaseInfo>>('', {
      data: {
        module: 'address',
        action: 'baseinfo',
        address: fullAddr.replace(/#/g, '%23'),
      },
    }).then(res => res.Result).catch(err => ({
    }))
  }

  getDetailInfo(address: string) {
    return this.get<CommonResponse<DIOX.Address>>('', {
      data: {
        module: 'address',
        action: 'detail',
        address: address.replace(/#/g, '%23'),
      },
    })
  }

  getBalance(address: string) {
    const fullAddr = fullAddress(address)
    this.checkAddress(fullAddr)
    return this.get<CommonResponse<AddrBalance>>('', {
      data: {
        module: 'address',
        action: 'balance',
        address: fullAddr.replace(/#/g, '%23'),
      },
    }).then((res) => {
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

  getAddressTokens(address: string) {
    const fullAddr = fullAddress(address)
    this.checkAddress(fullAddr)
    return this.get<
      CommonResponse<{ TotalNum: number; ListData: TokenItem[] }>
    >('', {
      data: {
        module: 'address',
        action: 'tokens',
        address: fullAddr.replace(/#/g, '%23'),
      },
    })
  }

  async getAddressTokenBalance(address: string, token: string) {
    const fullAddr = fullAddress(address)
    this.checkAddress(fullAddr)
    const res = await this.getDetailInfo(address)
    if (res?.Result?.Wallet) {
      const defaultToken = res.Result?.Wallet?.find(
        (w) => w.symbol === token.split(':')[0],
      )
      if (defaultToken) {
        return defaultToken.amount
      }
    }
    return 0
  }
}

export default AddressService
