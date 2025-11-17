import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAdmin } from "@/lib/auth/utils";

export const Route = createFileRoute("/(authenticated)/admin")({
  beforeLoad: ({ context }) => {
    const user = context.user;

    if (!isAdmin(user?.user?.role)) {
      throw redirect({ to: "/dashboard" });
    }
  },
});
