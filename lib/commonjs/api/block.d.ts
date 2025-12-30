import Request from './request';
import { DIOX } from './type';
declare class BlockSvc extends Request {
    getExcutedTx(params: {
        height: number;
        limit?: number;
        pos?: number;
    }): Promise<DIOX.ExcutedTx | undefined>;
}
export default BlockSvc;
