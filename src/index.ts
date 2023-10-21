import { ethers } from "ethers";
import snarkjs from "snarkjs";

import { dIdentityAbi } from './abi/dIdentity';
import { IdentityType } from "./types";
import { poseidonHash } from "./utils";

import dotenv from "dotenv";
dotenv.config();

// Path src/index.js

class Identity {

  dIdContract: ethers.Contract;
	provider: ethers.providers.JsonRpcProvider;

  constructor() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
    const dIdContract = new ethers.Contract("0x5Fc62D67898FBa0FA3e3A1eB1a3464cd71D8616e", dIdentityAbi, provider);
    this.dIdContract = dIdContract;
		this.provider = provider;
  }

  async mintIdentity(signer: ethers.Signer, address: string, name: string, DoB: string): Promise<string> {
    const UID = ethers.utils.sha256(ethers.utils.toUtf8Bytes(address + name + DoB));
    const nameHash = ethers.utils.sha256(ethers.utils.toUtf8Bytes(address + name));
		const DoBTimestamp = Date.parse(DoB);
    const DoBHash = await poseidonHash([address, DoBTimestamp]);
    const identity = {
      UID: UID,
      nameHash: nameHash,
      dobHash: DoBHash,
    };

		console.log(identity);

    // const tx = await this.dIdContract.connect(signer).mint(address, identity);
    // return tx.hash;
		return ""
  }

	async getIdentity(address: string): Promise<IdentityType> {
		const identity = await this.dIdContract.getIdentity(address);
		return identity;
	}

	async createProfile(signer: ethers.Signer, entity: String, address: string, creditScore: number) {
		const hash = await poseidonHash([address, creditScore]);
		const profile = {
			entity: entity,
			dataHash: hash,
			timestamp: Date.now(),
		}
		const tx = await this.dIdContract.connect(signer).setProfile(address, profile);
		await tx.wait();
	}

	// Zero Knowledge Proofs

	async createAgeProof(address: string, doB: string, ageThreshold: string) {
		const doBTimestamp = Date.parse(doB);
		const hash = await poseidonHash([address, doBTimestamp]);
		const { proof, publicSignals } = await snarkjs.groth16.fullProve(
			{ doBTimestamp: doBTimestamp, address: address, currentTimestamp: Date.now(), ageThreshold: ageThreshold, hash: hash }, 
			"zkp/age_proof.wasm", 
			"zkp/circuit_0.zkey");
	
		return { proof, publicSignals };
	}

	async createCreditProof(address: string, creditScore: number, minCreditScore: number, maxCreditScore: number) {
		const hash = await poseidonHash([address, creditScore]);
		const {proof, publicSignals} = await snarkjs.groth16.fullProve(
			{ creditScore: creditScore, minCreditScore: minCreditScore, maxCreditScore: maxCreditScore, address: address, hash: hash },
			"zkp/credit_proof.wasm",
			"zkp/circuit_1.zkey");

		return { proof, publicSignals };
	}

	async verifyAgeProof(address: string, proof: any, publicSignals: any): Promise<boolean> {
		const id = await this.dIdContract.getID(address);
		const vKey = require("zkp/verification_key.json")
		// const vKey = JSON.parse(fs.readFileSync("verification_key.json"));
		try {
			const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);
			return (res && (id.dobHash == publicSignals[3]));
		} catch (e) {
			return false;
		}
	}

	async verifyCreditProof(profiler: string, address: string, proof: any, publicSignals: any): Promise<boolean> {
		const profile = await this.dIdContract.getProfile(profiler, address);
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

	// Utils
	getProvider() {
		return this.provider;
	}
}

export default Identity;
