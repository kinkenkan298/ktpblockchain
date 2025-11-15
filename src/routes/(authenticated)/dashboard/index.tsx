import { createFileRoute, redirect } from "@tanstack/react-router";
import { getDashboardPathByRole } from "@/lib/auth/utils";

export const Route = createFileRoute("/(authenticated)/dashboard/")({
  beforeLoad: ({ context }) => {
    const user = context.user;

    const dashboardPath = getDashboardPathByRole(user?.user?.role);
    throw redirect({ to: dashboardPath });
  },
});
