import "dotenv/config";

import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

try {
  // Pull public key from env file
  const publicKey = new PublicKey(process.env.PUBLIC_KEY || "");

  // Check if public key is on correct curve
  if (!PublicKey.isOnCurve(publicKey)) {
    throw new Error();
  }

  // Attempt to connect and check balance
  const connection = new Connection(
    `https://api.${process.env.SOLANA_NETWORK}.solana.com`,
    "confirmed"
  );
  const balanceInLamports = await connection.getBalance(publicKey);
  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

  console.log(
    `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
  );
} catch (error) {
  console.log("Error validating public key");
}
