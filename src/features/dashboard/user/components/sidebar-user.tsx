import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/animate-ui/components/radix/sidebar";
import { FileText, History, Home, Settings, Shield, User } from "lucide-react";
import { ToOptions } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import React from "react";
import { UserMenu } from "@/components/user-menu";

interface MenuItemsProps extends ToOptions {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
const menuItems: MenuItemsProps[] = [
  { id: "dashboard", label: "Dashboard", icon: Home, to: "/dashboard" },
  { id: "profile", label: "Profil Saya", icon: User, to: "/dashboard/profile" },
  { id: "consent", label: "Persetujuan", icon: Shield },
  {
    id: "history",
    label: "Riwayat Akses",
    icon: History,
    to: "/dashboard/access-history",
  },
  { id: "documents", label: "Dokumen", icon: FileText },
  {
    id: "settings",
    label: "Pengaturan",
    icon: Settings,
    to: "/dashboard/settings",
  },
];

export function SidebarUser({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="bg-white border-b border-slate-200"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center space-x-3">
              <div className="shrink-0 w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-slate-900 truncate">
                  ID Digital
                </h1>
                <p className="text-xs text-slate-500 truncate">
                  Sistem Identitas
                </p>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu Item</SidebarGroupLabel>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <Link to={item.to}>
                      <item.icon />
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <UserMenu />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
