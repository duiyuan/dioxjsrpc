"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3 = void 0;
const index_1 = require("../constants/index");
const address_1 = __importDefault(require("../api/address"));
const transaction_1 = require("./transaction");
const provider_1 = __importDefault(require("../api/provider"));
const block_1 = __importDefault(require("../api/block"));
const overview_1 = __importDefault(require("../api/overview"));
const dx_1 = __importDefault(require("./dx"));
const tx_1 = __importDefault(require("./tx"));
const version_1 = require("../constants/version");
class Web3 {
    constructor(net) {
        this.net = net || index_1.NET.TEST;
        provider_1.default.set(this.net);
        this.addr = new address_1.default();
        this.blocks = new block_1.default();
        this.overview = new overview_1.default();
        this.txn = new transaction_1.Transaction();
        this.dx = new dx_1.default();
        this.tx = new tx_1.default();
        console.log('Dioxide initialized with net: ', this.net);
    }
    setProvider(net) {
        this.net = net;
        provider_1.default.set(net);
    }
    static version() {
        return version_1.LIB_VERSION;
    }
}
exports.Web3 = Web3;
//# sourceMappingURL=index.js.map