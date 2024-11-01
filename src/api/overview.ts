import Request from './request'

class OverviewService extends Request {

  getAverageGasPrice() {
    return this.get<DioxScanChainBasicInfo>('', {
      data: {
        module: 'chain',
        action: 'status',
      },
    })
  }

  generateISN(params: { address: string }) {
    return this.get<Override>('', {
      data: {
        module: 'address',
        action: 'status',
        ...params,
      },
    })
  }
}

export default OverviewService