"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_bigint_1 = __importDefault(require("json-bigint"));
const provider_1 = __importDefault(require("./provider"));
const request_1 = __importDefault(require("./request"));
class Tx extends request_1.default {
    getRpcUrl(func) {
        const { rpc } = provider_1.default.get();
        const encodeUri = encodeURI(rpc + '/api?req=' + func);
        return encodeUri;
    }
    compose(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.post(this.getRpcUrl('tx.compose'), { body: json_bigint_1.default.stringify(params) });
            return this.handleResponse(resp);
        });
    }
    sign(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.post(this.getRpcUrl('tx.sign'), { body: json_bigint_1.default.stringify(params) });
            return this.handleResponse(resp);
        });
    }
    send(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.post(this.getRpcUrl('tx.send'), { body: json_bigint_1.default.stringify(params) });
            return this.handleResponse(resp);
        });
    }
    // send transaction with SK, need to pass in the private key, only for development use !!!
    sendWithSK(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.post(this.getRpcUrl('tx.send_withSK'), { body: json_bigint_1.default.stringify(params) });
            return this.handleResponse(resp);
        });
    }
}
exports.default = Tx;
//# sourceMappingURL=tx.js.map