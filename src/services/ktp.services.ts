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
  .inputValidator(
    z.object({
      nik: z.string().regex(/^\d{16}$/, "NIK harus 16 digit angka"),
      nama_lengkap: z.string(),
      tempat_lahir: z.string(),
      tanggal_lahir: z.string(),
      jenis_kelamin: z.enum(["male", "female"]),
      alamat: z.string(),
      rt_rw: z.string().regex(/^\d{3}\/\d{3}$/, "Format RT/RW: 001/002"),
      kelurahan: z
        .string()
        .min(2, "Kelurahan terlalu pendek")
        .max(100, "Kelurahan terlalu panjang"),
      kecamatan: z
        .string()
        .min(2, "Kecamatan terlalu pendek")
        .max(100, "Kecamatan terlalu panjang"),
      kota: z
        .string()
        .min(2, "Kota terlalu pendek")
        .max(100, "Kota terlalu panjang"),
      provinsi: z
        .string()
        .min(2, "Provinsi terlalu pendek")
        .max(100, "Provinsi terlalu panjang"),
      kode_pos: z
        .string()
        .length(5, "Kode pos harus 5 digit")
        .regex(/^\d+$/, "Format kode pos tidak sesuai"),
      phone: z
        .string()
        .max(13, "Nomor telepon terlalu panjang")
        .regex(
          /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
          "Format nomor telepon tidak valid"
        ),
      userId: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const { nik, nama_lengkap, kota, provinsi, userId } = data;

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
          contractRecordId = (decoded.args as { id: bigint }).id?.toString();
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
