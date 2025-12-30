import { NET } from '../constants/index.js';
import Address from '../api/address.js';
import { Transaction } from './transaction.js';
import provider from '../api/provider.js';
import Blocks from '../api/block.js';
import Overview from '../api/overview.js';
import Dx from './dx.js';
import Tx from './tx.js';
import { LIB_VERSION } from '../constants/version.js';
class Web3 {
    constructor(net) {
        this.net = net || NET.TEST;
        provider.set(this.net);
        this.addr = new Address();
        this.blocks = new Blocks();
        this.overview = new Overview();
        this.txn = new Transaction();
        this.dx = new Dx();
        this.tx = new Tx();
        console.log('Dioxide initialized with net: ', this.net);
    }
    setProvider(net) {
        this.net = net;
        provider.set(net);
    }
    static version() {
        return LIB_VERSION;
    }
}
export { Web3 };
//# sourceMappingURL=index.js.map