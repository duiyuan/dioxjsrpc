"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyAlgorithm = exports.ConsensusHeaderQueryType = void 0;
var ConsensusHeaderQueryType;
(function (ConsensusHeaderQueryType) {
    ConsensusHeaderQueryType[ConsensusHeaderQueryType["HEIGHT"] = 0] = "HEIGHT";
    ConsensusHeaderQueryType[ConsensusHeaderQueryType["HASH"] = 1] = "HASH";
    ConsensusHeaderQueryType[ConsensusHeaderQueryType["RANGE"] = 2] = "RANGE";
})(ConsensusHeaderQueryType || (exports.ConsensusHeaderQueryType = ConsensusHeaderQueryType = {}));
var KeyAlgorithm;
(function (KeyAlgorithm) {
    KeyAlgorithm[KeyAlgorithm["ED25519"] = 0] = "ED25519";
    KeyAlgorithm[KeyAlgorithm["ETHEREUM"] = 1] = "ETHEREUM";
    KeyAlgorithm[KeyAlgorithm["SM2"] = 2] = "SM2";
})(KeyAlgorithm || (exports.KeyAlgorithm = KeyAlgorithm = {}));
//# sourceMappingURL=type.js.map