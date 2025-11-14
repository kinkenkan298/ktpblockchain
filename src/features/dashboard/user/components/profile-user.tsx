import { User, MapPin, Phone, Mail, CreditCard } from "lucide-react";
import { useAuthenticatedUser } from "@/lib/auth/client";

export function ProfileCardUser() {
  const userSession = useAuthenticatedUser();

  const { user } = userSession;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Profil Pengguna</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Edit Profil
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200">
        <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center overflow-hidden">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-10 h-10 text-white" />
          )}
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-900">{user.name}</h4>
          <p className="text-sm text-gray-500">Status: Belum Terverifikasi</p>
          <div
            className={`mt-1 inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${user.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : user.status === "VERIFIED" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {user.status === "PENDING"
              ? "Pending"
              : user.status === "VERIFIED"
                ? "Verified"
                : "Rejected"}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-1">
              NIK (Nomor Induk Kependudukan)
            </p>
            <p className="text-sm font-medium text-gray-900">{user.nik}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-1">Alamat</p>
            <p className="text-sm font-medium text-gray-900">{user.address}</p>
          </div>
        </div>

        {user.phoneNumber && (
          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Nomor Telepon</p>
              <p className="text-sm font-medium text-gray-900">
                {user.phoneNumber}
              </p>
            </div>
          </div>
        )}

        {user.email && (
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">Email</p>
              <p className="text-sm font-medium text-gray-900">{user.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
