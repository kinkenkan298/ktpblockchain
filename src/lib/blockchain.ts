import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { ETHEREUM_RPC_URL, PRIVATE_KEY } from "./env";
import { privateKeyToAccount } from "viem/accounts";

export const publicClient = createPublicClient({
  transport: http(ETHEREUM_RPC_URL),
  chain: sepolia,
});
export const walletClient = createWalletClient({
  transport: http(ETHEREUM_RPC_URL),
  chain: sepolia,
});

export const getAccount = () => {
  if (!PRIVATE_KEY) {
    throw new Error("Private key tidak ada!");
  }
  return privateKeyToAccount(PRIVATE_KEY as `0x${string}`);
};
