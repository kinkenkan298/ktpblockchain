import { PersonalInfoSchema } from "@/features/auth/types/register-schema";
import { db } from "@/lib/db";
import { ktp_records } from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const registerUserKtp = createServerFn()
  .inputValidator(
    z.object({
      ...PersonalInfoSchema.shape,
      txHash: z.string(),
      blockNumber: z.string(),
      ipfsCid: z.string(),
      ipfsUrl: z.string(),
      contractRecordId: z.string(),
      blockchainHash: z.string(),
      userId: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const {
      kota,
      nama_lengkap,
      nik,
      txHash,
      ipfsCid,
      ipfsUrl,
      blockNumber,
      contractRecordId,
      blockchainHash,
      provinsi,
      userId,
    } = data;
    const recordId = await db
      .insert(ktp_records)
      .values({
        userId: userId,
        nik,
        txHash,
        fullName: nama_lengkap,
        city: kota,
        province: provinsi,
        ipfsCid,
        ipfsUrl,
        blockchainHash,
        blockNumber,
        contractRecordId,
        status: "PENDING",
        isVerified: false,
      })
      .$returningId();
    return recordId;
  });
