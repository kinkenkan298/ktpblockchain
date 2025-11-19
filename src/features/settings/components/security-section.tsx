import { useState } from "react";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth/client";
import { SettingsCard } from "@/components/settings-card";
import { toast } from "sonner";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SecuritySection() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChangePassword = async () => {
    if (passwords.new !== passwords.confirm)
      return toast.error("Password tidak cocok");

    setIsLoading(true);
    try {
      await authClient.changePassword({
        currentPassword: passwords.current,
        newPassword: passwords.new,
        revokeOtherSessions: true,
      });
      toast.success("Password berhasil diubah");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error) {
      toast.error("Gagal mengubah password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SettingsCard
      title="Keamanan"
      description="Kelola kata sandi dan preferensi keamanan Anda."
      footer={
        <Button
          onClick={handleChangePassword}
          disabled={isLoading}
          className="text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Ubah Password
        </Button>
      }
    >
      <div className="space-y-4 max-w-md">
        <FieldSet>
          <Field>
            <FieldLabel>Password Sekarang</FieldLabel>
            <Input
              type="password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
              className="border border-gray-300 rounded-md"
            />
          </Field>
        </FieldSet>

        <div className="grid grid-cols-2 gap-4">
          <FieldSet>
            <Field>
              <FieldLabel>New Password</FieldLabel>
              <Input
                type="password"
                value={passwords.new}
                onChange={(e) =>
                  setPasswords({ ...passwords, new: e.target.value })
                }
                className="border border-gray-300 rounded-md"
              />
            </Field>
          </FieldSet>
          <FieldSet>
            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <Input
                type="password"
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirm: e.target.value })
                }
                className="border border-gray-300 rounded-md"
              />
            </Field>
          </FieldSet>
        </div>
      </div>
    </SettingsCard>
  );
}
