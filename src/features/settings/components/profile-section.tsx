import { useState } from "react";
import { Loader2, User } from "lucide-react";
import { SettingsCard } from "@/components/settings-card";
import { authClient } from "@/lib/auth/client";

export function ProfileSection() {
  const { data: session } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      await authClient.updateUser({ name });
      alert("Profile updated!"); // Ganti dengan Toast di production
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SettingsCard
      title="General Information"
      description="Update your profile information and email address."
      footer={
        <button
          onClick={handleUpdateProfile}
          disabled={isLoading}
          className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          Save Changes
        </button>
      }
    >
      {/* Avatar & Email Row */}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            disabled
            value={session?.user?.email || ""}
            className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed sm:text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
        </div>
      </div>

      {/* Name Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Display Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none sm:text-sm transition-all"
        />
      </div>
    </SettingsCard>
  );
}
