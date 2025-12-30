var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { decode, encode } from 'base64-arraybuffer';
import { sha256 } from 'js-sha256';
import * as ed from '@noble/ed25519';
import base32Encode from 'base32-encode';
import json from 'json-bigint';
import TransactionService from '../api/transactions.js';
import { concat, fullAddress, pk2Address } from '../utils/index.js';
import { extractPublicKey } from '../utils/index.js';
import PowDifficulty from '../utils/powDifficulty.js';
import OverviewService from '../api/overview.js';
class Transaction {
    constructor() {
        this.txnServices = new TransactionService();
        this.overViewServices = new OverviewService();
    }
    getTxn(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.txnServices.getTransactionByHash(hash);
        });
    }
    compose(originalTxn) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ret, err } = yield this.txnServices.compose(json.stringify(originalTxn));
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
            const pk = extractPublicKey(originalTxn.sender);
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
            const finalInfo = concat(dataWithPK, signedInfo);
            const powDiff = new PowDifficulty({
                originTxn: finalInfo.buffer,
                ttl: originalTxn.ttl,
            });
            const finalInfowithNonce = powDiff.getHashMixinNonnce();
            const hash = base32Encode(sha256.arrayBuffer(finalInfowithNonce), 'Crockford');
            return {
                rawTxData: encode(finalInfowithNonce),
                hash: hash.toLowerCase(),
            };
        });
    }
    send(originTxn, secretKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rawTxData: signData } = yield this.sign(originTxn, secretKey);
            const { ret, err } = yield this.txnServices.sendTransaction(json.stringify({
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
            const { ret, err } = yield this.txnServices.sendTransaction(json.stringify({
                txdata: rawTxData,
            }));
            if (err) {
                throw new Error(ret.toString());
            }
            return ret.Hash;
        });
    }
    insertPK(txData, pkList) {
        const originTxData = new Uint8Array(decode(txData));
        const secSuites = [];
        pkList.forEach((el) => {
            const id = new Uint8Array([el.encryptedMethodOrderNumber]);
            const pk = el.publicKey;
            secSuites.push(id);
            secSuites.push(pk);
        });
        const result = concat(originTxData, ...secSuites);
        return result;
    }
    getEstimatedFee(originTxn) {
        return __awaiter(this, void 0, void 0, function* () {
            const { function: func, args, delegatee, scale = 3, tokens } = originTxn;
            const overview = yield this.overViewServices.chainStatus();
            const avgGasPrice = (overview === null || overview === void 0 ? void 0 : overview.AvgGasPrice) || 0;
            const to = args.to || args.To;
            const { ret, err } = yield this.txnServices.compose(json.stringify({
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
            const { address } = pk2Address(pk);
            return fullAddress(base32Encode(address, 'Crockford').toLocaleLowerCase());
        });
    }
}
export { Transaction };
//# sourceMappingURL=transaction.js.map