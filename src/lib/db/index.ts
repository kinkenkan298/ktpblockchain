import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "@/lib/env";

const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  port: parseInt(DB_PORT || "3306"),
  database: DB_NAME,
});

export const db = drizzle(pool);
