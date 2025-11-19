import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const updateUserKtp = createServerFn().inputValidator(
  z.object({
    userId: z.string(),
    payload: z.object({
      blockNumber: z.string(),
      ipfsCid: z.string(),
      ipfsUrl: z.string(),
      contractRecordId: z.string(),
      blockchainHash: z.string(),
    }),
  })
);
