import { CopyButton } from "@/components/animate-ui/components/buttons/copy";
import { PersonalInfoSchema } from "@/features/auth/types/register-schema";
import { User } from "better-auth";
import { Mail, Phone, Wallet, Check } from "lucide-react";

interface ContactInfoCardProps {
  profile: PersonalInfoSchema;
  walletAddress: string;
  UserInfo: {
    email: string;
    emailVerified: boolean;
  };
}

export function ContactInfoCard({
  profile,
  walletAddress,
  UserInfo,
}: ContactInfoCardProps) {
  const maskWallet = (address: string) => {
    return `${address.slice(0, 10)}...${address.slice(-6)}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
        <h2 className="text-lg font-semibold text-gray-900">
          Contact Information
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Email</p>
              <p className="text-sm font-medium text-gray-900">
                {UserInfo.email}
              </p>
            </div>
          </div>
          {UserInfo.emailVerified && (
            <div className="flex items-center space-x-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
              <Check className="w-3 h-3" />
              <span className="text-xs font-medium">Verified</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Phone</p>
              <p className="text-sm font-medium text-gray-900">
                {profile.phone}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
            <Check className="w-3 h-3" />
            <span className="text-xs font-medium">Verified</span>
          </div>
        </div>

        <div className="py-3 px-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Wallet Address</p>
                <p className="text-sm font-mono font-medium text-gray-900">
                  {maskWallet(walletAddress)}
                </p>
              </div>
            </div>
            <CopyButton content={walletAddress} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
