"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcError = void 0;
const query_string_1 = __importDefault(require("query-string"));
const json_bigint_1 = __importDefault(require("json-bigint"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const string_1 = require("../utils/string");
const provider_1 = __importDefault(require("./provider"));
const AbortController = globalThis.AbortController;
function checkStatus(response) {
    if (response.ok) {
        return response;
    }
    else {
        return Promise.reject(response);
    }
}
class RpcError extends Error {
    constructor(code, rsp, ret) {
        super(`RPC Error: ${rsp} (code: ${code})`);
        this.name = 'RpcError';
        this.code = code;
        this.rsp = rsp;
        this.ret = ret;
    }
}
exports.RpcError = RpcError;
class Fetcher {
    constructor() {
        this.prune = (url) => (url.endsWith('/') ? url.slice(0, -1) : url);
    }
    handleResponse(resp) {
        if (resp.err) {
            throw new RpcError(resp.err, resp.rsp, String(resp.ret));
        }
        return resp.ret;
    }
    get(service, options) {
        return new Promise((res) => {
            const { dioxide } = provider_1.default.get();
            options = Object.assign({ credentials: 'omit' }, options);
            let absoluteUrl = service.startsWith('http') ? service : dioxide + service;
            if (options.data) {
                const data = (0, string_1.shakeKeyValue)(options.data) || {};
                absoluteUrl += '?' + query_string_1.default.stringify(data, { encode: false });
            }
            const controller = new AbortController();
            options.signal = controller.signal;
            const timeout = setTimeout(() => {
                controller.abort();
            }, 30000);
            (0, node_fetch_1.default)(absoluteUrl, options)
                .then(checkStatus)
                .then((r) => r.text().then((text) => res(json_bigint_1.default.parse(text))))
                .finally(() => {
                clearTimeout(timeout);
            });
        });
    }
    post(service, options = {}) {
        return new Promise((res) => {
            const { dioxide } = provider_1.default.get();
            const { body } = options;
            const absoluteUrl = service.startsWith('http')
                ? service
                : dioxide + (service.startsWith('/') ? service.slice(1) : service);
            const controller = new AbortController();
            const concatOption = Object.assign(Object.assign({}, options), { method: 'post', body, signal: controller.signal });
            const timeout = setTimeout(() => {
                controller.abort();
            }, 30000);
            (0, node_fetch_1.default)(absoluteUrl, concatOption)
                .then(checkStatus)
                .then((r) => r.text().then((text) => res(json_bigint_1.default.parse(text))))
                .finally(() => {
                clearTimeout(timeout);
            });
        });
    }
}
exports.default = Fetcher;
//# sourceMappingURL=request.js.map