import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "./auth";
import {
  PersonalInfoSchema,
  AllFormSchema,
} from "@/features/auth/types/auth-schema";
import { createKtpRecords } from "@/services/ktp.services";
import { authClient } from "./client";

export const $getUser = createServerFn({ method: "GET" }).handler(async () => {
  const request = getRequest();

  if (!request?.headers) return null;

  const userSession = await auth.api.getSession({ headers: request.headers });

  if (!userSession) return null;

  return { user: userSession.user, session: userSession.session };
});

export const $registerUser = createServerFn()
  .inputValidator(AllFormSchema)
  .handler(async ({ data }) => {
    const {
      username,
      email,
      password,
      phone,
      nama_lengkap,
      nik,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      alamat,
      rt_rw,
      kelurahan,
      kecamatan,
      kota,
      provinsi,
      kode_pos,
    } = data;

    const personalInfoData = {
      nama_lengkap,
      nik,
      tempat_lahir,
      tanggal_lahir,
      alamat,
      rt_rw,
      kota,
      kelurahan,
      jenis_kelamin,
      kecamatan,
      provinsi,
      kode_pos,
      phone,
    };

    const personalInfoResult = PersonalInfoSchema.safeParse(personalInfoData);
    if (!personalInfoResult.success) {
      throw new Error(
        personalInfoResult.error.issues.map((error) => error.message).join(", ")
      );
    }

    const { error, data: signUpData } = await authClient.signUp.email({
      email,
      password,
      name: nama_lengkap,
      username,
    });

    if (error) throw new Error(error.message);

    if (!signUpData.user?.id) {
      throw new Error("User account created but user ID is missing");
    }

    const ktpRecordData = {
      nik: personalInfoResult.data.nik,
      nama_lengkap: personalInfoResult.data.nama_lengkap,
      tempat_lahir: personalInfoResult.data.tempat_lahir,
      tanggal_lahir: personalInfoResult.data.tanggal_lahir,
      jenis_kelamin: personalInfoResult.data.jenis_kelamin,
      alamat: personalInfoResult.data.alamat,
      rt_rw: personalInfoResult.data.rt_rw,
      kelurahan: personalInfoResult.data.kelurahan,
      kecamatan: personalInfoResult.data.kecamatan,
      kota: personalInfoResult.data.kota,
      provinsi: personalInfoResult.data.provinsi,
      kode_pos: personalInfoResult.data.kode_pos,
      phone: personalInfoResult.data.phone,
      userId: signUpData.user.id,
    };

    const ktpRecord = await createKtpRecords({ data: ktpRecordData });

    return {
      user: signUpData.user,
      ktpRecord,
      personalInfo: personalInfoResult.data,
    };
  });
