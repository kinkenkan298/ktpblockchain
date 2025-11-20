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
  return privateKeyToAccount(
    "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
  );
};
export const publicClient = createPublicClient({
  chain: foundry,
  transport: http(process.env.RPC_URL),
}).extend(publicActions);

export const walletClient = createWalletClient({
  chain: foundry,
  transport: http(process.env.RPC_URL),
  account: getAccount(),
}).extend(publicActions);

export const storageContractAbi =
  abi["contracts"]["src/HashStorage.sol:HashStorage"]["abi"];
export const STORAGE_CONTRACT_ADDRESS = process.env
  .STORAGE_CONTRACT_ADDRESS as Hex;
