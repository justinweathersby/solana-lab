import "dotenv/config";
import SolanaService from "../services/solana";

// Bug with this atm https://github.com/solana-developers/helpers/issues/38
// import { getKeypairFromEnvironment } from "@solana-developers/helpers";
// const keypair = await getKeypairFromEnvironment("SECRET_KEY");

const solanaService = new SolanaService();
const keypair = solanaService.getKeypairFromEnvironment();

console.log(`The public key is: `, keypair.publicKey.toBase58());
console.log(`The secret key is: `, keypair.secretKey);
console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`
);
