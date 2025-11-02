import { useEffect, useRef, useState } from "react";
import {
  type DocumentUploadData,
  DocumentUploadSchema,
} from "../../types/registerSchema";
import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  FileText,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface DocumentUploadProps {
  defaultValues?: Partial<DocumentUploadData> | null;
  onNext: (data: DocumentUploadData) => void;
  onBack: () => void;
}

interface UploadState {
  file: File | null;
  status: "empty" | "uploading" | "uploaded" | "error";
  previewUrl: string | null;
  error?: string;
}

export function DocumentUploadSteps({
  defaultValues,
  onBack,
  onNext,
}: DocumentUploadProps) {
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

  const form = useForm({
    defaultValues: defaultValues || {
      ktp_front: undefined,
      ktp_back: undefined,
      selfie_with_ktp: undefined,
    },
    validators: {
      onChange: DocumentUploadSchema,
    },
    onSubmit: () => {
      console.log("hai");
      // try {
      //   if (!isStepComplete) {
      //     toast.error("Dokumen belum lengkap! periksa lagi");
      //     return;
      //   }
      //   const documentData: DocumentUploadData = {
      //     ktp_front: uploadStatus.ktp_front.file!,
      //     ktp_back: uploadStatus.ktp_back.file || undefined,
      //     selfie_with_ktp: uploadStatus.selfie_with_ktp.file!,
      //   };

      //   const validationResult = DocumentUploadSchema.safeParse(documentData);

      //   if (!validationResult.success) {
      //     console.error(validationResult.error);
      //     toast.error("Data tidak valid! harap periksa lagi!");
      //     return;
      //   }

      //   console.log(documentData);
      //   // onNext(validationResult.data);
      // } catch (error: any) {
      //   toast.error("Terjadi kesalahan saat memproses dokumen");
      // }
    },
  });
  const handleFileChange = async (
    field: keyof DocumentUploadData,
    file: File,
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

  const handleRemoveFile = (field: keyof DocumentUploadData) => {
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

    form.setFieldValue(field, undefined);

    toast.info(`File ${getFieldDisplayName(field)} telah dihapus`);
  };
  const simulateUploadProcess = async (
    field: keyof DocumentUploadData,
    file: File,
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

    form.setFieldValue(field, file);

    toast.success(`File ${getFieldDisplayName(field)} berhasil diupload`);
  };

  const getStatusColor = (status: UploadState["status"]) => {
    switch (status) {
      case "uploaded":
        return "text-green-600 bg-green-50 border-green-200";
      case "uploading":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "error":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };
  const getFieldDisplayName = (field: string): string => {
    const names: { [key: string]: string } = {
      ktp_front: "KTP Depan",
      ktp_back: "KTP Belakang",
      selfie_with_ktp: "Selfie dengan KTP",
    };
    return names[field] || field;
  };
  const getStatusIcon = (status: UploadState["status"]) => {
    switch (status) {
      case "uploaded":
        return <CheckCircle2 className="h-4 w-4" />;
      case "uploading":
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case "error":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  useEffect(() => {
    return () => {
      Object.values(uploadStatus).forEach((status) => {
        if (status.previewUrl) {
          URL.revokeObjectURL(status.previewUrl);
        }
      });
    };
  }, []);
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        form.handleSubmit();
      }}
    >
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

        <div className="space-y-8">
          <FieldGroup>
            <form.Field
              name="ktp_front.name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <FieldSet>
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>
                        <span>Foto KTP (Depan)</span>
                        <Badge
                          variant="outline"
                          className={getStatusColor(
                            uploadStatus.ktp_front.status,
                          )}
                        >
                          <span className="flex items-center gap-1">
                            {getStatusIcon(uploadStatus.ktp_front.status)}
                            {uploadStatus.ktp_front.status === "uploaded"
                              ? "Terupload"
                              : uploadStatus.ktp_front.status === "uploading"
                                ? "Mengupload"
                                : uploadStatus.ktp_front.status === "error"
                                  ? "Error"
                                  : "Belum diupload"}
                          </span>
                        </Badge>
                      </FieldLabel>

                      <FieldDescription>
                        Format: JPG, PNG (Maks. 2MB). Pastikan foto jelas dan
                        semua informasi terbaca.
                      </FieldDescription>
                      <Field>
                        <FileUploadCard
                          id="ktp_front"
                          name={field.name}
                          uploadStatus={uploadStatus.ktp_front}
                          uploadProgress={uploadProgress.ktp_front}
                          onFileChange={(file) =>
                            handleFileChange("ktp_front", file)
                          }
                          onRemove={() => handleRemoveFile("ktp_front")}
                          accept="image/jpeg,image/jpg,image/png"
                          required={true}
                        />
                      </Field>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                  </FieldSet>
                );
              }}
            />

            <form.Field
              name="ktp_back.name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <FieldSet>
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>
                        <span>Foto KTP (Belakang)</span>
                        <Badge
                          variant="outline"
                          className={getStatusColor(
                            uploadStatus.ktp_back.status,
                          )}
                        >
                          <span className="flex items-center gap-1">
                            {getStatusIcon(uploadStatus.ktp_back.status)}
                            {uploadStatus.ktp_back.status === "uploaded"
                              ? "Terupload"
                              : uploadStatus.ktp_back.status === "uploading"
                                ? "Mengupload"
                                : uploadStatus.ktp_back.status === "error"
                                  ? "Error"
                                  : "Opsional"}
                          </span>
                        </Badge>
                      </FieldLabel>
                      <FieldDescription>
                        Upload foto bagian belakang KTP untuk verifikasi
                        tambahan.
                      </FieldDescription>
                      <Field>
                        <FileUploadCard
                          id="ktp_back"
                          name={field.name}
                          uploadStatus={uploadStatus.ktp_back}
                          uploadProgress={uploadProgress.ktp_back}
                          onFileChange={(file) =>
                            handleFileChange("ktp_back", file)
                          }
                          onRemove={() => handleRemoveFile("ktp_back")}
                          accept="image/jpeg,image/jpg,image/png"
                          required={false}
                        />
                        {form.state.errors && (
                          <FieldError errors={form.state.errors} />
                        )}
                      </Field>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                  </FieldSet>
                );
              }}
            />
            <form.Field
              name="selfie_with_ktp.name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <FieldSet>
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>
                        <span>Selfie dengan KTP</span>
                        <Badge
                          variant="outline"
                          className={getStatusColor(
                            uploadStatus.selfie_with_ktp.status,
                          )}
                        >
                          <span className="flex items-center gap-1">
                            {getStatusIcon(uploadStatus.selfie_with_ktp.status)}
                            {uploadStatus.selfie_with_ktp.status === "uploaded"
                              ? "Terupload"
                              : uploadStatus.selfie_with_ktp.status ===
                                  "uploading"
                                ? "Mengupload"
                                : uploadStatus.selfie_with_ktp.status ===
                                    "error"
                                  ? "Error"
                                  : "Belum diupload"}
                          </span>
                        </Badge>
                      </FieldLabel>
                      <FieldDescription>
                        Foto selfie Anda memegang KTP. Pastikan wajah dan KTP
                        terlihat jelas.
                      </FieldDescription>
                      <Field>
                        <FileUploadCard
                          id="selfie_with_ktp"
                          name={field.name}
                          uploadStatus={uploadStatus.selfie_with_ktp}
                          uploadProgress={uploadProgress.selfie_with_ktp}
                          onFileChange={(file) =>
                            handleFileChange("selfie_with_ktp", file)
                          }
                          onRemove={() => handleRemoveFile("selfie_with_ktp")}
                          accept="image/jpeg,image/jpg,image/png"
                          required
                        />
                      </Field>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                  </FieldSet>
                );
              }}
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
                    <li>
                      • Selfie harus menunjukkan wajah dan KTP dengan jelas
                    </li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          </FieldGroup>
        </div>
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              Object.values(uploadStatus).forEach((status) => {
                if (status.previewUrl) {
                  URL.revokeObjectURL(status.previewUrl);
                }
              });
              onBack();
            }}
          >
            Kembali
          </Button>
          <Button
            type="submit"
            disabled={!isStepComplete}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isStepComplete
              ? "Lanjut ke Persetujuan"
              : `Lengkapi ${totalRequired - uploadedCount} Dokumen Wajib`}
          </Button>
        </div>
      </div>
    </form>
  );
}

interface FileUploadCardProps {
  id: string;
  name: string;
  uploadStatus: UploadState;
  uploadProgress: number;
  onFileChange: (file: File) => void;
  onRemove: () => void;
  accept: string;
  required: boolean;
}

function FileUploadCard({
  id,
  name,
  uploadStatus,
  uploadProgress,
  onFileChange,
  onRemove,
  accept,
  required,
}: FileUploadCardProps) {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onFileChange(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  if (uploadStatus.status === "uploaded" && uploadStatus.previewUrl) {
    return (
      <Card className="border-2 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-muted rounded-md overflow-hidden border">
                <img
                  src={uploadStatus.previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Preview</p>
                <p className="text-xs text-muted-foreground">
                  {uploadStatus.file?.name}
                </p>
                <p className="text-xs text-green-600">
                  ✓ Siap untuk verifikasi
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Lihat
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="max-w-3xl"
                  aria-describedby="Preview Image"
                >
                  <DialogHeader>
                    <DialogTitle>Preview Dokumen</DialogTitle>
                  </DialogHeader>
                  <div className="flex justify-center">
                    <img
                      src={uploadStatus.previewUrl}
                      alt="Document preview"
                      className="max-w-full max-h-[70vh] object-contain rounded-md"
                    />
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onRemove}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  if (uploadStatus.status === "uploading") {
    return (
      <Card className="border-2 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              <div>
                <p className="text-sm font-medium">Mengupload file...</p>
                <p className="text-xs text-muted-foreground">
                  {uploadStatus.file?.name}
                </p>
              </div>
            </div>
            <span className="text-sm font-medium text-blue-600">
              {uploadProgress}%
            </span>
          </div>
          <Progress value={uploadProgress} className="mt-2" />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card
      className={`border-2 border-dashed ${
        isDragOver ? "border-blue-400 bg-blue-50" : "border-muted-foreground/25"
      } transition-colors hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer`}
    >
      <CardContent className="p-6">
        <div
          className="flex flex-col items-center justify-center space-y-3 text-center"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            id={id}
            name={name}
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="hidden"
            required={required}
          />

          <label htmlFor={id} className="cursor-pointer">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-3 bg-muted rounded-full">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">
                  <span className="text-blue-600 hover:text-blue-700">
                    Klik untuk upload atau drag and drop
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {accept.split(",").join(", ")} (Maks. 2MB)
                </p>
                {required && (
                  <p className="text-xs text-red-600 font-medium">
                    * Dokumen wajib
                  </p>
                )}
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Pilih File
              </Button>
            </div>
          </label>
        </div>

        {uploadStatus.status === "error" && uploadStatus.error && (
          <Alert variant="destructive" className="mt-4 py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {uploadStatus.error}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
