import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/lib/db/migrations",
  schema: "./src/lib/db/schema/index.ts",
  dialect: "mysql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL || "mysql://root:@localhost:3306/ktpblockchain",
  },
});
