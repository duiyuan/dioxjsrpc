"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concat = concat;
exports.stringToUint8Array = stringToUint8Array;
exports.uint8ArrayToString = uint8ArrayToString;
exports.areUint8ArraysEqual = areUint8ArraysEqual;
function concat(...args) {
    let length = 0;
    const units = args.map((arg) => {
        return new Uint8Array(arg);
    });
    // Get the total length of all arrays.
    units.forEach((item) => {
        length += item.length;
    });
    // Create a new array with total length and merge all source arrays.
    const mergedArray = new Uint8Array(length);
    let offset = 0;
    units.forEach((item) => {
        mergedArray.set(item, offset);
        offset += item.length;
    });
    // Should print an array with length 90788 (5x 16384 + 8868 your source arrays)
    return mergedArray;
}
function stringToUint8Array(message) {
    return new TextEncoder().encode(message);
}
function uint8ArrayToString(content) {
    return new TextDecoder('utf-8').decode(content);
}
function areUint8ArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=buffer.js.map