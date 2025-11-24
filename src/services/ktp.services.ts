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
import { blockchain_ktp_records, personal_info } from "@/lib/db/schema";
import { decodeEventLog } from "viem";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { PersonalInfoSchema } from "@/features/auth/types/register-schema";
import { eq } from "drizzle-orm";
import { pinata } from "@/lib/pinata";

export const createKtpRecord = createServerFn()
  .inputValidator(
    z.object({
      userId: z.string(),
      ...PersonalInfoSchema.shape,
    })
  )
  .handler(async ({ data }) => {
    const {
      userId,
      nik,
      nama_lengkap,
      provinsi,
      kota,
      tempat_lahir,
      tanggal_lahir,
      alamat,
      rt_rw,
      kelurahan,
      kecamatan,
      kode_pos,
      jenis_kelamin,
      phone,
    } = data;

    const getKtpRecord = await db
      .select()
      .from(personal_info)
      .where(eq(personal_info.nik, nik))
      .limit(1);

    const record = getKtpRecord[0];

    if (record) throw new Error("Data ktp sudah ada!");

    const insertKtpRecord = await db
      .insert(personal_info)
      .values({
        userId,
        nik,
        nama_lengkap,
        provinsi,
        kota,
        tempat_lahir,
        tanggal_lahir,
        alamat,
        rt_rw,
        kelurahan,
        kecamatan,
        kode_pos,
        jenis_kelamin,
        phone,
      })
      .$returningId();

    return insertKtpRecord;
  });

export const createBlockchainKtpRecord = createServerFn()
  .inputValidator(PersonalInfoSchema)
  .handler(async ({ data }) => {
    const { cid, url } = await $uploadData({ data });

    const generateHash = generateHashBlockchain(cid);

    const metadata = {
      id: `E-KTP`,
      nik: data.nik,
      fullName: data.nama_lengkap,
      province: data.provinsi,
      city: data.kota,
    };

    const txHash = await walletClient.writeContract({
      address: STORAGE_CONTRACT_ADDRESS,
      abi: storageContractAbi,
      functionName: "storeHash",
      args: [cid, JSON.stringify(metadata)],
    });

    const receipt = await walletClient.waitForTransactionReceipt({
      hash: txHash,
    });

    const blockTimestamp = await publicClient.getBlock({
      blockHash: receipt.blockHash,
    });

    const blockchainDate = new Date(Number(blockTimestamp.timestamp) * 1000);

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
      blockchainDate,
      metadata,
    };
  });

export const getKtpRecord = createServerFn()
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    const { userId } = data;

    const getRecord = await db
      .select()
      .from(blockchain_ktp_records)
      .where(eq(blockchain_ktp_records.ktpPersonalInfoId, userId))
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

export const getCidData = createServerFn()
  .inputValidator(z.object({ ipfsCid: z.string() }))
  .handler(async ({ data }) => {
    const { ipfsCid } = data;
    console.log(ipfsCid);

    const { data: cid_data, contentType } =
      await pinata.gateways.private.get(ipfsCid);

    if (!cid_data) throw new Error("Data tidak ditemukan!");

    try {
      if (
        contentType?.includes("application/json") ||
        typeof cid_data === "object"
      ) {
        if (cid_data instanceof Blob) {
          return JSON.parse(await cid_data.text());
        }
        return JSON.parse(JSON.stringify(cid_data));
      }

      if (typeof cid_data === "string") {
        return { cid_data };
      }

      return { cid_data: null };
    } catch (error) {
      console.error("Error parsing CID data:", error);
      throw error;
    }
  });
