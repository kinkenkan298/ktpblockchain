import {
  STORAGE_CONTRACT_ADDRESS,
  storageContractAbi,
  getAccount,
} from "@/lib/blockchain";
import { createWalletClient, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { foundry } from "viem/chains";

const BANK_PK =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const ownerAccount = getAccount();
const bankAccount = privateKeyToAccount(BANK_PK);

const ownerClient = createWalletClient({
  account: ownerAccount,
  chain: foundry,
  transport: http("http://127.0.0.1:8545"),
}).extend(publicActions);

const bankClient = createWalletClient({
  account: bankAccount,
  chain: foundry,
  transport: http("http://127.0.0.1:8545"),
}).extend(publicActions);

async function requestAccess(recordId: string, reason: string) {
  const tx = await bankClient.writeContract({
    address: STORAGE_CONTRACT_ADDRESS,
    abi: storageContractAbi,
    functionName: "requestsDataAccess",
    args: [ownerAccount.address, recordId, reason],
  });
  await bankClient.waitForTransactionReceipt({
    hash: tx,
  });
  console.log(`✅ Request Sent! Tx: ${tx}`);
}

async function approveAccess(recordId: string, waktu: number) {
  const tx = await ownerClient.writeContract({
    address: STORAGE_CONTRACT_ADDRESS,
    abi: storageContractAbi,
    functionName: "approvedDataAccess",
    args: [bankAccount.address, recordId, waktu],
  });
  await ownerClient.waitForTransactionReceipt({
    hash: tx,
  });
  console.log(`✅ Approved! Tx: ${tx}`);
}

(async () => {
  // console.log(ownerAccount.address);
  await requestAccess("0", "Cek kredit skor bank nasabah");
  // await approveAccess("0", 60);
})();
