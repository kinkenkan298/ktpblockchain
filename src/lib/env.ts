import "dotenv/config";

export const {
  DB_HOST,
  DB_USER,
  DB_PORT,
  DB_PASS,
  DB_NAME,
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
} = process.env;
