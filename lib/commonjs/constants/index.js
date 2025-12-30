"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NET = exports.DioFunction = void 0;
exports.getDefaultToken = getDefaultToken;
exports.getProvider = getProvider;
var DioFunction;
(function (DioFunction) {
    DioFunction["SET_METADATA"] = "core.profile.set";
    DioFunction["SET_SCOPE_METADATA"] = "core.profile.address.set";
    DioFunction["FAUCET"] = "core.coin.faucet";
    DioFunction["FAUCET_SCOPE"] = "core.coin.address.faucet";
    DioFunction["MANAGED_TOKEN"] = "Asset.TokenManager.create";
    DioFunction["CREATE_ADDRESS_TOKEN"] = "core.delegation.address.create_token";
    DioFunction["CREATE_TOKEN"] = "core.delegation.create_token";
    DioFunction["TOKEN_FINALIZE"] = "token_finalize@address.delegation.core";
    DioFunction["TOKEN_BID"] = "token_bid@address.delegation.core";
    DioFunction["MINT_TOKEN"] = "core.token_stats.address.supply_change";
    DioFunction["MINT_NFT"] = "nonfungible_init@address.delegation.core";
    DioFunction["MINTED"] = "core.coin.global.minted";
    DioFunction["TRANSFER"] = "core.coin.transfer";
    DioFunction["TRANSFER_NFT"] = "transfer@address.vault.core";
    DioFunction["TRANSFER_TOKENS"] = "core.wallet.transfer";
    DioFunction["RECEIVE_TOKENS"] = "Asset.Wallet.address.deposit";
    DioFunction["INIT_DAPP"] = "core.delegation.create";
    DioFunction["INIT_SCOPE_DAPP"] = "core.delegation.address.create";
    DioFunction["MINT"] = "core.coin.mint";
    DioFunction["COMPOSE_NFT"] = "nft.compose";
    DioFunction["RECEIVE_NFT"] = "deposit@address.vault.core";
    DioFunction["SEND_COMPOSED_TX_DATA"] = "send_composed_tx_data";
    DioFunction["DEPLOY_CONTRACT"] = "core.delegation.address.deploy_contracts";
    DioFunction["SET_TOKEN_MINTER"] = "core.delegation.set_token_minter";
    DioFunction["BRX_CLAIM"] = "rxbridge.BitReXe.claimBRX";
    DioFunction["BRX_BURN"] = "rxbridge.BitReXe.burnRXBTC";
    DioFunction["WALLET_BRX_CLAIM"] = "rxbridge.BitReXe.address.claimBRX";
    DioFunction["WALLET_BRX_BURN"] = "rxbridge.BitReXe.address.burnRXBTC";
    DioFunction["WALLET_CORE_DEPOSIT"] = "core.coin.address.deposit";
    DioFunction["WALLET_DEPOSIT"] = "core.wallet.address.deposit";
    DioFunction["WALLET_BITREXE_DEPOSIT"] = "rxbridge.BitReXe.address._deposit";
})(DioFunction || (exports.DioFunction = DioFunction = {}));
function getDefaultToken() {
    return {
        symbol: 'DIO',
        decimals: 8,
    };
}
var NET;
(function (NET) {
    NET["MAIN"] = "main";
    NET["TEST"] = "test";
})(NET || (exports.NET = NET = {}));
function getProvider(net) {
    if (net === NET.MAIN) {
        return {
            dioxide: 'https://api.dioxide.network/api',
            rpc: 'https://node-rpc.dioxide.network',
        };
    }
    if (typeof net === 'object') {
        return {
            dioxide: (net === null || net === void 0 ? void 0 : net.dioxide) || 'http://47.100.78.190:7000/dev/api',
            rpc: (net === null || net === void 0 ? void 0 : net.rpc) || 'http://139.224.254.200:62222',
        };
    }
    return {
        dioxide: 'http://47.100.78.190:7000/dev/api',
        rpc: 'http://139.224.254.200:62222',
    };
}
//# sourceMappingURL=index.js.map