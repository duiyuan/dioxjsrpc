var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Request from './request.js';
class BlockSvc extends Request {
    getExcutedTx(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = 500, pos = 0, height } = params;
            const data = {
                limit,
                pos,
                height,
                module: 'block',
                action: 'txn_executed',
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
export default BlockSvc;
//# sourceMappingURL=block.js.map