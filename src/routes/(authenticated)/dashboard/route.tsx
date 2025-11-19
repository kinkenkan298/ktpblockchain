import { createFileRoute, Outlet } from "@tanstack/react-router";
import { HeaderUser } from "@/features/dashboard/user/components/header-user";
import { SidebarUser } from "@/features/dashboard/user/components/sidebar-user";
import { ktpQueries } from "@/services/queries";

export const Route = createFileRoute("/(authenticated)/dashboard")({
  component: DashboardLayout,
  beforeLoad: async ({ context }) => {
    context.queryClient.ensureQueryData(
      ktpQueries.getDataKtp(context.user?.user?.id ?? "")
    );
  },
});

function DashboardLayout() {
  return (
    <div className=" bg-gray-50">
      <SidebarUser>
        <HeaderUser />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </SidebarUser>
    </div>
  );
}
