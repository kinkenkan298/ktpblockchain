CREATE TABLE `account` (
	`id` varchar(36) NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp(3),
	`refresh_token_expires_at` timestamp(3),
	`scope` text,
	`password` text,
	`created_at` timestamp(3) NOT NULL,
	`updated_at` timestamp(3) NOT NULL,
	CONSTRAINT `account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(36) NOT NULL,
	`expires_at` timestamp(3) NOT NULL,
	`token` varchar(255) NOT NULL,
	`created_at` timestamp(3) NOT NULL,
	`updated_at` timestamp(3) NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` varchar(36) NOT NULL,
	`impersonated_by` text,
	CONSTRAINT `session_id` PRIMARY KEY(`id`),
	CONSTRAINT `session_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(36) NOT NULL,
	`name` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` boolean NOT NULL DEFAULT false,
	`image` text,
	`created_at` timestamp(3) NOT NULL,
	`updated_at` timestamp(3) NOT NULL,
	`username` varchar(255),
	`display_username` text,
	`role` text,
	`banned` boolean DEFAULT false,
	`ban_reason` text,
	`ban_expires` timestamp(3),
	`wallet_address` varchar(255),
	`nik` varchar(255),
	`phone_number` text,
	`place_of_birth` text,
	`date_of_birth` text,
	`gender` text,
	`address` text,
	`rt_rw` text,
	`kelurahan` text,
	`kecamatan` text,
	`city` text,
	`province` text,
	`postal_code` text,
	`identity_hash` text,
	`ipfs_document_hash` text,
	`status` enum('PENDING','VERIFIED','REJECTED','SUSPENDED') DEFAULT 'PENDING',
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`),
	CONSTRAINT `user_wallet_address_unique` UNIQUE(`wallet_address`),
	CONSTRAINT `user_nik_unique` UNIQUE(`nik`)
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` varchar(36) NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp(3) NOT NULL,
	`created_at` timestamp(3) NOT NULL,
	`updated_at` timestamp(3) NOT NULL,
	CONSTRAINT `verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wallet_address` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`address` text NOT NULL,
	`chain_id` int NOT NULL,
	`is_primary` boolean DEFAULT false,
	`created_at` timestamp(3) NOT NULL,
	CONSTRAINT `wallet_address_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `access_log` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`verifier_id` varchar(255) NOT NULL,
	`access_request_id` varchar(255) NOT NULL,
	`accessed_fields` json NOT NULL,
	`access_timestamp` timestamp DEFAULT (now()),
	`ip_address` varchar(45),
	`user_agent` text,
	`blockchain_tx_hash` varchar(66),
	CONSTRAINT `access_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `admin` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`username` varchar(50) NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`department` varchar(100) NOT NULL,
	`role` enum('SUPER_ADMIN','VERIFICATION_OFFER','AUDITOR'),
	`is_active` boolean DEFAULT true,
	`last_login` timestamp,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `admin_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_username_unique` UNIQUE(`username`),
	CONSTRAINT `admin_user_idx` UNIQUE(`user_id`),
	CONSTRAINT `admin_username_idx` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `data_access_request` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`verifier_id` varchar(255) NOT NULL,
	`requested_fields` json NOT NULL,
	`purpose` text NOT NULL,
	`access_duration` int DEFAULT 24,
	`status` enum('PENDING','APPROVED','REJECTED','EXPIRED') DEFAULT 'PENDING',
	`user_consent_at` timestamp,
	`expires_at` timestamp,
	`transaction_hash` varchar(66),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `data_access_request_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `qr_session` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`qr_token` varchar(128) NOT NULL,
	`verifier_id` varchar(255),
	`requested_fields` json NOT NULL,
	`status` enum('ACTIVE','USED','EXPIRED','CANCELLED') DEFAULT 'ACTIVE',
	`expires_at` timestamp NOT NULL,
	`used_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `qr_session_id` PRIMARY KEY(`id`),
	CONSTRAINT `qr_session_qr_token_unique` UNIQUE(`qr_token`),
	CONSTRAINT `qr_token_idx` UNIQUE(`qr_token`)
);
--> statement-breakpoint
CREATE TABLE `system_audit_trail` (
	`id` varchar(255) NOT NULL,
	`action_type` varchar(100) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`admin_id` varchar(255) NOT NULL,
	`verifier_id` varchar(255),
	`description` text NOT NULL,
	`ip_address` varchar(45),
	`user_agent` text,
	`blockchain_tx_hash` varchar(66),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `system_audit_trail_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `third_party_verifier` (
	`id` varchar(255) NOT NULL,
	`company_name` varchar(255) NOT NULL,
	`company_type` enum('BANK','HOSPITAL','GOVERMENT','OTHER'),
	`wallet_address` varchar(42) NOT NULL,
	`api_key` varchar(64) NOT NULL,
	`contact_email` varchar(255) NOT NULL,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `third_party_verifier_id` PRIMARY KEY(`id`),
	CONSTRAINT `third_party_verifier_wallet_address_unique` UNIQUE(`wallet_address`),
	CONSTRAINT `third_party_verifier_api_key_unique` UNIQUE(`api_key`),
	CONSTRAINT `verifier_wallet_idx` UNIQUE(`wallet_address`),
	CONSTRAINT `verifier_apikey_idx` UNIQUE(`api_key`)
);
--> statement-breakpoint
CREATE TABLE `verification_request` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`admin_id` varchar(255) NOT NULL,
	`document_front_url` varchar(500) NOT NULL,
	`document_back_url` varchar(500),
	`selfie_url` varchar(500) NOT NULL,
	`ocr_data` json,
	`status` enum('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
	`rejection_reason` text,
	`verified_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `verification_request_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wallet_address` ADD CONSTRAINT `wallet_address_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `access_log` ADD CONSTRAINT `access_log_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `access_log` ADD CONSTRAINT `access_log_verifier_id_verification_request_id_fk` FOREIGN KEY (`verifier_id`) REFERENCES `verification_request`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `admin` ADD CONSTRAINT `admin_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `data_access_request` ADD CONSTRAINT `data_access_request_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `data_access_request` ADD CONSTRAINT `data_access_request_verifier_id_verification_request_id_fk` FOREIGN KEY (`verifier_id`) REFERENCES `verification_request`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `qr_session` ADD CONSTRAINT `qr_session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `qr_session` ADD CONSTRAINT `qr_session_verifier_id_verification_request_id_fk` FOREIGN KEY (`verifier_id`) REFERENCES `verification_request`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `system_audit_trail` ADD CONSTRAINT `system_audit_trail_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `system_audit_trail` ADD CONSTRAINT `system_audit_trail_admin_id_admin_id_fk` FOREIGN KEY (`admin_id`) REFERENCES `admin`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `system_audit_trail` ADD CONSTRAINT `system_audit_trail_verifier_id_verification_request_id_fk` FOREIGN KEY (`verifier_id`) REFERENCES `verification_request`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `verification_request` ADD CONSTRAINT `verification_request_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `verification_request` ADD CONSTRAINT `verification_request_admin_id_admin_id_fk` FOREIGN KEY (`admin_id`) REFERENCES `admin`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `al_user_idx` ON `access_log` (`user_id`);--> statement-breakpoint
CREATE INDEX `al_verifier_idx` ON `access_log` (`verifier_id`);--> statement-breakpoint
CREATE INDEX `al_timestamp_idx` ON `access_log` (`access_timestamp`);--> statement-breakpoint
CREATE INDEX `dar_user_idx` ON `data_access_request` (`user_id`);--> statement-breakpoint
CREATE INDEX `dar_verifier_idx` ON `data_access_request` (`verifier_id`);--> statement-breakpoint
CREATE INDEX `dar_status_idx` ON `data_access_request` (`status`);--> statement-breakpoint
CREATE INDEX `qr_user_idx` ON `qr_session` (`user_id`);--> statement-breakpoint
CREATE INDEX `qr_status_idx` ON `qr_session` (`status`);--> statement-breakpoint
CREATE INDEX `audit_action_idx` ON `system_audit_trail` (`action_type`);--> statement-breakpoint
CREATE INDEX `audit_user_idx` ON `system_audit_trail` (`user_id`);--> statement-breakpoint
CREATE INDEX `audit_created_idx` ON `system_audit_trail` (`created_at`);--> statement-breakpoint
CREATE INDEX `verifier_company_idx` ON `third_party_verifier` (`company_name`);--> statement-breakpoint
CREATE INDEX `vr_user_idx` ON `verification_request` (`user_id`);--> statement-breakpoint
CREATE INDEX `vr_admin_idx` ON `verification_request` (`admin_id`);--> statement-breakpoint
CREATE INDEX `vr_status_idx` ON `verification_request` (`status`);