import { addKeypairToEnvFile } from "@solana-developers/helpers";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

const keypair = Keypair.generate();

await addKeypairToEnvFile(keypair, "SECRET_KEY");

console.log(`The public key is: `, keypair.publicKey.toBase58());
console.log(`The secret key is: `, bs58.encode(keypair.secretKey));
console.log(`✅ Finished!`);
