export interface BlockchainTransaction {
  id: string;
  transactionHash: string; // Full hash di blockchain
  anonymousId: string; // ID anonim untuk user
  actionType:
    | "data_share"
    | "consent_given"
    | "identity_verify"
    | "access_granted";
  timestamp: Date;
  status: "completed" | "pending" | "failed";
  involvedParties: number; // Jumlah pihak terlibat (tanpa detail)
  dataFields: string[]; // Jenis data yang diakses (tanpa konten)
  blockchainNetwork: "polygon" | "ethereum";
  gasUsed?: number;
  blockNumber?: number;
}
