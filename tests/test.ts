import Identity from '../src';
import { ethers } from 'ethers';

import dotenv from "dotenv";
dotenv.config();

async function main() {
    const identity = new Identity();
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, identity.getProvider());
    console.log(signer)
    // const address = await signer.getAddress();
    // console.log(address);

    const tx = await identity.mintIdentity(signer, "0xEf4a90A6Ed8363Fa1b0b54EB78deBaB164A89369", "John Doe", "01/01/1990");
    console.log(tx);
}

main();