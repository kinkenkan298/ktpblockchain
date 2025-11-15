import { PersonalInfoSchema } from "@/features/auth/types/register-schema";
import { $uploadData } from "./ipfs.api";
import { generateHashBlockchain } from "@/lib/encryption";
import { db } from "@/lib/db";
import {
  getAccount,
  publicClient,
  STORAGE_CONTRACT_ADDRESS,
  storageContractAbi,
  walletClient,
} from "@/lib/blockchain";
import { ktp_records } from "@/lib/db/schema";
import { decodeEventLog } from "viem";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const createKtpRecords = createServerFn()
  .inputValidator(z.object({ ...PersonalInfoSchema.shape, userId: z.string() }))
  .handler(async ({ data }) => {
    const { nik, nama_lengkap, provinsi, kota, userId } = data;

    if (!/^\d{16}$/.test(nik)) {
      throw new Error("NIK harus 16 digit angka");
    }

    const { cid, url } = await $uploadData({ data });
    console.log(`File uploaded to IPFS: ${cid}`);

    const generateHash = generateHashBlockchain(cid);
    console.log("Storing to blockchain...");

    const account = getAccount();

    const { request } = await publicClient.simulateContract({
      address: STORAGE_CONTRACT_ADDRESS,
      abi: storageContractAbi,
      functionName: "storeHash",
      args: [generateHash],
      account,
    });

    const txHash = await walletClient.writeContract(request);
    console.log(`Transaction sent: ${txHash}`);

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
      confirmations: 2,
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

    const recordId = await db
      .insert(ktp_records)
      .values({
        userId,
        nik,
        txHash,
        fullName: nama_lengkap,
        city: kota,
        province: provinsi,
        ipfsCid: cid,
        ipfsUrl: url,
        blockchainHash: generateHash,
        blockNumber: receipt.blockNumber.toString(),
        contractRecordId,
        isVerified: false,
      })
      .$returningId();

    return {
      recordId,
      ipfsCid: cid,
      ipfsUrl: url,
      txHash,
      blockNumber: receipt.blockNumber.toString(),
    };
  });

// export const createKtpRecords = async (
//   data: PersonalInfoSchema,
//   userId: string
// ) => {
//   const { nik, nama_lengkap, provinsi, kota } = data;

//   if (!/^\d{16}$/.test(nik)) {
//     throw new Error("NIK harus 16 digit angka");
//   }

//   const { cid, url } = await $uploadData({ data });
//   console.log(`File uploaded to IPFS: ${cid}`);

//   const generateHash = generateHashBlockchain(cid);
//   console.log("Storing to blockchain...");

//   const account = getAccount();

//   const { request } = await publicClient.simulateContract({
//     address: STORAGE_CONTRACT_ADDRESS,
//     abi: storageContractAbi,
//     functionName: "storeHash",
//     args: [generateHash],
//     account,
//   });

//   const txHash = await walletClient.writeContract(request);
//   console.log(`Transaction sent: ${txHash}`);

//   const receipt = await publicClient.waitForTransactionReceipt({
//     hash: txHash,
//     confirmations: 2,
//   });
//   console.log(`Transaction confirmed at block ${receipt.blockNumber}`);

//   let contractRecordId: string | undefined;
//   for (const log of receipt.logs) {
//     try {
//       const decoded = decodeEventLog({
//         abi: storageContractAbi,
//         data: log.data,
//         topics: log.topics,
//       });
//       if (decoded.eventName === "HashStored") {
//         contractRecordId = (decoded.args as any).id?.toString();
//       }
//     } catch {
//       continue;
//     }
//   }

//   const recordId = await db
//     .insert(ktp_records)
//     .values({
//       userId,
//       nik,
//       txHash,
//       fullName: nama_lengkap,
//       city: kota,
//       province: provinsi,
//       ipfsCid: cid,
//       ipfsUrl: url,
//       blockchainHash: generateHash,
//       blockNumber: receipt.blockNumber.toString(),
//       contractRecordId,
//       isVerified: false,
//     })
//     .$returningId();

//   return {
//     recordId,
//     ipfsCid: cid,
//     ipfsUrl: url,
//     txHash,
//     blockNumber: receipt.blockNumber.toString(),
//   };
// };
