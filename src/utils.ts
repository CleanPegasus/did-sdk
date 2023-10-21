// import circomlibjs from "circomlibjs";
import * as circomlibjs from "circomlibjs";

export async function poseidonHash(inputs: any) {
  const poseidon = await circomlibjs.buildPoseidon();
  const poseidonHash = poseidon.F.toString(poseidon(inputs));
  return poseidonHash;
}
