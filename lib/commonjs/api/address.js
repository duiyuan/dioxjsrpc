"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getISNUrl = getISNUrl;
exports.getRefundUrl = getRefundUrl;
exports.getResidualUrl = getResidualUrl;
const json_bigint_1 = __importDefault(require("json-bigint"));
const index_1 = require("../constants/index");
const index_2 = require("../utils/index");
const request_1 = __importDefault(require("./request"));
const provider_1 = __importDefault(require("./provider"));
// interface RefundItem {
//   Shard: number
//   Token: string
//   Amount: string
// }
function getISNUrl() {
    const { rpc } = provider_1.default.get();
    const encodeUri = encodeURI(rpc + '/api?req=dx.isn');
    return encodeUri;
}
function getRefundUrl() {
    const { rpc } = provider_1.default.get();
    const encodeUri = encodeURI(rpc + '/api?req=dx.exotic_refund');
    return encodeUri;
}
function getResidualUrl() {
    const { rpc } = provider_1.default.get();
    const encodeUri = encodeURI(rpc + '/api?req=dx.exotic_residual');
    return encodeUri;
}
class AddressService extends request_1.default {
    checkAddress(address) {
        if (!address || !(0, index_2.isValidAddress)(address)) {
            throw new Error('Address is not valid');
        }
    }
    // async getRefund(address: string) {
    //   const fullAddr = fullAddress(address)
    //   this.checkAddress(fullAddr)
    //   const { err, ret } = await this.post<{
    //     err?: number
    //     rsp: string
    //     ret: RefundItem[]
    //   }>(getRefundUrl(), {
    //     body: json.stringify({
    //       address: fullAddr,
    //     }),
    //   })
    //   if (err) throw err
    //   return ret || []
    // }
    // async getResidualUrl(address: string, token: string) {
    //   const fullAddr = fullAddress(address)
    //   this.checkAddress(fullAddr)
    //   const { err, ret } = await this.post<{
    //     err?: number
    //     rsp: string
    //     ret: RefundItem[]
    //   }>(getResidualUrl(), {
    //     body: json.stringify({
    //       address: fullAddr,
    //       token,
    //     }),
    //   })
    //   if (err) throw err
    //   return ret || []
    // }
    getISN(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullAddr = (0, index_2.fullAddress)(address);
            this.checkAddress(fullAddr);
            const { err, ret } = yield this.post(getISNUrl(), {
                body: json_bigint_1.default.stringify({
                    address: fullAddr,
                }),
            });
            if (err)
                throw err;
            return (ret === null || ret === void 0 ? void 0 : ret.ISN) || 0;
        });
    }
    getTxnListByAddress(params) {
        return this.get('', {
            data: Object.assign({ module: 'address', action: 'listtxn' }, params),
        }).then((res) => res.Result);
    }
    getAddressInfo(address) {
        const fullAddr = (0, index_2.fullAddress)(address);
        return this.get('', {
            data: {
                module: 'address',
                action: 'baseinfo',
                address: fullAddr.replace(/#/g, '%23'),
            },
        })
            .then((res) => res.Result)
            .catch(() => ({}));
    }
    getDetailInfo(address) {
        return this.get('', {
            data: {
                module: 'address',
                action: 'detail',
                address: address.replace(/#/g, '%23'),
            },
        });
    }
    getBalance(address) {
        const fullAddr = (0, index_2.fullAddress)(address);
        this.checkAddress(fullAddr);
        return this.get('', {
            data: {
                module: 'address',
                action: 'balance',
                address: fullAddr.replace(/#/g, '%23'),
            },
        }).then((res) => {
            var _a, _b, _c, _d, _e, _f;
            const dToken = (0, index_1.getDefaultToken)();
            const balance = (_b = (_a = res.Result) === null || _a === void 0 ? void 0 : _a.State) === null || _b === void 0 ? void 0 : _b.Balance.match(/\d+/g);
            if ((_c = res.Result) === null || _c === void 0 ? void 0 : _c.Wallet) {
                const defaultToken = (_e = (_d = res.Result) === null || _d === void 0 ? void 0 : _d.Wallet) === null || _e === void 0 ? void 0 : _e.find((w) => w.symbol === dToken.symbol);
                if (defaultToken) {
                    return ((defaultToken === null || defaultToken === void 0 ? void 0 : defaultToken.amount) || '0').toString().split(':')[0];
                }
            }
            return (_f = balance === null || balance === void 0 ? void 0 : balance[0]) !== null && _f !== void 0 ? _f : '0';
        });
    }
    getAddressTokens(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullAddr = (0, index_2.fullAddress)(address);
            this.checkAddress(fullAddr);
            const { Result } = yield this.get('', {
                data: {
                    module: 'address',
                    action: 'tokens',
                    address: fullAddr.replace(/#/g, '%23'),
                },
            });
            return (Result === null || Result === void 0 ? void 0 : Result.ListData) || [];
        });
    }
    getAddressTokenBalance(address, token) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const fullAddr = (0, index_2.fullAddress)(address);
            this.checkAddress(fullAddr);
            const res = yield this.getDetailInfo(address);
            if ((_a = res === null || res === void 0 ? void 0 : res.Result) === null || _a === void 0 ? void 0 : _a.Wallet) {
                const defaultToken = (_c = (_b = res.Result) === null || _b === void 0 ? void 0 : _b.Wallet) === null || _c === void 0 ? void 0 : _c.find((w) => w.symbol === token.split(':')[0]);
                if (defaultToken) {
                    return defaultToken.amount.toString();
                }
            }
            return '0';
        });
    }
}
exports.default = AddressService;
//# sourceMappingURL=address.js.map