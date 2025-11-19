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

export const getAccount = () => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("Private key tidak ada!");
  }
  return privateKeyToAccount(process.env.PRIVATE_KEY as Hex);
};

export const publicClient = createPublicClient({
  chain: foundry,
  transport: http(process.env.RPC_URL),
});

export const walletClient = createWalletClient({
  chain: foundry,
  transport: http(process.env.RPC_URL),
  account: getAccount(),
}).extend(publicActions);

export const storageContractAbi =
  abi["contracts"]["src/HashStorage.sol:HashStorage"]["abi"];
export const STORAGE_CONTRACT_ADDRESS = process.env
  .STORAGE_CONTRACT_ADDRESS as Hex;
