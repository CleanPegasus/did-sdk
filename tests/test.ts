import Identity from '../src';
import { ethers } from 'ethers';

import dotenv from "dotenv";
dotenv.config();

async function main() {
    const identity = new Identity();
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, identity.getProvider());
    const address = await signer.getAddress();
    console.log(address);

    const tx = await identity.mintIdentity(signer, address, "John Doe", "01/01/1990");
    console.log(tx);
}

main();