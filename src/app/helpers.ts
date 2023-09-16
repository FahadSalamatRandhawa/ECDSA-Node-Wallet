import { keccak256 } from "ethereum-cryptography/keccak";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

export async function signMessage(messageHash: string, privateKey: any) {
  const signature = secp256k1.sign(messageHash, privateKey);

  return signature;
}

export function toObject(object: any) {
  return JSON.parse(
    JSON.stringify(
      object,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    )
  );
}

export function publicKeyToAddress(publicKeyBytes: Uint8Array) {
  const hash = keccak256(publicKeyBytes.slice(1));
  const publicaddress = toHex(hash.slice(hash.length - 20));
  console.log("ADDRESS GENERATED", publicaddress);
  return publicaddress;
}
