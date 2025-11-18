import { authQueryOptions } from "@/services/queries";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const REDIRECT_URL = "/dashboard";
    const user = await context.queryClient.ensureQueryData({
      ...authQueryOptions.user(),
      revalidateIfStale: true,
    });
    if (user)
      throw redirect({
        to: REDIRECT_URL,
      });
    return {
      redirectUrl: REDIRECT_URL,
    };
  },
});

function RouteComponent() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}
