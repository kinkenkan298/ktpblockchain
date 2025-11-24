import { SidebarAdmin } from "@/features/dashboard/admin/components/sidebar-admin";

import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/admin/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      <SidebarAdmin>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Dashboard Verifikasi
            </h1>
            <p className="text-muted-foreground">
              Portal Admin Dukcapil - Validasi Identitas On-Chain
            </p>
          </div>
        </div>
        <Outlet />
      </SidebarAdmin>
    </div>
  );
}
