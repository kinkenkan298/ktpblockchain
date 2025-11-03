import React from "react";
import * as z from "zod";

z.config(z.locales.id());

export const FileSchema = z
	.instanceof(File)
	.refine((file) => file.size <= 2 * 1024 * 1024, "File maksimal 2MB")
	.refine(
		(file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
		"Hanya format JPEG, JPG, atau PNG yang diperbolehkan"
	);

export const AccountInfoSchema = z
	.object({
		email: z
			.email({ pattern: z.regexes.email, message: "Email tidak valid" })
			.trim()
			.min(5, "Email terlalu pendek")
			.max(255, "Email terlalu panjang"),
		password: z
			.string("Password wajib di isi")
			.trim()
			.min(8, "Password terlalu pendek"),
		confirm_password: z.string("Confirm password tidak boleh kosong"),
		phone: z
			.string("Nomor telepon wajib di isi")
			.min(10, "Nomor telepon terlalu pendek")
			.max(15, "Nomor telepon terlalu panjang")
			.regex(/^\+?[\d\s-]+$/, "Format nomor telepon tidak valid")
			.transform((val) => {
				const cleaned = val.replace(/[\s-]/g, "");
				return cleaned.startsWith("0")
					? "+62" + cleaned.slice(1)
					: cleaned.startsWith("62")
						? "+" + cleaned
						: cleaned.startsWith("+")
							? cleaned
							: "+62" + cleaned;
			}),
	})
	.refine((data) => data.password === data.confirm_password, {
		path: ["confirm_password"],
		message: "Password tidak sama",
	});

export const PersonalInfoSchema = z.object({
	nik: z
		.string("NIK tidak valid")
		.length(16, "Panjang NIK harus 16")
		.regex(/^\d+$/, "Format NIK tidak sesuai"),
	nama_lengkap: z
		.string("Nama lengkap wajib di isi")
		.min(5, "Nama lengkap terlalu pendek")
		.max(255, "Nama lengkap terlalu panjang")
		.regex(/^[a-zA-Z\s.'-]+$/),
	tempat_lahir: z
		.string("Tempat lahir wajib di isi")
		.min(4, "Tempat lahir terlalu pendek")
		.max(200, "Tempat lahir terlalu panjang"),
	tanggal_lahir: z
		.string()
		.date()
		.refine((date) => {
			const birthDate = new Date(date);
			const today = new Date();
			const minDate = new Date("1900-01-01");
			return birthDate <= today && birthDate >= minDate;
		}, "Tanggal lahir tidak valid"),
	jenis_kelamin: z.enum(["male", "female"], "Jenis kelamin tidak sesuai!"),
	alamat: z
		.string("Alamat wajib di isi!")
		.min(10, "Alamat terlalu pendek")
		.max(500, "Alamat terlalu panjang"),
	rt_rw: z
		.string("RT/RW wajib di isi")
		.regex(/^\d{3}\/\d{3}$/, "Format RT/RW: 001/002"),
	kelurahan: z
		.string("Kelurahan wajib di isi")
		.min(2, "Kelurahan terlalu pendek")
		.max(100, "Kelurahan terlalu panjang"),
	kecamatan: z
		.string("Kecamatan wajib di isi")
		.min(2, "Kecamatan terlalu pendek")
		.max(100, "Kecamatan terlalu panjang"),
	kota: z
		.string("Kota wajib di isi")
		.min(2, "Kota terlalu pendek")
		.max(100, "Kota terlalu panjang"),
	provinsi: z
		.string("Provinsi wajib di isi")
		.min(2, "Provinsi terlalu pendek")
		.max(100, "Provinsi terlalu panjang"),
	kode_pos: z
		.string("Kode pos wajib di isi")
		.length(5, "Kode pos harus 5 digit")
		.regex(/^\d+$/, "Format kode pos tidak sesuai"),
});

export const DocumentUploadSchema = z
	.object({
		ktp_front: FileSchema.refine(
			(file) =>
				file.name.toLowerCase().includes("ktp") ||
				file.name.toLowerCase().includes("front"),
			{
				error: "Upload foto KTP depan",
			}
		),

		ktp_back: FileSchema.optional().refine(
			(file) =>
				!file ||
				file.name.toLowerCase().includes("ktp") ||
				file.name.toLowerCase().includes("back"),
			{
				error: "Upload foto KTP belakang",
			}
		),

		selfie_with_ktp: FileSchema.refine(
			(file) =>
				file.name.toLowerCase().includes("selfie") ||
				file.name.toLowerCase().includes("foto"),
			{
				error: "Upload selfie dengan KTP",
			}
		),
	})
	.refine(
		(data) => {
			if (data.ktp_front && data.selfie_with_ktp) {
				return data.ktp_front.name !== data.selfie_with_ktp.name;
			}
			return true;
		},
		{
			message: "Selfie dan KTP harus file yang berbeda",
			path: ["selfie_with_ktp"],
		}
	);

export const AgreementSchema = z.object({
	terms_agreement: z.boolean().refine((val) => val === true, {
		message: "Anda harus menyetujui syarat dan ketentuan",
	}),

	data_consent: z.boolean().refine((val) => val === true, {
		message: "Anda harus menyetujui penggunaan data",
	}),
});

// export const CompleteRegistrationSchema = z
// 	.object({
// 		...AccountInfoSchema.shape,
// 		...PersonalInfoSchema.shape,
// 		...DocumentUploadSchema.shape,
// 		...AgreementSchema.shape,
// 	})
// 	.refine((data) => data.password === data.confirm_password, {
// 		message: "Konfirmasi password tidak cocok",
// 		path: ["confirm_password"],
// 	});

export type AccountInfoData = z.infer<typeof AccountInfoSchema>;
export type PersonalInfoData = z.infer<typeof PersonalInfoSchema>;
export type DocumentUploadData = z.infer<typeof DocumentUploadSchema>;
export type AgreementData = z.infer<typeof AgreementSchema>;

export type StepFormData =
	| AccountInfoData
	| PersonalInfoData
	| DocumentUploadData
	| AgreementData;

export type AllFormFields = AccountInfoData &
	PersonalInfoData &
	DocumentUploadData &
	AgreementData;

export interface Steps {
	id: string;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
}

// export type CompleteRegistrationData = z.infer<
// 	typeof CompleteRegistrationSchema
// >;

// export const createStepsValidator = <T extends z.ZodType>(schema: T) => {
// 	return (
// 		data: unknown
// 	): { success: boolean; erros?: Record<string, string> } => {
// 		const result = schema.safeParse(data);

// 		if (!result.success) {
// 			const errors: Record<string, string> = {};
// 			result.error.issues.forEach((issue) => {
// 				const path = issue.path.join(".");
// 				errors[path] = issue.message;
// 				return { success: false, errors };
// 			});
// 		}
// 		return { success: true };
// 	};
// };

// export const validateAccountInfo = createStepsValidator(AccountInfoSchema);
// export const validatePersonalInfo = createStepsValidator(PersonalInfoSchema);
// export const validateDocumentUpload =
// 	createStepsValidator(DocumentUploadSchema);
// export const validateAgreement = createStepsValidator(AgreementSchema);

// export type RegisterFromSteps = {
// 	accountInfo: AccountInfoData;
// 	personalInfo: PersonalInfoData;
// 	documentUpload: DocumentUploadData;
// 	agreementData: AgreementData;
// };

// export const defaultRegistrasionValues: RegisterFromSteps = {
// 	accountInfo: {
// 		email: "",
// 		password: "",
// 		confirm_password: "",
// 		phone: "",
// 	},
// 	personalInfo: {
// 		nik: "",
// 		nama_lengkap: "",
// 		tempat_lahir: "",
// 		tanggal_lahir: "",
// 		jenis_kelamin: "male",
// 		alamat: "",
// 		rt_rw: "",
// 		kelurahan: "",
// 		kecamatan: "",
// 		kota: "",
// 		provinsi: "",
// 		kode_pos: "",
// 	},
// 	documentUpload: {
// 		ktp_front: undefined as any,
// 		ktp_back: undefined as any,
// 		selfie_with_ktp: undefined as any,
// 	},
// 	agreementData: {
// 		terms_agreement: false,
// 		data_consent: false,
// 	},
// };
