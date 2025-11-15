import { createPublicClient, createWalletClient, http, parseAbi } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

export const publicClient = createPublicClient({
  transport: http(),
  chain: sepolia,
});
export const walletClient = createWalletClient({
  transport: http(),
  chain: sepolia,
});

export const getAccount = () => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("Private key tidak ada!");
  }
  return privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
};

export const storageContractAbi = parseAbi([
  "function storeHash(string memory _hash) public returns (uint256)",
  "function getHash(uint256 _id) public view returns (string memory)",
  "event HashStored(uint256 indexed id, string hash, address indexed user)",
]);
export const STORAGE_CONTRACT_ADDRESS = process.env
  .STORAGE_CONTRACT_ADDRESS as `0x${string}`;
