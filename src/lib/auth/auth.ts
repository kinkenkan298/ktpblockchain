import { betterAuth } from "better-auth";
import { admin, username } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { authTables } from "../db/schema/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema: authTables,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  plugins: [username(), admin()],
  user: {
    additionalFields: {
      walletAddress: {
        type: "string",
        required: false,
        unique: true,
      },
      nik: {
        type: "string",
        required: false,
        unique: true,
      },
      phoneNumber: {
        type: "string",
        required: false,
      },
      placeOfBirth: {
        type: "string",
        required: false,
      },
      dateOfBirth: {
        type: "string",
        required: false,
      },
      gender: {
        type: "string",
        required: false,
      },
      address: {
        type: "string",
        required: false,
      },
      rtRw: {
        type: "string",
        required: false,
      },
      kelurahan: {
        type: "string",
        required: false,
      },
      kecamatan: {
        type: "string",
        required: false,
      },
      city: {
        type: "string",
        required: false,
      },
      province: {
        type: "string",
        required: false,
      },
      postalCode: {
        type: "string",
        required: false,
      },
      identityHash: {
        type: "string",
        required: false,
      },
      ipfsDocumentHash: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        default: "PENDING",
      },
    },
  },

  secret: process.env.BETTER_AUTH_SECRET!,
});
