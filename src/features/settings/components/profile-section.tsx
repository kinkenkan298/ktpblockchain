import { useRef, useState } from "react";
import { Camera, Loader2, Upload, User } from "lucide-react";
import { SettingsCard } from "@/components/settings-card";
import { authClient } from "@/lib/auth/client";
import { toast } from "sonner";
import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { fileToBase64, resizeAndCropImage } from "@/lib/image-utils";

export function ProfileSection() {
  const { data: session, refetch } = authClient.useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [name, setName] = useState<string>(session?.user?.name || "");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = async (file: File) => {
    if (!session) return;
    setIsLoading(true);

    const resizeFile = await resizeAndCropImage(
      file,
      crypto.randomUUID(),
      128,
      "png"
    );
    let image: string | undefined | null = await fileToBase64(resizeFile);

    if (!image) {
      setIsLoading(false);
      toast.error("Failed to convert image to base64");
      return;
    }

    try {
      await authClient.updateUser({ image });
      toast.success("Profile updated!");
      refetch();
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      await authClient.updateUser({ name });
      toast.success("Profile updated!");
      refetch();
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SettingsCard
      title="Informasi umum akun anda"
      description="Ubah informasi profile anda."
      footer={
        <Button
          onClick={handleUpdateProfile}
          disabled={isLoading}
          className="text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Simpan Perubahan
        </Button>
      }
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative group">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-white border shadow-sm p-1.5 rounded-full hover:bg-gray-50 transition-colors"
          >
            <Camera className="w-3 h-3 text-gray-600" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-medium text-gray-900">Profile Picture</h4>
          <div className="flex gap-3">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2 font-medium"
            >
              <Upload className="w-3 h-3" />
              Change Photo
            </button>
            {session?.user?.image && (
              <button
                type="button"
                disabled={isUploading}
                onClick={async () => {
                  if (confirm("Delete profile photo?")) {
                    await authClient.updateUser({ image: "" });
                    window.location.reload();
                  }
                }}
                className="text-xs text-red-600 hover:text-red-700 px-2 py-1.5 rounded-md transition-colors font-medium"
              >
                Remove
              </button>
            )}
          </div>
          <p className="text-[10px] text-gray-500">
            JPG, GIF or PNG. Max size of 2MB.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                handleImageChange(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
      <div className="flex-1">
        <FieldSet>
          <Field>
            <FieldLabel>Alamat Email</FieldLabel>
            <Input
              type="email"
              disabled
              value={session?.user?.email || ""}
              className="w-full max-w-md px-2 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed sm:text-sm"
            />
            <FieldDescription className="text-xs text-gray-500 mt-1">
              Email tidak dapat diubah.
            </FieldDescription>
          </Field>
        </FieldSet>
      </div>
      <FieldSet>
        <Field>
          <FieldLabel>Nama Lengkap</FieldLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full max-w-md px-2 py-2 border border-gray-300"
          />
        </Field>
      </FieldSet>
    </SettingsCard>
  );
}
