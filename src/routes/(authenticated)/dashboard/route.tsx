import { createFileRoute, Outlet } from "@tanstack/react-router";
import { HeaderUser } from "@/features/dashboard/user/components/header-user";
import { useState } from "react";
import { SidebarUser } from "@/features/dashboard/user/components/sidebar-user";

export const Route = createFileRoute("/(authenticated)/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const { user } = Route.useRouteContext();
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  return (
    <div className=" bg-gray-50">
      <SidebarUser>
        <HeaderUser name={user?.user?.name} />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </SidebarUser>
    </div>
  );
}
