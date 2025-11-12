import { withForm } from "@/hooks/form";
import { StepFormData } from "../../types/auth-schema";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export const AgreementInfoFields = withForm({
  defaultValues: {} as Partial<StepFormData>,
  render: ({ form }) => {
    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    return (
      <div>
        <CardTitle className="text-lg font-medium text-gray-900 mb-2">
          Persetujuan
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 mb-6">
          Silakan baca dan setujui syarat dan ketentuan berikut untuk
          menyelesaikan pendaftaran.
        </CardDescription>

        <div className="space-y-6">
          <Card>
            <CardContent>
              <form.AppField
                name="terms_agreement"
                children={(field) => (
                  <field.CheckboxField label="Syarat dan Ketentuan Layanan" />
                )}
              />
              <CardDescription className="text-sm text-gray-600 mt-1">
                Saya telah membaca dan menyetujui seluruh syarat dan ketentuan
                layanan E-KTP Digital.
              </CardDescription>

              <Button
                onClick={() => setShowTerms(!showTerms)}
                variant={"link"}
                className="mt-2"
                type="button"
              >
                {showTerms ? "Sembunyikan" : "Baca Syarat dan Ketentuan"}
              </Button>

              {showTerms && (
                <div className="mt-3 p-4 bg-gray-50 rounded-md max-h-60 overflow-y-auto">
                  <TermsAndConditionsContent />
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <form.AppField
                name="data_consent"
                children={(field) => (
                  <field.CheckboxField label="Persetujuan Penggunaan Data" />
                )}
              />
              <CardDescription className="text-sm text-gray-600 mt-1">
                Saya menyetujui pengumpulan, penyimpanan, dan penggunaan data
                pribadi saya sesuai dengan kebijakan privasi.
              </CardDescription>
              <Button
                type="button"
                onClick={() => setShowPrivacy(!showPrivacy)}
                className="mt-2"
                variant={"link"}
              >
                {showPrivacy ? "Sembunyikan" : "Baca Kebijakan Privasi"}
              </Button>

              {showPrivacy && (
                <div className="mt-3 p-4 bg-gray-50 rounded-md max-h-60 overflow-y-auto">
                  <PrivacyPolicyContent />
                </div>
              )}
            </CardContent>
          </Card>

          <Alert className="bg-blue-50 border-blue-200 rounded-lg p-4">
            <AlertCircleIcon className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              <div className="space-y-2">
                <AlertTitle>Ringkasan Pendaftaran:</AlertTitle>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>
                    • Data pribadi Anda akan disimpan secara aman di sistem
                  </li>
                  <li>
                    • Dokumen KTP akan digunakan hanya untuk verifikasi
                    identitas
                  </li>
                  <li>
                    • Anda dapat mengontrol akses data melalui dashboard pribadi
                  </li>
                  <li>• Proses verifikasi membutuhkan waktu 1-3 hari kerja</li>
                  <li>• Anda akan mendapatkan notifikasi via email dan SMS</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  },
});

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
