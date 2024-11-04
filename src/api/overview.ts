import Request from './request'

class OverviewService extends Request {
  chainStatus() {
    return this.get<DioxScanChainBasicInfo>('', {
      data: {
        module: 'chain',
        action: 'status',
      },
    })
  }
}

export default OverviewService
