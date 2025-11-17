import { UserMenu } from "@/components/user-menu";
import { Bell } from "lucide-react";

export function HeaderUser({ name }: { name: string | undefined }) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard User</h2>
          <p className="text-sm text-gray-500">
            Selamat datang kembali {name ?? "User"}!
          </p>
        </div>

        <div className="flex items-center space-x-6">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
