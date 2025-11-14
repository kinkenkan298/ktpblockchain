import { PersonalInfoSchema } from "@/features/auth/types/register-schema";
import { $uploadData } from "./ipfs.api";
import { generateHashBlockchain } from "@/lib/encryption";
import { db } from "@/lib/db";

export const createKtpRecords = async (data: PersonalInfoSchema) => {
  try {
    const { nik } = data;

    if (!/^\d{16}$/.test(nik)) {
      throw new Error("NIK harus 16 digit angka");
    }

    // cek nik

    // const cek_data = await db.query.$

    // upload data to ipfs and get cid
    const { cid, url } = await $uploadData({ data });

    // generate hash
    const generateHash = generateHashBlockchain(cid);
  } catch (error: unknown) {
    console.error(error);
  }
};
