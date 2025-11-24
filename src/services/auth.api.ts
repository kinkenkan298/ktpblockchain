import { MetadataSchema } from "@/features/dashboard/user/types/blockchain-user";
import { db } from "@/lib/db";
import { ktp_records } from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const registerUserKtp = createServerFn()
  .inputValidator(
    z.object({
      txHash: z.string(),
      blockNumber: z.string(),
      ipfsCid: z.string(),
      ipfsUrl: z.string(),
      contractRecordId: z.string(),
      blockchainHash: z.string(),
      userId: z.string(),
      blockchainDate: z.date(),
      metadata: MetadataSchema,
    })
  )
  .handler(async ({ data }) => {
    const {
      txHash,
      ipfsCid,
      ipfsUrl,
      blockNumber,
      contractRecordId,
      blockchainHash,
      userId,
      blockchainDate,
      metadata,
    } = data;
    const recordId = await db
      .insert(ktp_records)
      .values({
        userId,
        txHash,
        ipfsCid,
        ipfsUrl,
        blockchainHash,
        blockNumber,
        contractRecordId,
        blockchainDate,
        metadata,
        status: "PENDING",
        isVerified: false,
      })
      .$returningId();
    return recordId;
  });
