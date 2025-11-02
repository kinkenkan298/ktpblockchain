import { useForm } from "@tanstack/react-form";
import { AgreementData, AgreementSchema } from "../../types/registerSchema";
import { useState } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface AgreementInfoProps {
  defaultValues?: AgreementData | null;
  onBack: () => void;
  onSubmit: (data: AgreementData) => void;
}

const defaultData: AgreementData = {
  terms_agreement: false,
  data_consent: false,
};

export function AgreementInfo({
  defaultValues,
  onBack,
  onSubmit,
}: AgreementInfoProps) {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const form = useForm({
    defaultValues: defaultValues || defaultData,
    validators: {
      onSubmit: AgreementSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <FieldContent>
          <FieldLegend>Persetujuan</FieldLegend>
          <FieldDescription>
            Silakan baca dan setujui syarat dan ketentuan berikut untuk
            menyelesaikan pendaftaran.
          </FieldDescription>
        </FieldContent>
        <FieldGroup>
          <FieldSet>
            <Field orientation="horizontal">
              <div className="mt-3 p-4 bg-gray-50 rounded-md max-h-60 overflow-y-auto">
                <TermsAndConditionsContent />
              </div>
            </Field>
            <Field orientation="horizontal">
              <div className="mt-3 p-4 bg-gray-50 rounded-md max-h-60 overflow-y-auto">
                <PrivacyPolicyContent />
              </div>
            </Field>
          </FieldSet>
          <form.Field
            name="terms_agreement"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field orientation="horizontal">
                  <Checkbox id={field.name} />
                  <FieldLabel htmlFor={field.name}>
                    Syarat dan Ketentuan Layanan
                    <span className="text-red-500">*</span>
                  </FieldLabel>
                </Field>
              );
            }}
          />
          <form.Field
            name="data_consent"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field orientation="horizontal">
                  <Checkbox id={field.name} />
                  <FieldLabel htmlFor={field.name}>
                    Persetujuan Penggunaan Data
                    <span className="text-red-500">*</span>
                  </FieldLabel>
                </Field>
              );
            }}
          />
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}
function TermsAndConditionsContent() {
  return (
    <div className="text-xs text-gray-700 space-y-3">
      <h5 className="font-bold">SYARAT DAN KETENTUAN LAYANAN E-KTP DIGITAL</h5>

      <div>
        <h6 className="font-semibold">1. Definisi</h6>
        <p>
          E-KTP Digital adalah layanan identitas digital berbasis blockchain
          yang dikelola oleh Pemerintah.
        </p>
      </div>

      <div>
        <h6 className="font-semibold">2. Hak Pengguna</h6>
        <ul className="list-disc list-inside space-y-1">
          <li>Mengakses layanan E-KTP Digital setelah verifikasi</li>
          <li>Mengontrol akses data pribadi oleh pihak ketiga</li>
          <li>Menerima notifikasi untuk setiap akses data</li>
        </ul>
      </div>

      <div>
        <h6 className="font-semibold">3. Kewajiban Pengguna</h6>
        <ul className="list-disc list-inside space-y-1">
          <li>Menyediakan data yang akurat dan valid</li>
          <li>Menjaga kerahasiaan akun dan credentials</li>
          <li>Melaporkan penyalahgunaan akun segera</li>
        </ul>
      </div>

      <div>
        <h6 className="font-semibold">4. Larangan</h6>
        <p>
          Dilarang keras melakukan pendaftaran dengan data palsu, meminjamkan
          akun, atau menggunakan layanan untuk kegiatan ilegal.
        </p>
      </div>
    </div>
  );
}

function PrivacyPolicyContent() {
  return (
    <div className="text-xs text-gray-700 space-y-3">
      <h5 className="font-bold">KEBIJAKAN PRIVASI DAN PERLINDUNGAN DATA</h5>

      <div>
        <h6 className="font-semibold">1. Pengumpulan Data</h6>
        <p>
          Kami mengumpulkan data pribadi Anda hanya untuk keperluan verifikasi
          identitas dan penyediaan layanan.
        </p>
      </div>

      <div>
        <h6 className="font-semibold">2. Penggunaan Data</h6>
        <ul className="list-disc list-inside space-y-1">
          <li>Verifikasi identitas oleh admin terotorisasi</li>
          <li>Pemberian akses kepada pihak ketiga dengan persetujuan Anda</li>
          <li>Peningkatan kualitas layanan</li>
        </ul>
      </div>

      <div>
        <h6 className="font-semibold">3. Penyimpanan Data</h6>
        <p>
          Data disimpan secara aman dengan enkripsi dan teknologi blockchain.
          Dokumen asli disimpan di IPFS dengan hash di blockchain.
        </p>
      </div>

      <div>
        <h6 className="font-semibold">4. Hak Anda</h6>
        <p>
          Anda berhak mengakses, memperbaiki, dan mencabut persetujuan
          penggunaan data melalui dashboard pribadi.
        </p>
      </div>
    </div>
  );
}
