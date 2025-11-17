import { authQueryOptions } from "@/lib/auth/queries";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/lib/auth/utils";

export const Route = createFileRoute("/(authenticated)")({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData({
      ...authQueryOptions.user(),
      revalidateIfStale: true,
    });

    if (!isAuthenticated(user)) {
      throw redirect({ to: "/login" });
    }

    return { user };
  },
  component: Outlet,
});
