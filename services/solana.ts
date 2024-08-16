import {
  Commitment,
  Connection,
  ConnectionConfig,
  Keypair,
} from "@solana/web3.js";
import bs58 from "bs58";

import "dotenv/config";

class SolanaService {
  network: string;

  constructor(network: string = "devnet") {
    this.network = process.env["SOLANA_NETWORK"] || network;
  }

  getKeypairFromEnvironment = (variableName: string = "SECRET_KEY") => {
    const secretKeyString = process.env[variableName];
    if (!secretKeyString) {
      throw new Error(`Please set '${variableName}' in environment.`);
    }

    // Try the shorter base58 format first
    let decodedSecretKey: Uint8Array;
    try {
      decodedSecretKey = bs58.decode(secretKeyString);
      return Keypair.fromSecretKey(decodedSecretKey);
    } catch (throwObject) {
      const error = throwObject as Error;
      if (!error.message.includes("Non-base58 character")) {
        throw new Error(
          `Invalid secret key in environment variable '${variableName}'!`
        );
      }
    }

    // Try the longer JSON format
    try {
      decodedSecretKey = Uint8Array.from(JSON.parse(secretKeyString));
    } catch (error) {
      throw new Error(
        `Invalid secret key in environment variable '${variableName}'!`
      );
    }
    return Keypair.fromSecretKey(decodedSecretKey);
  };

  newConnection = (params?: Commitment | ConnectionConfig) => {
    return new Connection(`https://api.${this.network}.solana.com`, params);
  };
}

export default SolanaService;
