import { authQueryOptions } from "@/lib/auth/queries";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/lib/auth/utils";

export const Route = createFileRoute("/(authenticated)")({
  beforeLoad: async ({ context }) => {
    // Fetch user session dengan error handling
    let user;
    try {
      user = await context.queryClient.ensureQueryData(authQueryOptions.user());
    } catch {
      // Jika fetch gagal, redirect ke login
      throw redirect({ to: "/login" });
    }

    // Check apakah user sudah authenticated
    if (!isAuthenticated(user)) {
      throw redirect({ to: "/login" });
    }

    return { user };
  },
  component: Outlet,
});
