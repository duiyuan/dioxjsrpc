import querystring from 'query-string';
import json from 'json-bigint';
import fetch from 'node-fetch';
import { shakeKeyValue } from '../utils/string.js';
import provider from './provider.js';
const AbortController = globalThis.AbortController;
function checkStatus(response) {
    if (response.ok) {
        return response;
    }
    else {
        return Promise.reject(response);
    }
}
export class RpcError extends Error {
    constructor(code, rsp, ret) {
        super(`RPC Error: ${rsp} (code: ${code})`);
        this.name = 'RpcError';
        this.code = code;
        this.rsp = rsp;
        this.ret = ret;
    }
}
export default class Fetcher {
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
            const { dioxide } = provider.get();
            options = Object.assign({ credentials: 'omit' }, options);
            let absoluteUrl = service.startsWith('http') ? service : dioxide + service;
            if (options.data) {
                const data = shakeKeyValue(options.data) || {};
                absoluteUrl += '?' + querystring.stringify(data, { encode: false });
            }
            const controller = new AbortController();
            options.signal = controller.signal;
            const timeout = setTimeout(() => {
                controller.abort();
            }, 30000);
            fetch(absoluteUrl, options)
                .then(checkStatus)
                .then((r) => r.text().then((text) => res(json.parse(text))))
                .finally(() => {
                clearTimeout(timeout);
            });
        });
    }
    post(service, options = {}) {
        return new Promise((res) => {
            const { dioxide } = provider.get();
            const { body } = options;
            const absoluteUrl = service.startsWith('http')
                ? service
                : dioxide + (service.startsWith('/') ? service.slice(1) : service);
            const controller = new AbortController();
            const concatOption = Object.assign(Object.assign({}, options), { method: 'post', body, signal: controller.signal });
            const timeout = setTimeout(() => {
                controller.abort();
            }, 30000);
            fetch(absoluteUrl, concatOption)
                .then(checkStatus)
                .then((r) => r.text().then((text) => res(json.parse(text))))
                .finally(() => {
                clearTimeout(timeout);
            });
        });
    }
}
//# sourceMappingURL=request.js.map