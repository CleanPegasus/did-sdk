import { ethers } from "ethers";
import snarkjs from "snarkjs";
import { IdentityType } from "./types";
declare class Identity {
    dIdContract: ethers.Contract;
    provider: ethers.providers.JsonRpcProvider;
    constructor();
    mintIdentity(signer: ethers.Signer, address: string, name: string, DoB: string): Promise<string>;
    getIdentity(address: string): Promise<IdentityType>;
    createProfile(signer: ethers.Signer, entity: String, address: string, creditScore: number): Promise<void>;
    createAgeProof(address: string, doB: string, ageThreshold: string): Promise<{
        proof: snarkjs.Groth16Proof;
        publicSignals: snarkjs.PublicSignals;
    }>;
    createCreditProof(address: string, creditScore: number, minCreditScore: number, maxCreditScore: number): Promise<{
        proof: snarkjs.Groth16Proof;
        publicSignals: snarkjs.PublicSignals;
    }>;
    verifyAgeProof(address: string, proof: any, publicSignals: any): Promise<boolean>;
    verifyCreditProof(profiler: string, address: string, proof: any, publicSignals: any): Promise<boolean>;
    getProvider(): ethers.providers.JsonRpcProvider;
}
export default Identity;
