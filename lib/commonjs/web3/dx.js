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
const request_1 = __importDefault(require("../api/request"));
const dx_1 = __importDefault(require("../api/dx"));
const type_1 = require("../api/type");
class Dx extends request_1.default {
    constructor() {
        super();
        this.dxSvc = new dx_1.default();
    }
    overview() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dxSvc.overview();
        });
    }
    getCommittedHeadHeight() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dxSvc.committedHeadHeight();
        });
    }
    isMining() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dxSvc.isMining();
        });
    }
    getShardInfo(shard_index) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dxSvc.shardInfo(shard_index);
        });
    }
    getShardIndexByScope(scope, scope_key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (scope !== 'global' && !scope_key) {
                throw new Error('scope_key is required for non-global scope');
            }
            return this.dxSvc.shardIndex(scope, scope_key);
        });
    }
    getMempool(shard_index, archived) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dxSvc.mempool(shard_index, archived);
        });
    }
    getContractState(contract_with_scope, scope_key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dxSvc.contractState(contract_with_scope, scope_key);
        });
    }
    getConsensusHeader(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((params === null || params === void 0 ? void 0 : params.query_type) === 0 && !(params === null || params === void 0 ? void 0 : params.height)) {
                throw new Error('height is required for query_type 0');
            }
            if ((params === null || params === void 0 ? void 0 : params.query_type) === 1 && !(params === null || params === void 0 ? void 0 : params.hash)) {
                throw new Error('hash is required for query_type 1');
            }
            if ((params === null || params === void 0 ? void 0 : params.query_type) === 2 && !(params === null || params === void 0 ? void 0 : params.start) && !(params === null || params === void 0 ? void 0 : params.end)) {
                throw new Error('start or end is required for query_type 2');
            }
            return this.dxSvc.consensusHeader(params);
        });
    }
    getTransactionBlock(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((params === null || params === void 0 ? void 0 : params.query_type) === 0 && !(params === null || params === void 0 ? void 0 : params.height)) {
                throw new Error('height is required for query_type 0');
            }
            if ((params === null || params === void 0 ? void 0 : params.query_type) === 1 && !(params === null || params === void 0 ? void 0 : params.hash)) {
                throw new Error('hash is required for query_type 1');
            }
            if ((params === null || params === void 0 ? void 0 : params.query_type) === 2 && !(params === null || params === void 0 ? void 0 : params.start) && !(params === null || params === void 0 ? void 0 : params.end)) {
                throw new Error('start or end is required for query_type 2');
            }
            return this.dxSvc.transactionBlock(params);
        });
    }
    getTransactionByHash(hash, shard_index) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dxSvc.transactionByHash(hash, shard_index);
        });
    }
    getDappInfo(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const nameRegex = /^[A-Za-z0-9_\-#@]+$/;
            if (name.length < 4 || name.length > 8) {
                throw new Error('name must be between 4 and 8 characters');
            }
            if (!nameRegex.test(name)) {
                throw new Error('name must contain only letters, numbers, _, -, #, or @');
            }
            return this.dxSvc.dappInfo(name);
        });
    }
    /**
     * Generate key pair
     * @param shard_index Optional. Shard index
     * @param algo Optional. Key algorithm: 0 = ed25519, 1 = ethereum, 2 = sm2
     */
    generateKey(shard_index, algo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (algo !== undefined &&
                !(algo === type_1.KeyAlgorithm.ED25519 || algo === type_1.KeyAlgorithm.ETHEREUM || algo === type_1.KeyAlgorithm.SM2)) {
                throw new Error('Invalid algo parameter. Must be 0 (ed25519), 1 (ethereum), or 2 (sm2)');
            }
            return this.dxSvc.generateKey(shard_index, algo);
        });
    }
    getISNByAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dxSvc.isn(address);
        });
    }
    getContractInfo(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dxSvc.contractInfo(contract);
        });
    }
    getTokenInfo(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dxSvc.tokenInfo(symbol);
        });
    }
    getBlockTime(height) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dxSvc.blockTime(height);
        });
    }
}
exports.default = Dx;
//# sourceMappingURL=dx.js.map