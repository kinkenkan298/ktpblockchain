import { drizzle } from "drizzle-orm/mysql2";
import { DATABASE_URL } from "@/lib/env";

export const db = drizzle(DATABASE_URL!);
