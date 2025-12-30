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
const request_1 = __importDefault(require("./request"));
class BlockSvc extends request_1.default {
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
exports.default = BlockSvc;
//# sourceMappingURL=block.js.map