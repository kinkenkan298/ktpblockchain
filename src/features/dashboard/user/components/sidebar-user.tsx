import { Home, User, Shield, History, Settings, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 flex flex-col z-40">
      <div className="shrink-0 p-5 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-900 truncate">
              ID Digital
            </h1>
            <p className="text-xs text-gray-500 truncate">Sistem Identitas</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium whitespace-nowrap",
                activeTab === item.id
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <Icon className="shrink-0 w-5 h-5" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
