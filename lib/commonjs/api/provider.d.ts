declare class SingleProvider {
    private dioxide;
    private rpc;
    constructor();
    get(): {
        dioxide: string;
        rpc: string;
    };
    set(net: Provider): void;
}
declare const _default: SingleProvider;
export default _default;
