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
import { MetadataSchema } from "@/features/dashboard/user/types/blockchain-user";

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

    const metadataString = JSON.stringify(metadata);

    const txHash = await walletClient.writeContract({
      address: STORAGE_CONTRACT_ADDRESS,
      abi: storageContractAbi,
      functionName: "storeHash",
      args: [cid, metadataString],
    });

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
    });

    const block = await publicClient.getBlock({
      blockHash: receipt.blockHash,
    });
    const blockchainDate = new Date(Number(block.timestamp) * 1000);

    let contractRecordId: string | undefined;

    for (const log of receipt.logs) {
      if (
        log.address.toLowerCase() !== STORAGE_CONTRACT_ADDRESS.toLowerCase()
      ) {
        continue;
      }

      try {
        const decoded = decodeEventLog({
          abi: storageContractAbi,
          data: log.data,
          topics: log.topics,
        });

        if (decoded.eventName === "HashStored") {
          contractRecordId = (decoded.args as any).id?.toString();
          break;
        }
      } catch (err) {
        console.warn("Log skip:", err);
        continue;
      }
    }

    if (!contractRecordId) {
      console.error("Logs ditemukan:", receipt.logs);
      throw new Error(
        `Gagal menemukan ID. Pastikan ABI mengandung 'event HashStored'. Tx: ${txHash}`
      );
    }

    return {
      ipfsCid: cid,
      ipfsUrl: url,
      txHash,
      blockNumber: receipt.blockNumber.toString(),
      generateHash,
      blockchainDate,
      metadata,
      contractRecordId,
    };
  });
export const createBlockchainRecord = createServerFn()
  .inputValidator(
    z.object({
      personalId: z.string(),
      contractRecordId: z.string(),
      ipfsCid: z.string(),
      ipfsUrl: z.string(),
      txHash: z.string(),
      blockNumber: z.string(),
      generateHash: z.string(),
      blockchainDate: z.date(),
      metadata: MetadataSchema,
    })
  )
  .handler(async ({ data }) => {
    const {
      personalId,
      contractRecordId,
      ipfsCid,
      ipfsUrl,
      txHash,
      blockNumber,
      generateHash,
      blockchainDate,
      metadata,
    } = data;

    const insertBlockchainRecord = await db
      .insert(blockchain_ktp_records)
      .values({
        personalInfoId: personalId,
        contractRecordId,
        ipfsCid,
        ipfsUrl,
        txHash,
        blockNumber,
        blockchainDate,
        metadata,
        blockchainHash: generateHash,
      })
      .$returningId();

    await db
      .update(personal_info)
      .set({
        status: "VERIFIED",
        isVerified: true,
        verifiedAt: new Date(),
      })
      .where(eq(personal_info.id, personalId));

    return insertBlockchainRecord;
  });
export const getKtpRecord = createServerFn()
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    const { userId } = data;

    const getRecord = await db
      .select()
      .from(personal_info)
      .where(eq(personal_info.userId, userId))
      .limit(1);

    const record = getRecord[0];

    if (!record) throw new Error("Data ktp tidak ada ditemukan!");

    return record;
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

export const getAllDataKtp = createServerFn().handler(async () => {
  const getAllData = await db.select().from(personal_info);
  return getAllData;
});
