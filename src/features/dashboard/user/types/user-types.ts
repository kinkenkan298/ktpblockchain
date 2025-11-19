import { User } from "better-auth";

export type AccessLog = {
  id: string;
  user_id: string;
  accessor_name: string;
  accessor_type: string;
  data_accessed: string;
  purpose: string;
  access_time: string;
  status: string;
  created_at: string;
};

export type ActiveConsent = {
  id: string;
  user_id: string;
  organization: string;
  organization_type: string;
  data_shared: string[];
  purpose: string;
  granted_at: string;
  expires_at: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export interface DataKtp {
  fullName: string;
  nik: string;
  province: string | null;
  city: string | null;

  ipfsCid: string;
  ipfsUrl: string;

  blockchainHash: string;
  txHash: string;
  blockNumber: string | null;
  contractRecordId: string;

  isVerified: boolean | null;
  verifiedAt?: Date | null;

  status: "PENDING" | "VERIFIED" | "REJECTED" | "SUSPENDED" | null;
}

export interface ProfileCardProps {
  user?: User;
  data_ktp: DataKtp;
}

export interface UserAddress {
  full_address: string;
  rt: string;
  rw: string;
  kelurahan: string;
  kecamatan: string;
  city: string;
  province: string;
  postal_code: string;
}

export interface UserDocument {
  id: string;
  document_type: "ktp_front" | "ktp_back" | "selfie";
  document_url: string;
}

export interface UserSecurity {
  password_updated_at: string;
  two_factor_enabled: boolean;
  biometric_enabled: boolean;
  suspicious_activity_monitoring: boolean;
}

export interface ConnectedService {
  service_type: string;
  service_name: string;
  service_identifier: string;
  is_connected: boolean;
}
