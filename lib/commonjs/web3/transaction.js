"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.Transaction = void 0;
const base64_arraybuffer_1 = require("base64-arraybuffer");
const js_sha256_1 = require("js-sha256");
const ed = __importStar(require("@noble/ed25519"));
const base32_encode_1 = __importDefault(require("base32-encode"));
const json_bigint_1 = __importDefault(require("json-bigint"));
const transactions_1 = __importDefault(require("../api/transactions"));
const index_1 = require("../utils/index");
const index_2 = require("../utils/index");
const powDifficulty_1 = __importDefault(require("../utils/powDifficulty"));
const overview_1 = __importDefault(require("../api/overview"));
class Transaction {
    constructor() {
        this.txnServices = new transactions_1.default();
        this.overViewServices = new overview_1.default();
    }
    getTxn(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.txnServices.getTransactionByHash(hash);
        });
    }
    compose(originalTxn) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ret, err } = yield this.txnServices.compose(json_bigint_1.default.stringify(originalTxn));
            if (err) {
                throw new Error(ret.toString());
            }
            return ret.TxData;
        });
    }
    sign(originalTxn, secretKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const unit8ArraySecrectKey = secretKey;
            const txdata = yield this.compose(originalTxn);
            const pk = (0, index_2.extractPublicKey)(originalTxn.sender);
            if (!pk) {
                throw new Error('pk error');
            }
            const dataWithPK = this.insertPK(txdata, [
                { encryptedMethodOrderNumber: 0x3, publicKey: new Uint8Array(pk) },
            ]);
            const signedInfo = yield ed.sign(dataWithPK, unit8ArraySecrectKey);
            const isValid = yield ed.verify(signedInfo, dataWithPK, pk);
            if (!isValid) {
                throw new Error('sign error');
            }
            const finalInfo = (0, index_1.concat)(dataWithPK, signedInfo);
            const powDiff = new powDifficulty_1.default({
                originTxn: finalInfo.buffer,
                ttl: originalTxn.ttl,
            });
            const finalInfowithNonce = powDiff.getHashMixinNonnce();
            const hash = (0, base32_encode_1.default)(js_sha256_1.sha256.arrayBuffer(finalInfowithNonce), 'Crockford');
            return {
                rawTxData: (0, base64_arraybuffer_1.encode)(finalInfowithNonce),
                hash: hash.toLowerCase(),
            };
        });
    }
    send(originTxn, secretKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rawTxData: signData } = yield this.sign(originTxn, secretKey);
            const { ret, err } = yield this.txnServices.sendTransaction(json_bigint_1.default.stringify({
                txdata: signData,
            }));
            if (err) {
                throw new Error(ret.toString());
            }
            return ret.Hash;
        });
    }
    sendRawTx(rawTxData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ret, err } = yield this.txnServices.sendTransaction(json_bigint_1.default.stringify({
                txdata: rawTxData,
            }));
            if (err) {
                throw new Error(ret.toString());
            }
            return ret.Hash;
        });
    }
    insertPK(txData, pkList) {
        const originTxData = new Uint8Array((0, base64_arraybuffer_1.decode)(txData));
        const secSuites = [];
        pkList.forEach((el) => {
            const id = new Uint8Array([el.encryptedMethodOrderNumber]);
            const pk = el.publicKey;
            secSuites.push(id);
            secSuites.push(pk);
        });
        const result = (0, index_1.concat)(originTxData, ...secSuites);
        return result;
    }
    getEstimatedFee(originTxn) {
        return __awaiter(this, void 0, void 0, function* () {
            const { function: func, args, delegatee, scale = 3, tokens } = originTxn;
            const overview = yield this.overViewServices.chainStatus();
            const avgGasPrice = (overview === null || overview === void 0 ? void 0 : overview.AvgGasPrice) || 0;
            const to = args.to || args.To;
            const { ret, err } = yield this.txnServices.compose(json_bigint_1.default.stringify({
                sender: to,
                gasprice: avgGasPrice,
                delegatee: delegatee,
                function: func,
                args,
                tokens,
            }));
            if (err) {
                throw new Error('services.compose failed: txdata is empty(' + ret.toString() + ')');
            }
            const gasLimit = ret.GasOffered.toString();
            const gasFee = this.calculateGasFee({
                average: avgGasPrice,
                scale: scale,
                gasLimit: Number(gasLimit),
            });
            return gasFee;
        });
    }
    calculateGasFee(options) {
        const { average, scale = 3, gasLimit } = options;
        const gasPrice = parseInt(((scale - 1) * 0.25 + 0.5) * average + '', 10);
        const gasFee = gasPrice * gasLimit;
        return gasFee;
    }
    getDepositTxByBlock(params) {
        return this.txnServices.getDepositTx(params);
    }
    // async reclaimWallet({
    //   refund,
    //   residual = false,
    //   residualToken = 'XXX',
    //   secretKeyArray,
    // }: {
    //   refund: boolean
    //   residual?: boolean
    //   residualToken?: string
    //   secretKeyArray: Uint8Array
    // }) {
    //   const pk = await ed.getPublicKey(secretKeyArray)
    //   const { address } = pk2Address(pk)
    //   const sender = fullAddress(
    //     base32Encode(address, 'Crockford').toLocaleLowerCase(),
    //   )
    //   return this.send(
    //     {
    //       sender,
    //       gasprice: 100,
    //       function: 'core.wallet.reclaim',
    //       args: {
    //         Refund: refund,
    //         Residual: residual,
    //         Token: residualToken,
    //       },
    //     },
    //     secretKeyArray,
    //   )
    // }
    transfer(_a) {
        return __awaiter(this, arguments, void 0, function* ({ to, amount, secretKey, ttl }) {
            const sender = yield this.sk2base32Address(secretKey);
            return this.send({
                sender,
                gasprice: 100,
                function: 'core.coin.transfer',
                args: {
                    To: to,
                    Amount: amount,
                },
                ttl,
            }, secretKey);
        });
    }
    transferFCA(_a) {
        return __awaiter(this, arguments, void 0, function* ({ symbol, to, amount, secretKey, ttl, }) {
            const sender = yield this.sk2base32Address(secretKey);
            return this.send({
                sender,
                gasprice: 100,
                function: 'core.wallet.transfer',
                args: {
                    To: to,
                    Amount: amount,
                    TokenId: symbol,
                },
                ttl,
            }, secretKey);
        });
    }
    sk2base32Address(sk) {
        return __awaiter(this, void 0, void 0, function* () {
            const pk = yield ed.getPublicKey(sk);
            const { address } = (0, index_1.pk2Address)(pk);
            return (0, index_1.fullAddress)((0, base32_encode_1.default)(address, 'Crockford').toLocaleLowerCase());
        });
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map