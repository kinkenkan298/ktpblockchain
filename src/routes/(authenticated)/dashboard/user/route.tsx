import { HeaderUser } from "@/features/dashboard/user/components/header-user";
import { SidebarUser } from "@/features/dashboard/user/components/sidebar-user";
import { Outlet } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(authenticated)/dashboard/user")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarUser activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="ml-64 flex flex-col min-h-screen">
        <HeaderUser />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
