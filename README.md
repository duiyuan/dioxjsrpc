# @dioxide-js/web3.js
@dioxide-js/web3.js is a TypeScript implementation of the [Dioxide RPC API](https://docs.dioxide.network/doc/RPC) and [Dioxide Service AI](https://docs.dioxide.network/doc/Dioscan%20Service%20API/)

## Installation

### Using NPM

```bash
npm install @dioxide-js/web3.js
```

### Using Yarn

```bash
yarn add @dioxide-js/web3.js
```

## Getting Started

```typescript
import { Web3, NET } from '@dioxide-js/web3.js';

const web3 = new Web3(NET.TEST);

// Get the balance of an address
const balance = await web3.eth.getBalance('0x1234567890abcdef1234567890abcdef12345678');
console.log(balance);
```

## API

### web3

#### web3.getBalance(address: string)
#### web3.getAddressTokens(address: string)
#### web3.getAddressInfo(address: string)
#### web3.composeTransaction(originalTxn: OriginalTxn): 
#### web3.signTransaction(txdata: string, secretKey: string): 
#### web3.sendTransaction(originalTxn: OriginalTxn, secretKey: string)
#### web3.getTransaction(hash: string)
#### web3.getEstimatedFee(originTxn: OriginalTxn)

### utils

#### utils.toTokenAmount(amount: string, decimals: number)
#### utils.isValidAddress(address: string)
#### utils.extractPublicKey(address: string)

### type

## Package.json Scripts

| Script                         | Description                                                        |
| ------------------------------ | ------------------------------------------------------------------ |
| watch                          | Uses `tsc` to build all packages with watch mode                                  |
| build                          | Uses `tsc` to build all packages                                    |
| build:cjs                          | Uses `tsc` to build all packages to commonjs module                                   |
| build:esm                          | Uses `tsc` to build all packages to es module                                    |
| build:types                          | Uses `tsc` to build all packages to ts types                                    |
| build:check                          | Uses `node` to check packages build                                    |
| lint                           | Uses `eslint` to lint all packages                                 |
| lint:fix                       | Uses `eslint` to check and fix any warnings                        |
| test                           | Uses `jest` to run unit tests in each package                      |
