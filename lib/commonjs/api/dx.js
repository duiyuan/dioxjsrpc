"use strict";
/**
 * @description dx module: information query module, query chain information
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
const utils_1 = require("../utils");
const provider_1 = __importDefault(require("./provider"));
const request_1 = __importDefault(require("./request"));
class DxService extends request_1.default {
    getRpcUrl(func) {
        const { rpc } = provider_1.default.get();
        const encodeUri = encodeURI(rpc + '/api?req=' + func);
        return encodeUri;
    }
    overview() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcUrl = this.getRpcUrl('dx.overview');
            const resp = yield this.get(rpcUrl, {});
            return this.handleResponse(resp);
        });
    }
    committedHeadHeight() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcUrl = this.getRpcUrl('dx.committed_head_height');
            const resp = yield this.get(rpcUrl, {});
            return this.handleResponse(resp);
        });
    }
    isMining() {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcUrl = this.getRpcUrl('dx.mining');
            const resp = yield this.get(rpcUrl, {});
            return this.handleResponse(resp);
        });
    }
    shardInfo(shard_index) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcUrl = this.getRpcUrl('dx.shard_info');
            const resp = yield this.post(rpcUrl, { body: json_bigint_1.default.stringify({ shard_index }) });
            return this.handleResponse(resp);
        });
    }
    /**
     * @param scope: global/shard/address/uint32/uint64/uint128/uint256/uint512, scope name
     * @param scope_key: string, scope key
     * @returns ShardIndex: uint16
     */
    shardIndex(scope, scope_key) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcUrl = this.getRpcUrl('dx.shard_index');
            const resp = yield this.post(rpcUrl, { body: json_bigint_1.default.stringify({ scope, scope_key }) });
            return this.handleResponse(resp);
        });
    }
    mempool(shard_index, archived) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcUrl = this.getRpcUrl('dx.mempool');
            const resp = yield this.post(rpcUrl, { body: json_bigint_1.default.stringify({ shard_index, archived }) });
            return this.handleResponse(resp);
        });
    }
    /**
     * @param contract_with_scope: name search: <dapp>.<contract>.<scope>; cid search: <cid>.<scope>
     * @param scope_key: string, scope key
     */
    contractState(contract_with_scope, scope_key) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcUrl = this.getRpcUrl('dx.contract_state');
            const resp = yield this.post(rpcUrl, { body: json_bigint_1.default.stringify({ contract_with_scope, scope_key }) });
            return this.handleResponse(resp);
        });
    }
    consensusHeader(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcUrl = this.getRpcUrl('dx.consensus_header');
            const resp = yield this.post(rpcUrl, { body: json_bigint_1.default.stringify(params) });
            return this.handleResponse(resp);
        });
    }
    transactionBlock(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcUrl = this.getRpcUrl('dx.transaction_block');
            const resp = yield this.post(rpcUrl, { body: json_bigint_1.default.stringify(params) });
            return this.handleResponse(resp);
        });
    }
    transactionByHash(hash, shard_index) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcUrl = this.getRpcUrl('dx.transaction');
            const resp = yield this.post(rpcUrl, { body: json_bigint_1.default.stringify({ hash, shard_index }) });
            return this.handleResponse(resp);
        });
    }
    dappInfo(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcUrl = this.getRpcUrl('dx.dapp');
            const resp = yield this.post(rpcUrl, { body: json_bigint_1.default.stringify({ name }) });
            return this.handleResponse(resp);
        });
    }
    generateKey(shard_index, algo) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcUrl = this.getRpcUrl('dx.generate_key');
            const params = (0, utils_1.shakeKeyValue)({ shard_index, algo });
            if (Object.keys(params).length > 0) {
                const resp = yield this.post(rpcUrl, { body: json_bigint_1.default.stringify(params) });
                return this.handleResponse(resp);
            }
            else {
                const resp = yield this.get(rpcUrl, {});
                return this.handleResponse(resp);
            }
        });
    }
    isn(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcUrl = this.getRpcUrl('dx.isn');
            const resp = yield this.post(rpcUrl, { body: json_bigint_1.default.stringify({ address }) });
            return this.handleResponse(resp);
        });
    }
    contractInfo(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcUrl = this.getRpcUrl('dx.contract_info');
            const resp = yield this.post(rpcUrl, { body: json_bigint_1.default.stringify({ contract }) });
            return this.handleResponse(resp);
        });
    }
    tokenInfo(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcUrl = this.getRpcUrl('dx.token');
            const resp = yield this.post(rpcUrl, { body: json_bigint_1.default.stringify({ symbol }) });
            return this.handleResponse(resp);
        });
    }
    blockTime(height) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcUrl = this.getRpcUrl('dx.block_time');
            const resp = yield this.post(rpcUrl, { body: json_bigint_1.default.stringify({ height }) });
            return this.handleResponse(resp);
        });
    }
}
exports.default = DxService;
//# sourceMappingURL=dx.js.map