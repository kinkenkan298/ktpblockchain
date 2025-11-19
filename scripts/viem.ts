import { getAccount, STORAGE_CONTRACT_ADDRESS } from "@/lib/blockchain";
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
  account: privateKeyToAccount(process.env.PRIVATE_KEY as Hex),
  transport: http("http://127.0.0.1:8545"),
  chain: foundry,
}).extend(publicActions);

const publicClient = createPublicClient({
  transport: http("http://127.0.0.1:8545"),
  chain: foundry,
});

async function run() {
  const data = await db.select().from(ktp_records);

  const targetId = data.length > 0 ? data[0]["contractRecordId"] : 1;

  const logs = await publicClient.getLogs({
    address: STORAGE_CONTRACT_ADDRESS,
    event: parseAbiItem(
      `event HashStored(uint256 indexed id, string hash, address indexed owner, uint256 timestamp)`
    ),
    args: {
      id: BigInt(targetId),
    },
    fromBlock: "earliest",
    toBlock: "latest",
  });

  if (logs.length === 0) return null;

  return logs
    .map((log) => ({
      id: log.args.id?.toString(),
      ipfsHash: log.args.hash,
      timestamp: new Date(Number(log.args.timestamp) * 1000).toLocaleString(),
      owner: log.args.owner,
    }))
    .reverse();
}

(async () => {
  try {
    const result = await run();
    console.log(result);
  } catch (error: unknown) {
    console.error(error);
  } finally {
    console.log("Trace done");
    process.exit(0);
  }
})();
