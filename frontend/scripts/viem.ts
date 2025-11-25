import {
  getAccount,
  STORAGE_CONTRACT_ADDRESS,
  storageContractAbi,
} from "@/lib/blockchain";
import { db } from "@/lib/db";
import { ktp_records } from "@/lib/db/schema";
import { lastLoginMethod } from "better-auth/plugins";
import {
  createPublicClient,
  createWalletClient,
  Hex,
  http,
  parseAbi,
  parseAbiItem,
  publicActions,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { foundry, sepolia } from "viem/chains";

const client = createWalletClient({
  account: privateKeyToAccount(process.env.OWNER_PK as Hex),
  transport: http("http://127.0.0.1:8545"),
  chain: foundry,
}).extend(publicActions);

const publicClient = createPublicClient({
  transport: http("http://127.0.0.1:8545"),
  chain: foundry,
});

(async () => {
  const recordIds = (await publicClient.readContract({
    address: STORAGE_CONTRACT_ADDRESS,
    abi: storageContractAbi,
    functionName: "getUserRecords",
    args: [getAccount().address],
  })) as bigint[];

  console.log(recordIds);
})();
