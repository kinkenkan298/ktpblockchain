import { useState } from "react";
import { withForm } from "@/hooks/form";
import { DocumentUploadSchema, AllFormSchema } from "../../types/auth-schema";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { UploadState } from "@/components/form/file-field";
import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import { toast } from "sonner";

export const DocumentInfoFields = withForm({
  defaultValues: {} as Partial<AllFormSchema>,
  render: ({ form }) => {
    const [uploadProgress, setUploadProgress] = useState<{
      ktp_front: number;
      ktp_back: number;
      selfie_with_ktp: number;
    }>({
      ktp_front: 0,
      ktp_back: 0,
      selfie_with_ktp: 0,
    });

    const [uploadStatus, setUploadStatus] = useState<{
      ktp_front: UploadState;
      ktp_back: UploadState;
      selfie_with_ktp: UploadState;
    }>({
      ktp_front: {
        file: null,
        status: "empty",
        previewUrl: null,
      },
      ktp_back: {
        file: null,
        status: "empty",
        previewUrl: null,
      },
      selfie_with_ktp: {
        file: null,
        status: "empty",
        previewUrl: null,
      },
    });
    const isStepComplete =
      uploadStatus.ktp_front.status === "uploaded" &&
      uploadStatus.selfie_with_ktp.status === "uploaded";

    const uploadedCount = [
      uploadStatus.ktp_front,
      uploadStatus.selfie_with_ktp,
    ].filter((file) => file.status === "uploaded").length;

    const totalRequired = 2;

    const getFieldDisplayName = (field: string): string => {
      const names: { [key: string]: string } = {
        ktp_front: "KTP Depan",
        ktp_back: "KTP Belakang",
        selfie_with_ktp: "Selfie dengan KTP",
      };
      return names[field] || field;
    };

    const handleFileChange = async (
      field: keyof DocumentUploadSchema,
      file: File
    ) => {
      if (!file.type.startsWith("image/")) {
        setUploadStatus((prev) => ({
          ...prev,
          [field]: {
            file: null,
            status: "error",
            previewUrl: null,
            error: "File harus berupa gambar",
          },
        }));
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setUploadStatus((prev) => ({
          ...prev,
          [field]: {
            file: null,
            status: "error",
            previewUrl: null,
            error: "File terlalu besar (maks 2MB)",
          },
        }));
        return;
      }

      setUploadStatus((prev) => ({
        ...prev,
        [field]: {
          file,
          status: "uploading",
          previewUrl: null,
          error: undefined,
        },
      }));

      await simulateUploadProcess(field, file);
    };

    const handleRemoveFile = (field: keyof DocumentUploadSchema) => {
      if (uploadStatus[field].previewUrl) {
        URL.revokeObjectURL(uploadStatus[field].previewUrl!);
      }

      setUploadStatus((prev) => ({
        ...prev,
        [field]: {
          file: null,
          status: "empty",
          previewUrl: null,
          error: undefined,
        },
      }));

      setUploadProgress((prev) => ({ ...prev, [field]: 0 }));

      toast.info(`File ${getFieldDisplayName(field)} telah dihapus`);
    };
    const simulateUploadProcess = async (
      field: keyof DocumentUploadSchema,
      file: File
    ) => {
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress((prev) => ({ ...prev, [field]: progress }));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const previewUrl = URL.createObjectURL(file);

      setUploadStatus((prev) => ({
        ...prev,
        [field]: {
          file,
          status: "uploaded",
          previewUrl,
          error: undefined,
        },
      }));

      toast.success(`File ${getFieldDisplayName(field)} berhasil diupload`);
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Dokumen
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Upload foto KTP dan selfie untuk proses verifikasi. Pastikan foto
              jelas dan terbaca.
            </p>
          </div>
          <Badge
            variant={isStepComplete ? "default" : "secondary"}
            className="text-sm"
          >
            {uploadedCount}/{totalRequired} Dokumen Terupload
          </Badge>
        </div>

        {!isStepComplete && (
          <Alert className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              Lengkapi {totalRequired - uploadedCount} dokumen wajib untuk
              melanjutkan
            </AlertDescription>
          </Alert>
        )}
        <FieldGroup>
          <form.AppField
            name="ktp_front"
            children={(field) => (
              <field.FileField
                id="ktp_front"
                label="Foto KTP (Depan)"
                description="Format: JPG, PNG (Maks. 2MB). Pastikan foto jelas dan semua informasi terbaca."
                uploadStatus={uploadStatus.ktp_front}
                uploadProgress={uploadProgress.ktp_front}
                onRemove={() => handleRemoveFile("ktp_front")}
                onFileChange={(file) => handleFileChange("ktp_front", file)}
              />
            )}
          />

          <form.AppField
            name="ktp_back"
            children={(field) => (
              <field.FileField
                id="ktp_back"
                label="Foto KTP (Belakang)"
                description="Upload foto bagian belakang KTP untuk verifikasi tambahan."
                uploadStatus={uploadStatus.ktp_back}
                uploadProgress={uploadProgress.ktp_back}
                onRemove={() => handleRemoveFile("ktp_back")}
                onFileChange={(file) => handleFileChange("ktp_back", file)}
              />
            )}
          />

          <form.AppField
            name="selfie_with_ktp"
            children={(field) => (
              <field.FileField
                id="selfie_with_ktp"
                label="Selfie dengan KTP"
                description="Foto selfie Anda memegang KTP. Pastikan wajah dan KTP terlihat jelas."
                uploadStatus={uploadStatus.selfie_with_ktp}
                uploadProgress={uploadProgress.selfie_with_ktp}
                onRemove={() => handleRemoveFile("selfie_with_ktp")}
                onFileChange={(file) =>
                  handleFileChange("selfie_with_ktp", file)
                }
              />
            )}
          />

          <FieldSeparator />
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <div className="space-y-1">
                <h4 className="font-medium">Persyaratan Upload:</h4>
                <ul className="text-xs space-y-0.5">
                  <li>• Format file: JPG, JPEG, atau PNG</li>
                  <li>• Ukuran maksimal: 2MB per file</li>
                  <li>• Foto harus jelas dan tidak blur</li>
                  <li>• Semua teks pada KTP harus terbaca</li>
                  <li>• Selfie harus menunjukkan wajah dan KTP dengan jelas</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        </FieldGroup>
      </div>
    );
  },
});
