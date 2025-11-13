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
  // const [profile, setProfile] = useState();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarUser activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex-col flex">
        <HeaderUser />
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
