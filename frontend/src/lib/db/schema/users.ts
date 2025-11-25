import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  boolean,
  uniqueIndex,
  index,
  mysqlEnum,
  json,
  int,
} from "drizzle-orm/mysql-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { user, session, account, authTables } from "./auth-schema";

export const admin = mysqlTable(
  "admin",
  {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(createId),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    username: varchar("username", { length: 50 }).unique().notNull(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    department: varchar("department", { length: 100 }).notNull(),
    role: mysqlEnum("role", ["SUPER_ADMIN", "VERIFICATION_OFFER", "AUDITOR"]),
    isActive: boolean("is_active").default(true),
    lastLogin: timestamp("last_login"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    uniqueIndex("admin_user_idx").on(table.userId),
    uniqueIndex("admin_username_idx").on(table.username),
  ]
);

export const thirdPartyVerifier = mysqlTable(
  "third_party_verifier",
  {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(createId),
    companyName: varchar("company_name", { length: 255 }).notNull(),
    companyType: mysqlEnum("company_type", [
      "BANK",
      "HOSPITAL",
      "GOVERMENT",
      "OTHER",
    ]),
    walletAddress: varchar("wallet_address", { length: 42 }).unique().notNull(),
    apiKey: varchar("api_key", { length: 64 }).unique().notNull(),
    contactEmail: varchar("contact_email", { length: 255 }).notNull(),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    uniqueIndex("verifier_wallet_idx").on(table.walletAddress),
    uniqueIndex("verifier_apikey_idx").on(table.apiKey),
    index("verifier_company_idx").on(table.companyName),
  ]
);

export const verificationRequest = mysqlTable(
  "verification_request",
  {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(createId),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    adminId: varchar("admin_id", { length: 255 })
      .notNull()
      .references(() => admin.id, { onDelete: "cascade" }),
    documentFrontUrl: varchar("document_front_url", { length: 500 }).notNull(),
    documentBackUrl: varchar("document_back_url", { length: 500 }),
    selfieUrl: varchar("selfie_url", { length: 500 }).notNull(),
    ocrData: json("ocr_data"),
    status: mysqlEnum("status", ["PENDING", "APPROVED", "REJECTED"]).default(
      "PENDING"
    ),
    rejectionReason: text("rejection_reason"),
    verifiedAt: timestamp("verified_at"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("vr_user_idx").on(table.userId),
    index("vr_admin_idx").on(table.adminId),
    index("vr_status_idx").on(table.status),
  ]
);
export const dataAccessRequest = mysqlTable(
  "data_access_request",
  {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(createId),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    verifierId: varchar("verifier_id", { length: 255 })
      .notNull()
      .references(() => verificationRequest.id, { onDelete: "cascade" }),
    requestedFields: json("requested_fields").notNull(),
    purpose: text("purpose").notNull(),
    accessDuration: int("access_duration").default(24),
    status: mysqlEnum("status", [
      "PENDING",
      "APPROVED",
      "REJECTED",
      "EXPIRED",
    ]).default("PENDING"),
    userConsentAt: timestamp("user_consent_at"),
    expiresAt: timestamp("expires_at"),
    transactionHash: varchar("transaction_hash", { length: 66 }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("dar_user_idx").on(table.userId),
    index("dar_verifier_idx").on(table.verifierId),
    index("dar_status_idx").on(table.status),
  ]
);

export const accessLog = mysqlTable(
  "access_log",
  {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(createId),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    verifierId: varchar("verifier_id", { length: 255 })
      .notNull()
      .references(() => verificationRequest.id, { onDelete: "cascade" }),
    accessRequestId: varchar("access_request_id", { length: 255 }).notNull(),
    accessedFields: json("accessed_fields").notNull(),
    accessTimestamp: timestamp("access_timestamp").defaultNow(),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    blockchainTxHash: varchar("blockchain_tx_hash", { length: 66 }),
  },
  (table) => [
    index("al_user_idx").on(table.userId),
    index("al_verifier_idx").on(table.verifierId),
    index("al_timestamp_idx").on(table.accessTimestamp),
  ]
);
export const qrSession = mysqlTable(
  "qr_session",
  {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(createId),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    qrToken: varchar("qr_token", { length: 128 }).unique().notNull(),
    verifierId: varchar("verifier_id", { length: 255 }).references(
      () => verificationRequest.id,
      { onDelete: "cascade" }
    ),
    requestedFields: json("requested_fields").notNull(),
    status: mysqlEnum("status", [
      "ACTIVE",
      "USED",
      "EXPIRED",
      "CANCELLED",
    ]).default("ACTIVE"),
    expiresAt: timestamp("expires_at").notNull(),
    usedAt: timestamp("used_at"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    uniqueIndex("qr_token_idx").on(table.qrToken),
    index("qr_user_idx").on(table.userId),
    index("qr_status_idx").on(table.status),
  ]
);

export const systemAuditTrail = mysqlTable(
  "system_audit_trail",
  {
    id: varchar("id", { length: 255 }).primaryKey().$defaultFn(createId),
    actionType: varchar("action_type", { length: 100 }).notNull(),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    adminId: varchar("admin_id", { length: 255 })
      .notNull()
      .references(() => admin.id, { onDelete: "cascade" }),
    verifierId: varchar("verifier_id", { length: 255 }).references(
      () => verificationRequest.id,
      { onDelete: "cascade" }
    ),
    description: text("description").notNull(),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    blockchainTxHash: varchar("blockchain_tx_hash", { length: 66 }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("audit_action_idx").on(table.actionType),
    index("audit_user_idx").on(table.userId),
    index("audit_created_idx").on(table.createdAt),
  ]
);

export const userRelations = relations(user, ({ one, many }) => ({
  sessions: many(session),
  accounts: many(account),
  admin: one(admin),
  verificationRequests: many(verificationRequest),
  dataAccessRequests: many(dataAccessRequest),
  accessLogs: many(accessLog),
  qrSessions: many(qrSession),
  auditTrails: many(systemAuditTrail),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const adminRelations = relations(admin, ({ one, many }) => ({
  user: one(user, { fields: [admin.userId], references: [user.id] }),
  verificationRequests: many(verificationRequest),
  auditTrails: many(systemAuditTrail),
}));

export const thirdPartyVerifierRelations = relations(
  thirdPartyVerifier,
  ({ many }) => ({
    dataAccessRequests: many(dataAccessRequest),
    accessLogs: many(accessLog),
    qrSessions: many(qrSession),
    auditTrails: many(systemAuditTrail),
  })
);

export const verificationRequestRelations = relations(
  verificationRequest,
  ({ one }) => ({
    user: one(user, {
      fields: [verificationRequest.userId],
      references: [user.id],
    }),
    admin: one(admin, {
      fields: [verificationRequest.adminId],
      references: [admin.id],
    }),
  })
);

export const dataAccessRequestRelations = relations(
  dataAccessRequest,
  ({ one, many }) => ({
    user: one(user, {
      fields: [dataAccessRequest.userId],
      references: [user.id],
    }),
    verifier: one(thirdPartyVerifier, {
      fields: [dataAccessRequest.verifierId],
      references: [thirdPartyVerifier.id],
    }),
    accessLogs: many(accessLog),
  })
);

export const accessLogRelations = relations(accessLog, ({ one }) => ({
  user: one(user, { fields: [accessLog.userId], references: [user.id] }),
  verifier: one(thirdPartyVerifier, {
    fields: [accessLog.verifierId],
    references: [thirdPartyVerifier.id],
  }),
  accessRequest: one(dataAccessRequest, {
    fields: [accessLog.accessRequestId],
    references: [dataAccessRequest.id],
  }),
}));

export const qrSessionRelations = relations(qrSession, ({ one }) => ({
  user: one(user, { fields: [qrSession.userId], references: [user.id] }),
  verifier: one(thirdPartyVerifier, {
    fields: [qrSession.verifierId],
    references: [thirdPartyVerifier.id],
  }),
}));

export const systemAuditTrailRelations = relations(
  systemAuditTrail,
  ({ one }) => ({
    user: one(user, {
      fields: [systemAuditTrail.userId],
      references: [user.id],
    }),
    admin: one(admin, {
      fields: [systemAuditTrail.adminId],
      references: [admin.id],
    }),
    verifier: one(thirdPartyVerifier, {
      fields: [systemAuditTrail.verifierId],
      references: [thirdPartyVerifier.id],
    }),
  })
);

export const ktpBlockchainTables = {
  admin,
  thirdPartyVerifier,
  verificationRequest,
  dataAccessRequest,
  accessLog,
  qrSession,
  systemAuditTrail,
};

export const allTables = {
  ...authTables,
  ...ktpBlockchainTables,
};

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Session = typeof session.$inferSelect;
export type Admin = typeof admin.$inferSelect;
export type ThirdPartyVerifier = typeof thirdPartyVerifier.$inferSelect;
