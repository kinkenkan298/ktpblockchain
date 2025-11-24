import { MetadataSchema } from "@/features/dashboard/user/types/blockchain-user";
import { db } from "@/lib/db";
import { blockchain_ktp_records } from "@/lib/db/schema";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const createBlockchainKtpRecord = createServerFn()
  .inputValidator(
    z.object({
      personalInfoId: z.string(),
      txHash: z.string(),
      blockNumber: z.string(),
      ipfsCid: z.string(),
      ipfsUrl: z.string(),
      contractRecordId: z.string(),
      blockchainHash: z.string(),
      blockchainDate: z.date(),
      metadata: MetadataSchema,
    })
  )
  .handler(async ({ data }) => {
    const {
      personalInfoId,
      txHash,
      ipfsCid,
      ipfsUrl,
      blockNumber,
      contractRecordId,
      blockchainHash,
      blockchainDate,
      metadata,
    } = data;
    const recordId = await db
      .insert(blockchain_ktp_records)
      .values({
        personalInfoId,
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
