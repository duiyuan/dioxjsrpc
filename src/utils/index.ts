export * from './buffer'
export * from './string'
export * from './validator'
export * from './extractPublicKey'
export * from './getAddressShardIndex'
export * from './address'

export const isUndefined = (input: any) => {
  return typeof input === 'undefined'
}

export const sleep = (seconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

enum ADDRESS_TYPE {
  token = 'token',
  nft = 'nft',
  ed25519 = 'ed25519',
  dapp = 'dapp',
}

export const isToken = (type: string) => {
  return type === ADDRESS_TYPE.token
}

export const isDApp = (type: string) => {
  return type === ADDRESS_TYPE.dapp
}

export const isUser = (type: string) => {
  return type === ADDRESS_TYPE.ed25519
}
