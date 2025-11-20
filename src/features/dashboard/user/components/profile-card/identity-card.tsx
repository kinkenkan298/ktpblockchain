import { Check } from "lucide-react";
import { DataKtp } from "../../types/user-types";
import { User } from "better-auth";
import { Image } from "@unpic/react";

interface IdentityCardProps {
  profile: DataKtp;
  user?: User;
}

export function IdentityCard({ profile, user }: IdentityCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
        <h2 className="text-lg font-semibold text-gray-900">
          Personal Information
        </h2>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-500 to-blue-600">
                <span className="text-4xl font-bold text-white">
                  {user?.image ? (
                    <Image
                      src={user?.image}
                      alt={user?.name || "User Avatar"}
                      className="w-full h-full object-cover"
                      width={128}
                      height={128}
                    />
                  ) : (
                    profile.fullName.charAt(0).toLocaleUpperCase()
                  )}
                </span>
              </div>
            </div>
            {profile.isVerified && (
              <div className="absolute bottom-0 right-0 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white">
                <Check className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {profile.fullName}
            </h3>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-gray-600">
                  Verification Status:
                </span>
                <span className="text-xs font-semibold text-blue-600 uppercase">
                  {profile.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
