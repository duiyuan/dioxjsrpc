import Request from './request';
declare class OverviewService extends Request {
    chainStatus(): Promise<import("./type").DIOX.ChainStatus>;
    getGasPrice(): Promise<number>;
}
export default OverviewService;
//# sourceMappingURL=overview.d.ts.map