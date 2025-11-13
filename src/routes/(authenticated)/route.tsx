import { authQueryOptions } from "@/lib/auth/queries";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)")({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(
      authQueryOptions.user()
    );

    if (!user) throw redirect({ to: "/" });
    return { user };
  },
  component: Outlet,
});
