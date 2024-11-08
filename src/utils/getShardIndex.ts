export function getShardIndex(address: Uint8Array, order = 2) {
  const view = new DataView(address.buffer, address.byteOffset, address.byteLength);
  if (address.byteLength < 36) {
    throw new Error("Input buffer must be at least 36 bytes");
  }
  const shardValue = view.getUint32(0, true) ^ view.getUint32(4, true) ^ view.getUint32(7, true);
  return shardValue & ((1 << order) - 1);
}