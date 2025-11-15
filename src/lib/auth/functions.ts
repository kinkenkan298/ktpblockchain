import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "./auth";
import {
  PersonalInfoSchema,
  AllFormSchema,
} from "@/features/auth/types/auth-schema";
import { createKtpRecords } from "@/services/ktp.services";

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
        personalInfoResult.error.errors.map((e) => e.message).join(", ")
      );
    }

    const request = getRequest();
    const baseUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";
    const authUrl = `${baseUrl}/api/auth/sign-up/email`;

    const signUpResponse = await fetch(authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(request?.headers
          ? Object.fromEntries(request.headers.entries())
          : {}),
      },
      body: JSON.stringify({
        name: nama_lengkap,
        username,
        email,
        password,
      }),
    });

    if (!signUpResponse.ok) {
      const errorData = await signUpResponse.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Failed to create user account: ${signUpResponse.statusText}`
      );
    }

    const signUpData = await signUpResponse.json();

    if (signUpData.error) {
      throw new Error(
        signUpData.error.message || "Failed to create user account"
      );
    }

    if (!signUpData.user?.id) {
      throw new Error("User account created but user ID is missing");
    }

    // Create KTP records
    const ktpRecord = await createKtpRecords({
      ...personalInfoResult.data,
      userId: signUpData.user.id,
    });

    return {
      user: signUpData.user,
      ktpRecord,
      personalInfo: personalInfoResult.data,
    };
  });
