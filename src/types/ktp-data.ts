export interface KtpRecordResult {
  recordId: string;
  nik: string;
  ipfsCid: string;
  ipfsUrl: string;
  blockchainHash: string;
  txHash: string;
  blockNumber?: string;
  contractRecordId?: string;
  createdAt: Date;
}
