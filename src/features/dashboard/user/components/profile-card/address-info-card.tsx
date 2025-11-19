import { MapPin } from "lucide-react";
import { PersonalInfoSchema } from "@/features/auth/types/register-schema";

interface AddressCardProps {
  address: PersonalInfoSchema;
}

export function AddressCard({ address }: AddressCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
        <h2 className="text-lg font-semibold text-gray-900">
          Address Information
        </h2>
      </div>

      <div className="flex space-x-6">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Full Address
            </label>
            <p className="text-base text-gray-900">{address.alamat}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                RT/RW
              </label>
              <p className="text-base text-gray-900">{address.rt_rw}</p>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Kelurahan
              </label>
              <p className="text-base text-gray-900">{address.kelurahan}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Kecamatan
              </label>
              <p className="text-base text-gray-900">{address.kecamatan}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                City
              </label>
              <p className="text-base text-gray-900">{address.kota}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Province
              </label>
              <p className="text-base text-gray-900">{address.provinsi}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Postal Code
              </label>
              <p className="text-base text-gray-900">{address.kode_pos}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 italic">
              Data yang digunakan untuk korespondensi resmi.
            </p>
          </div>
        </div>

        <div className="w-48 h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 flex-shrink-0">
          <div className="w-full h-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg ring-4 ring-red-200 animate-pulse"></div>
            </div>
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <path
                  d="M 20 50 Q 40 20, 60 50 T 100 50"
                  stroke="#94a3b8"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M 10 70 Q 30 60, 50 70 T 90 70"
                  stroke="#94a3b8"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M 30 30 L 70 30 L 70 70 L 30 70 Z"
                  stroke="#94a3b8"
                  strokeWidth="0.5"
                  fill="none"
                />
              </svg>
            </div>
            <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded shadow-sm">
              <MapPin className="w-3 h-3 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
