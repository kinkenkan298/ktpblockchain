import { User } from "better-auth";

export type UserProfile = {
  id: string;
  user_id: string;
  nik: string;
  full_name: string;
  address: string;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  qr_code_secret: string;
  qr_refresh_interval: number;
  created_at: string;
  updated_at: string;
};

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
  isVerified: boolean | null;
  status: "PENDING" | "VERIFIED" | "REJECTED" | "SUSPENDED" | null;
}

export interface ProfileCardProps {
  user?: User;
  data_ktp: DataKtp;
}
