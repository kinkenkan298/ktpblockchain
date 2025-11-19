import { useState } from "react";
import { Loader2, User } from "lucide-react";
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

export function ProfileSection() {
  const { data: session } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      await authClient.updateUser({ name });
      toast.success("Profile updated!");
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
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-8 h-8 text-gray-400" />
          )}
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
