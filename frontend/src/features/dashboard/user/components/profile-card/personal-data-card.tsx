import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { PersonalInfoSchema } from "@/features/auth/types/register-schema";

interface PersonalDataCardProps {
  profile: PersonalInfoSchema;
}

export function PersonalDataCard({ profile }: PersonalDataCardProps) {
  const [showNIK, setShowNIK] = useState(false);

  const maskNIK = (nik: string) => {
    if (showNIK) return nik;
    return `${nik.slice(0, 4)}${"*".repeat(8)}${nik.slice(-4)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Data (Protected)
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            NIK
          </label>
          <div className="flex items-center space-x-2">
            <p className="text-base text-gray-900 font-mono">
              {maskNIK(profile.nik)}
            </p>
            <button
              onClick={() => setShowNIK(!showNIK)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              {showNIK ? (
                <EyeOff className="w-4 h-4 text-gray-500" />
              ) : (
                <Eye className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Full Name
          </label>
          <p className="text-base text-gray-900">{profile.nama_lengkap}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Place of Birth
          </label>
          <p className="text-base text-gray-900">{profile.tempat_lahir}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Date of Birth
          </label>
          <p className="text-base text-gray-900">
            {formatDate(profile.tanggal_lahir)}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Gender
          </label>
          <p className="text-base text-gray-900">{profile.jenis_kelamin}</p>
        </div>
      </div>
    </div>
  );
}
