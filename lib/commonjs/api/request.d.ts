export declare class RpcError extends Error {
    code: number;
    rsp: string;
    ret: string;
    constructor(code: number, rsp: string, ret: string);
}
export default class Fetcher {
    prune: (url: string) => string;
    protected handleResponse<T>(resp: {
        err?: number;
        rsp: string;
        ret: T;
    }): T;
    get<T>(service: string, options: any): Promise<T>;
    post<T>(service: string, options?: any): Promise<T>;
}
