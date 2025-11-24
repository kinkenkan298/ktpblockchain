import { Metadata } from "@/features/dashboard/user/types/blockchain-user";
import { createId } from "@paralleldrive/cuid2";
import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  boolean,
  mysqlEnum,
  json,
} from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at", { fsp: 3 })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),

  username: varchar("username", { length: 255 }).unique(),
  displayUsername: text("display_username"),
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires", { fsp: 3 }),
});

export const personal_info = mysqlTable("personal_info", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(createId),

  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  nik: varchar("nik", { length: 16 }).notNull(),
  nama_lengkap: varchar("nama_lengkap", { length: 255 }).notNull(),
  provinsi: varchar("provinsi", { length: 255 }).notNull(),
  kota: varchar("kota", { length: 255 }).notNull(),
  tempat_lahir: varchar("tempat_lahir", { length: 255 }).notNull(),
  tanggal_lahir: varchar("tanggal_lahir", { length: 255 }).notNull(),
  alamat: varchar("alamat", { length: 255 }).notNull(),
  rt_rw: varchar("rt_rw", { length: 255 }).notNull(),
  kelurahan: varchar("kelurahan", { length: 255 }).notNull(),
  kecamatan: varchar("kecamatan", { length: 255 }).notNull(),
  kode_pos: varchar("kode_pos", { length: 255 }).notNull(),
  jenis_kelamin: mysqlEnum("jenis_kelamin", ["male", "female"]).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
});

export const blockchain_ktp_records = mysqlTable("blockchain_ktp_records", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(createId),

  personalInfoId: varchar("personal_info_id", { length: 36 })
    .notNull()
    .references(() => personal_info.id, { onDelete: "cascade" }),

  ipfsCid: text("ipfs_cid").unique(),
  ipfsUrl: text("ipfs_url").unique(),

  blockchainHash: text("blockchain_hash"),
  txHash: text("tx_hash").unique(),
  blockNumber: text("block_number"),
  contractRecordId: text("contract_record_id"),
  blockchainDate: timestamp("blockchain_date"),

  metadata: json("metadata").$type<Metadata>(),

  status: mysqlEnum("status", [
    "PENDING",
    "VERIFIED",
    "REJECTED",
    "SUSPENDED",
  ]).default("PENDING"),

  isVerified: boolean("is_verified").default(false),
  verifiedAt: timestamp("verified_at"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const session = mysqlTable("session", {
  id: varchar("id", { length: 36 }).primaryKey(),
  expiresAt: timestamp("expires_at", { fsp: 3 }).notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { fsp: 3 })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .$onUpdate(() => new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

export const account = mysqlTable("account", {
  id: varchar("id", { length: 36 }).primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { fsp: 3 }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { fsp: 3 }),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at", { fsp: 3 })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const verification = mysqlTable("verification", {
  id: varchar("id", { length: 36 }).primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { fsp: 3 }).notNull(),
  createdAt: timestamp("created_at", { fsp: 3 })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
});

export const authTables = {
  user,
  session,
  account,
  verification,
};
