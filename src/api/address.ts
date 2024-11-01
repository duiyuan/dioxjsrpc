import Request from './request'

type ListParmas = {
  address?: string
  addresstxntype?: string
  shardIndex?: string
  height?: number
  pos?: number
  limit?: number
}

class AddressService extends Request {

  getListByAddress(params?: ListParmas) {
    return this.get<DioxScanTxResponse>('', {
      data: {
        module: 'address',
        action: 'listtxn',
        ...params,
      },
    })
  }

  getBaseInfo(address: string) {
    return this.get<CommonResponse<AddrBaseInfo>>('', {
      data: {
        module: 'address',
        action: 'baseinfo',
        address: address.replace(/#/g, '%23'),
      },
    })
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
    return this.get<CommonResponse<AddrBalance>>('', {
      data: {
        module: 'address',
        action: 'balance',
        address: address.replace(/#/g, '%23'),
      },
    })
  }

  getTokens(address: string) {
    return this.get<
      CommonResponse<{ TotalNum: number; ListData: TokenItem[] }>
    >('', {
      data: {
        module: 'address',
        action: 'tokens',
        address: address.replace(/#/g, '%23'),
      },
    })
  }

}

export default AddressService
