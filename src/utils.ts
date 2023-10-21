// import circomlibjs from "circomlibjs";
import * as circomlibjs from "circomlibjs";
import { ethers } from "ethers";
import snarkjs from "snarkjs";

export async function poseidonHash(inputs: any) {
  const poseidon = await circomlibjs.buildPoseidon();
  const poseidonHash = poseidon.F.toString(poseidon(inputs));
  return poseidonHash;
}

export async function createIdentity(address: string, name: string, DoB: string) {
  const UID = ethers.sha256(ethers.toUtf8Bytes(address + name + DoB));
  const nameHash = ethers.sha256(ethers.toUtf8Bytes(address + name));
  const DoBTimestamp = Date.parse(DoB);
  const DoBHash = await poseidonHash([address, DoBTimestamp]);
  const identity = {
    UID: UID,
    nameHash: nameHash,
    dobHash: DoBHash,
  };

  return identity;
}

export async function createProfile(entity: string, address: string, creditScore: number) {
  const hash = await poseidonHash([address, creditScore]);
  const profile = {
    entity: entity,
    dataHash: hash,
    timestamp: Date.now(),
  };
  return profile;
}

async function createAgeProof(address: string, doB: string, ageThreshold: string) {
  const doBTimestamp = Date.parse(doB);
  const hash = await poseidonHash([address, doBTimestamp]);
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    { doBTimestamp: doBTimestamp, address: address, currentTimestamp: Date.now(), ageThreshold: ageThreshold, hash: hash }, 
    "zkp/age_proof.wasm", 
    "zkp/circuit_0.zkey");

  return { proof, publicSignals };
}

async function createCreditProof(address: string, creditScore: number, minCreditScore: number, maxCreditScore: number) {
  const hash = await poseidonHash([address, creditScore]);
  const {proof, publicSignals} = await snarkjs.groth16.fullProve(
    { creditScore: creditScore, minCreditScore: minCreditScore, maxCreditScore: maxCreditScore, address: address, hash: hash },
    "zkp/credit_proof.wasm",
    "zkp/circuit_1.zkey");

  return { proof, publicSignals };
}

async function verifyAgeProof(address: string, id: any, proof: any, publicSignals: any): Promise<boolean> {
  const vKey = require("zkp/verification_key.json")
  // const vKey = JSON.parse(fs.readFileSync("verification_key.json"));
  try {
    const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);
    return (res && (id.dobHash == publicSignals[3]));
  } catch (e) {
    return false;
  }
}

async function verifyCreditProof(profiler: string, profile: any, address: string, proof: any, publicSignals: any): Promise<boolean> {
  // const profile = await this.dIdContract.getProfile(profiler, address);
  const dataHash = profile.dataHash;
  const vKey = require("zkp/verification_key_1.json")
  // const vKey = JSON.parse(fs.readFileSync("verification_key_1.json"));
  try {
    const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);
    return (res && (dataHash == publicSignals[3]));
  } catch (e) {
    return false;
  }
}