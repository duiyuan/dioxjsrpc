import Address from '../api/address';
import { Transaction } from './transaction';
import Blocks from '../api/block';
import Overview from '../api/overview';
import Dx from './dx';
import Tx from './tx';
declare class Web3 {
    private net;
    addr: Address;
    txn: Transaction;
    blocks: Blocks;
    overview: Overview;
    dx: Dx;
    tx: Tx;
    constructor(net: Provider);
    setProvider(net: Provider): void;
    static version(): string;
}
export { Web3 };
