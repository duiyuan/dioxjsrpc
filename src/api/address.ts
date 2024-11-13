import { getDefaultToken } from '../constants'
import { fullAddress, isValidAddress } from '../utils'
import Request from './request'
import {
  AddrBalance,
  AddrBaseInfo,
  DIOX,
  DioxScanTxResponse,
  TokenItem,
} from './type'
import provider from './provider'

type ListParmas = {
  address?: string
  addresstxntype?: string
  shardIndex?: string
  height?: number
  pos?: number
  limit?: number
}

export function getISNUrl() {
  const { rpc } = provider.get()
  const encodeUri = encodeURI(rpc + '/api?req=dx.isn')
  return encodeUri
}

class AddressService extends Request {
  private checkAddress(address: string) {
    if (!address || !isValidAddress(address)) {
      throw new Error('Address is not valid')
    }
  }

  async getISN(address: string) {
    const fullAddr = fullAddress(address)
    this.checkAddress(fullAddr)
    const { err, ret } = await this.post<{
      err?: number
      rsp: string
      ret: { ISN: number }
    }>(getISNUrl(), {
      body: JSON.stringify({
        address: fullAddr,
      }),
    })
    if (err) throw err
    return ret?.ISN || 0
  }

  getTxnListByAddress(params?: ListParmas) {
    return this.get<DioxScanTxResponse>('', {
      data: {
        module: 'address',
        action: 'listtxn',
        ...params,
      },
    }).then(res => res.Result)
  }

  getAddressInfo(address: string) {
    const fullAddr = fullAddress(address)
    return this.get<CommonResponse<AddrBaseInfo>>('', {
      data: {
        module: 'address',
        action: 'baseinfo',
        address: fullAddr.replace(/#/g, '%23'),
      },
    })
      .then((res) => res.Result)
      .catch(() => ({}))
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

  getBalance(address: string): Promise<string> {
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
          return (defaultToken?.amount || '0').toString().split(':')[0]
        }
      }
      return balance?.[0] ?? '0'
    })
  }

  async getAddressTokens(address: string) {
    const fullAddr = fullAddress(address)
    this.checkAddress(fullAddr)
    const { Result } = await this.get<
      CommonResponse<{ TotalNum: number; ListData: TokenItem[] }>
    >('', {
      data: {
        module: 'address',
        action: 'tokens',
        address: fullAddr.replace(/#/g, '%23'),
      },
    })
    return Result?.ListData || []
  }

  async getAddressTokenBalance(
    address: string,
    token: string,
  ): Promise<string> {
    const fullAddr = fullAddress(address)
    this.checkAddress(fullAddr)
    const res = await this.getDetailInfo(address)
    if (res?.Result?.Wallet) {
      const defaultToken = res.Result?.Wallet?.find(
        (w) => w.symbol === token.split(':')[0],
      )
      if (defaultToken) {
        return defaultToken.amount.toString()
      }
    }
    return '0'
  }
}

export default AddressService
