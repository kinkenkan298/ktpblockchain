import {
  Home,
  User,
  Shield,
  History,
  Settings,
  FileText,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { authClient } from "@/lib/auth/client";
import { authQueryOptions } from "@/lib/auth/queries";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "profile", label: "Profil Saya", icon: User },
  { id: "consent", label: "Persetujuan", icon: Shield },
  { id: "history", label: "Riwayat Akses", icon: History },
  { id: "documents", label: "Dokumen", icon: FileText },
  { id: "settings", label: "Pengaturan", icon: Settings },
];

export function SidebarUser({ activeTab, onTabChange }: SidebarProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">ID Digital</h1>
            <p className="text-xs text-gray-500">Sistem Identitas</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                activeTab === item.id
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onResponse: async () => {
                  queryClient.setQueryData(
                    authQueryOptions.user().queryKey,
                    null
                  );
                  await router.invalidate();
                },
              },
            });
          }}
        >
          <LogOut className="w-5 h-5" />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );
}
