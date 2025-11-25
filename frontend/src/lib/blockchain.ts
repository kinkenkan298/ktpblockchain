import {
  createPublicClient,
  createWalletClient,
  Hex,
  http,
  publicActions,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { foundry } from "viem/chains";
import abi from "../../artifacts/HashStorage.json";

const getRpcUrl = () => {
  if (import.meta.env.SSR) {
    return process.env.INTERNAL_RPC_URL || "http://blockchain:8545";
  }

  return import.meta.env.VITE_PUBLIC_RPC_URL || "http://localhost:8545";
};

const rpcUrl = getRpcUrl();

export const getAccount = () => {
  return privateKeyToAccount(
    "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
  );
};
export const publicClient = createPublicClient({
  chain: foundry,
  transport: http(process.env.VITE_RPC_URL),
}).extend(publicActions);

export const walletClient = createWalletClient({
  chain: foundry,
  transport: http(process.env.VITE_RPC_URL),
  account: getAccount(),
}).extend(publicActions);

export const storageContractAbi =
  abi["contracts"]["src/HashStorage.sol:HashStorage"]["abi"];

// Read contract address from environment variable (set during build)
// Falls back to hardcoded address for local development
export const STORAGE_CONTRACT_ADDRESS = (import.meta.env
  .VITE_HASH_STORAGE_ADDRESS ||
  "0x712516e61C8B383dF4A63CFe83d7701Bce54B03e") as Hex;
