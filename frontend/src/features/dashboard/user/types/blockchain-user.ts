import z from "zod";

export type TxType = "ALL" | "STORE" | "CONSENT" | "VERIFY";

export type TxItem = {
  hash: string;
  category: TxType;
  title: string;
  timestamp: Date;
  actor: string;
  metadata: string[];
  rawEvent: any;
};

export type DocumentData = {
  id: string;
  type: string;
  name: string;
  number: string;
  hash: string;
  color: string;
  rawTimestamp: Date;
};

export const MetadataSchema = z.object({
  id: z.string(),
  nik: z.string(),
  fullName: z.string(),
  province: z.string(),
  city: z.string(),
});

export type Metadata = z.infer<typeof MetadataSchema>;
