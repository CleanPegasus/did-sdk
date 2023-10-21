"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const snarkjs_1 = __importDefault(require("snarkjs"));
const dIdentity_1 = require("./abi/dIdentity");
const utils_1 = require("./utils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Path src/index.js
class Identity {
    constructor() {
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
        const dIdContract = new ethers_1.ethers.Contract("0x5Fc62D67898FBa0FA3e3A1eB1a3464cd71D8616e", dIdentity_1.dIdentityAbi, provider);
        this.dIdContract = dIdContract;
        this.provider = provider;
    }
    mintIdentity(signer, address, name, DoB) {
        return __awaiter(this, void 0, void 0, function* () {
            const UID = ethers_1.ethers.utils.sha256(ethers_1.ethers.utils.toUtf8Bytes(address + name + DoB));
            const nameHash = ethers_1.ethers.utils.sha256(ethers_1.ethers.utils.toUtf8Bytes(address + name));
            const DoBTimestamp = Date.parse(DoB);
            const DoBHash = yield (0, utils_1.poseidonHash)([address, DoBTimestamp]);
            const identity = {
                UID: UID,
                nameHash: nameHash,
                dobHash: DoBHash,
            };
            const tx = yield this.dIdContract.connect(signer).mint(address, identity);
            return tx.hash;
        });
    }
    getIdentity(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const identity = yield this.dIdContract.getIdentity(address);
            return identity;
        });
    }
    createProfile(signer, entity, address, creditScore) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield (0, utils_1.poseidonHash)([address, creditScore]);
            const profile = {
                entity: entity,
                dataHash: hash,
                timestamp: Date.now(),
            };
            const tx = yield this.dIdContract.connect(signer).setProfile(address, profile);
            yield tx.wait();
        });
    }
    // Zero Knowledge Proofs
    createAgeProof(address, doB, ageThreshold) {
        return __awaiter(this, void 0, void 0, function* () {
            const doBTimestamp = Date.parse(doB);
            const hash = yield (0, utils_1.poseidonHash)([address, doBTimestamp]);
            const { proof, publicSignals } = yield snarkjs_1.default.groth16.fullProve({ doBTimestamp: doBTimestamp, address: address, currentTimestamp: Date.now(), ageThreshold: ageThreshold, hash: hash }, "zkp/age_proof.wasm", "zkp/circuit_0.zkey");
            return { proof, publicSignals };
        });
    }
    createCreditProof(address, creditScore, minCreditScore, maxCreditScore) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield (0, utils_1.poseidonHash)([address, creditScore]);
            const { proof, publicSignals } = yield snarkjs_1.default.groth16.fullProve({ creditScore: creditScore, minCreditScore: minCreditScore, maxCreditScore: maxCreditScore, address: address, hash: hash }, "zkp/credit_proof.wasm", "zkp/circuit_1.zkey");
            return { proof, publicSignals };
        });
    }
    verifyAgeProof(address, proof, publicSignals) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.dIdContract.getID(address);
            const vKey = require("zkp/verification_key.json");
            // const vKey = JSON.parse(fs.readFileSync("verification_key.json"));
            try {
                const res = yield snarkjs_1.default.groth16.verify(vKey, publicSignals, proof);
                return (res && (id.dobHash == publicSignals[3]));
            }
            catch (e) {
                return false;
            }
        });
    }
    verifyCreditProof(profiler, address, proof, publicSignals) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield this.dIdContract.getProfile(profiler, address);
            const dataHash = profile.dataHash;
            const vKey = require("zkp/verification_key_1.json");
            // const vKey = JSON.parse(fs.readFileSync("verification_key_1.json"));
            try {
                const res = yield snarkjs_1.default.groth16.verify(vKey, publicSignals, proof);
                return (res && (dataHash == publicSignals[3]));
            }
            catch (e) {
                return false;
            }
        });
    }
    // Utils
    getProvider() {
        return this.provider;
    }
}
exports.default = Identity;
//# sourceMappingURL=index.js.map