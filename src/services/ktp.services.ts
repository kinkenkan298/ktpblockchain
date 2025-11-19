/* eslint-disable @typescript-eslint/no-explicit-any */
import { $uploadData } from "./ipfs.api";
import { generateHashBlockchain } from "@/lib/encryption";
import { db } from "@/lib/db";
import {
  publicClient,
  STORAGE_CONTRACT_ADDRESS,
  storageContractAbi,
  walletClient,
} from "@/lib/blockchain";
import { ktp_records } from "@/lib/db/schema";
import { decodeEventLog } from "viem";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { PersonalInfoSchema } from "@/features/auth/types/register-schema";
import { eq } from "drizzle-orm";

export const createKtpRecord = createServerFn()
  .inputValidator(PersonalInfoSchema)
  .handler(async ({ data }) => {
    const { cid, url } = await $uploadData({ data });
    console.log(`File uploaded to IPFS: ${cid}`);

    const generateHash = generateHashBlockchain(cid);
    console.log("Storing to blockchain...");

    const txHash = await walletClient.writeContract({
      address: STORAGE_CONTRACT_ADDRESS,
      abi: storageContractAbi,
      functionName: "storeHash",
      args: [cid],
    });

    console.log(`Transaction sent: ${txHash}`);

    const receipt = await walletClient.waitForTransactionReceipt({
      hash: txHash,
    });
    console.log(`Transaction confirmed at block ${receipt.blockNumber}`);

    let contractRecordId: string | undefined;
    for (const log of receipt.logs) {
      try {
        const decoded = decodeEventLog({
          abi: storageContractAbi,
          data: log.data,
          topics: log.topics,
        });
        if (decoded.eventName === "HashStored") {
          contractRecordId = (decoded.args as any).id?.toString();
        }
      } catch {
        continue;
      }
    }

    return {
      contractRecordId,
      ipfsCid: cid,
      ipfsUrl: url,
      txHash,
      blockNumber: receipt.blockNumber.toString(),
      generateHash,
    };
  });

export const getKtpRecord = createServerFn()
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    const { userId } = data;

    const getRecord = await db
      .select()
      .from(ktp_records)
      .where(eq(ktp_records.userId, userId))
      .limit(1);

    const record = getRecord[0];

    if (!record) throw new Error("Data ktp tidak ada ditemukan!");

    return record;
  });
export const getHashChain = createServerFn()
  .inputValidator(z.object({ chainId: z.bigint() }))
  .handler(async ({ data }) => {
    const { chainId } = data;

    const result = await publicClient.readContract({
      address: STORAGE_CONTRACT_ADDRESS,
      abi: storageContractAbi,
      functionName: "getHash",
      args: [BigInt(chainId)],
    });

    if (!result) throw new Error("id hash tidak ditemukan!");

    return result;
  });
