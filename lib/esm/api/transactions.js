var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import provider from './provider.js';
import Request from './request.js';
export function getComposeUrl() {
    const { rpc } = provider.get();
    const encodeUri = encodeURI(rpc + '/api?req=tx.compose');
    return encodeUri;
}
export function getLimitUrl() {
    const { rpc } = provider.get();
    const encodeUri = encodeURI(rpc + '/api?req=tx.estimate_gas');
    return encodeUri;
}
export function getSendUrl() {
    const { rpc } = provider.get();
    const encodeUri = encodeURI(rpc + '/api?req=tx.send');
    return encodeUri;
}
class TransactionService extends Request {
    compose(body) {
        return this.post(getComposeUrl(), { body });
    }
    sendTransaction(body) {
        return this.post(getSendUrl(), { body });
    }
    getTransactionByHash(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Status, Message, Result } = yield this.get('', {
                data: {
                    module: 'txn',
                    action: 'details',
                    hash,
                },
            });
            if (Status)
                throw Message;
            return Result === null || Result === void 0 ? void 0 : Result.Content;
        });
    }
    getDepositTx(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = 500, pos = 0, height } = params;
            const data = {
                limit,
                pos,
                height,
                module: 'txn',
                action: 'deposit',
            };
            const resp = yield this.get('', {
                data,
            });
            const { Status, Message, Result } = resp;
            if (Status)
                throw Message;
            return Result;
        });
    }
}
export default TransactionService;
//# sourceMappingURL=transactions.js.map