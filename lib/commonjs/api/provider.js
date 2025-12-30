"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../constants/index");
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
        const { dioxide, rpc } = (0, index_1.getProvider)(net);
        this.dioxide = dioxide;
        this.rpc = rpc;
    }
}
exports.default = new SingleProvider();
//# sourceMappingURL=provider.js.map