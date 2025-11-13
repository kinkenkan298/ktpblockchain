import { useAuthenticatedUser } from "@/lib/auth/client";
import { Bell, ChevronDown } from "lucide-react";

export function HeaderUser() {
  const userSession = useAuthenticatedUser();

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard User</h2>
          <p className="text-sm text-gray-500">
            Selamat datang kembali {userSession.user.name}!
          </p>
        </div>

        <div className="flex items-center space-x-6">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden">
              {userSession.user?.image ? (
                <img
                  src={userSession.user?.image}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-medium text-sm">
                  {userSession.user.name.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">
                {userSession.user.name}
              </p>
              <p className="text-xs text-gray-500">Pengguna Terverifikasi</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
}
