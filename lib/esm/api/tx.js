/**
 * @description tx module: transaction module, compose, sign, send, sendWithSK on chain
 * @description rpc module: rpc call module, call rpc api
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import json from 'json-bigint';
import provider from './provider.js';
import Request from './request.js';
export default class Tx extends Request {
    getRpcUrl(func) {
        const { rpc } = provider.get();
        const encodeUri = encodeURI(rpc + '/api?req=' + func);
        return encodeUri;
    }
    compose(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.post(this.getRpcUrl('tx.compose'), { body: json.stringify(params) });
            return this.handleResponse(resp);
        });
    }
    sign(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.post(this.getRpcUrl('tx.sign'), { body: json.stringify(params) });
            return this.handleResponse(resp);
        });
    }
    send(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.post(this.getRpcUrl('tx.send'), { body: json.stringify(params) });
            return this.handleResponse(resp);
        });
    }
    // send transaction with SK, need to pass in the private key, only for development use !!!
    sendWithSK(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.post(this.getRpcUrl('tx.send_withSK'), { body: json.stringify(params) });
            return this.handleResponse(resp);
        });
    }
}
//# sourceMappingURL=tx.js.map