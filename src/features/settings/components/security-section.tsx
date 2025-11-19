import { useState } from "react";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth/client";
import { SettingsCard } from "@/components/settings-card";

export function SecuritySection() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChangePassword = async () => {
    if (passwords.new !== passwords.confirm)
      return alert("Passwords do not match");

    setIsLoading(true);
    try {
      await authClient.changePassword({
        currentPassword: passwords.current,
        newPassword: passwords.new,
        revokeOtherSessions: true,
      });
      alert("Password changed successfully");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error) {
      alert("Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SettingsCard
      title="Security"
      description="Manage your password and security preferences."
      footer={
        <button
          onClick={handleChangePassword}
          disabled={isLoading}
          className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Update Password
        </button>
      }
    >
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none sm:text-sm"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none sm:text-sm"
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none sm:text-sm"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}
