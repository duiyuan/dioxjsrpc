import BigNumber from 'bignumber.js';
export const shakeKeyValue = (params) => {
    if (params && typeof params === 'object') {
        Object.keys(params).forEach((key) => {
            const val = params[key];
            if (['', undefined, null].includes(val)) {
                delete params[key];
            }
        });
        return params;
    }
    return params;
};
export const bignumberMult = (val1, val2) => {
    return new BigNumber(val1).multipliedBy(val2).toFixed();
};
export const bignumberMinus = (val1, val2) => {
    return new BigNumber(val1).minus(new BigNumber(val2));
};
export const bignumberPlus = (val1, val2) => {
    return new BigNumber(val1).plus(new BigNumber(val2));
};
export const bignumberPow = (val1, power) => {
    return new BigNumber(val1).pow(power);
};
export const bignumberDiv = (v1, v2) => {
    return new BigNumber(v1).dividedBy(v2);
};
export const bignumberLt = (v1, v2) => {
    return new BigNumber(v1).lt(v2);
};
export const toTokenAmount = (amount, decimals) => {
    return bignumberDiv(amount, new BigNumber(10).pow(decimals)).toString();
};
export const fullAddress = (address) => {
    if (!address)
        return '';
    return `${address.split(':')[0]}:ed25519`;
};
//# sourceMappingURL=string.js.map