import { getProvider } from '../constants/index.js';
class SingleProvider {
    constructor() {
        this.dioxide = '';
        this.rpc = '';
    }
    get() {
        return {
            dioxide: this.dioxide,
            rpc: this.rpc,
        };
    }
    set(net) {
        const { dioxide, rpc } = getProvider(net);
        this.dioxide = dioxide;
        this.rpc = rpc;
    }
}
export default new SingleProvider();
//# sourceMappingURL=provider.js.map