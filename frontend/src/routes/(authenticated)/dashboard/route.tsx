import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { HeaderUser } from "@/features/dashboard/user/components/header-user";
import { SidebarUser } from "@/features/dashboard/user/components/sidebar-user";
import { authQueryOptions, ktpQueries } from "@/services/queries";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/(authenticated)/dashboard")({
  component: DashboardLayout,
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData({
      ...authQueryOptions.user(),
      revalidateIfStale: true,
    });
    if (user?.user?.role === "admin") {
      throw redirect({ to: "/admin/dashboard" });
    }
    context.queryClient.ensureQueryData({
      ...ktpQueries.getDataKtp(user?.user?.id ?? ""),
      revalidateIfStale: true,
    });
  },
  pendingComponent: () => (
    <div className="bg-gray-50">
      <SidebarUser>
        <HeaderUser />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </main>
      </SidebarUser>
    </div>
  ),
  pendingMs: 0,
});

function DashboardLayout() {
  return (
    <div className="bg-gray-50">
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
