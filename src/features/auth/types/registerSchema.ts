import * as z from "zod"

z.config(z.locales.id())

export const FileSchema = z.instanceof(File)
  .refine(file => file.size <= 2 * 1024 * 1024, 'File maksimal 2MB')
  .refine(file =>
    ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
    'Hanya format JPEG, JPG, atau PNG yang diperbolehkan'
  );

export const AccountInfoSchema = z.object({
  email: z.string().trim().min(1),
  password: z.string().trim().min(8),
  confirm_password: z.string(),
  phone: z.string().min(10, 'Nomor telepon terlalu pendek').max(15, 'Nomor telepon terlalu panjang').regex(/^\+?[\d\s-]+$/, 'Format nomor telepon tidak valid').transform(val => {
    const cleaned = val.replace(/[\s-]/g, '');
    return cleaned.startsWith('0') ? '+62' + cleaned.slice(1) :
      cleaned.startsWith('62') ? '+' + cleaned :
        cleaned.startsWith('+') ? cleaned : '+62' + cleaned;
  })
}).refine(data => data.password === data.confirm_password, {
  path: ['confirm_password']
})

export type AccountInfoData = z.infer<typeof AccountInfoSchema>;

export const PersonalInfoSchema = z.object({
  nik: z.string().length(16).regex(/^\d+$/),
  nama_lengkap: z.string().min(1).max(255).regex(/^[a-zA-Z\s.'-]+$/),
  tempat_lahir: z.string().min(2).max(200),
  tanggal_lahir: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal: YYYY-MM-DD').refine(date => {
    const birthDate = new Date(date);
    const today = new Date();
    const minDate = new Date('1900-01-01');
    return birthDate <= today && birthDate >= minDate;
  }, 'Tanggal lahir tidak valid'),
  jenis_kelamin: z.enum(['male', 'female']),
  alamat: z.string().min(10).max(10),
  rt_rw: z.string().regex(/^\d{3}\/\d{3}$/),
  kelurahan: z.string().min(2, 'Kelurahan terlalu pendek').max(100, 'Kelurahan terlalu panjang'),
  kecamatan: z.string().min(2, 'Kecamatan terlalu pendek').max(100, 'Kecamatan terlalu panjang'),
  kota: z.string().min(2, 'Kota terlalu pendek').max(100, 'Kota terlalu panjang'),
  provinsi: z.string().min(2, 'Provinsi terlalu pendek').max(100, 'Provinsi terlalu panjang'),
  kode_post: z.string().length(5, 'Kode pos harus 5 digit').regex(/^\d+$/, 'Kode pos harus angka')
})

export type PersonalInfoData = z.infer<typeof PersonalInfoSchema>

export const DocumentUploadSchema = z.object({
  ktp_front: FileSchema
    .refine(file => file.name.toLowerCase().includes('ktp') ||
      file.name.toLowerCase().includes('front'), {
      message: 'Upload foto KTP depan'
    }),

  ktp_back: FileSchema.optional()
    .refine(file => !file || file.name.toLowerCase().includes('ktp') ||
      file.name.toLowerCase().includes('back'), {
      message: 'Upload foto KTP belakang'
    }),

  selfie_with_ktp: FileSchema
    .refine(file => file.name.toLowerCase().includes('selfie') ||
      file.name.toLowerCase().includes('foto'), {
      message: 'Upload selfie dengan KTP'
    })
})
  .refine(data => {
    if (data.ktp_front && data.selfie_with_ktp) {
    return data.ktp_front.name !== data.selfie_with_ktp.name;
    }
    return true;
  }, {
    message: 'Selfie dan KTP harus file yang berbeda',
    path: ['selfie_with_ktp']
  });

export type DocumentUploadData = z.infer<typeof DocumentUploadSchema>;
