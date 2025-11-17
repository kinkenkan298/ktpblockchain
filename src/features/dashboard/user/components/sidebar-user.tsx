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
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
          <div className="shrink-0 w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-slate-900 truncate">
              ID Digital
            </h1>
            <p className="text-xs text-slate-500 truncate">Sistem Identitas</p>
          </div>
        </div>
      </div>

      <Separator className="mb-2" />

      <ScrollArea className="flex-1 overflow-y-auto p-4 space-y-1">
        <nav className="space-y-1 pr-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "w-full justify-start space-x-3 text-sm",
                  isActive
                    ? "bg-primary font-semibold"
                    : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <Icon className="shrink-0 w-5 h-5" />
                <span className="truncate">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator className="mt-2" />

      <div className="shrink-0 p-4">
        <Button
          onClick={() => {}}
          variant="ghost"
          size="sm"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="shrink-0 w-5 h-5" />
          <span className="truncate">Keluar</span>
        </Button>
      </div>
    </aside>
  );
}
