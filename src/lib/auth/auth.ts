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
    autoSignIn: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  plugins: [username(), admin()],
  user: {
    additionalFields: {
      phoneNumber: {
        type: "string",
        required: false,
      },
    },
  },

  secret: process.env.BETTER_AUTH_SECRET!,
});
