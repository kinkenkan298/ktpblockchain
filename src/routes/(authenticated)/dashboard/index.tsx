import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/dashboard/")({
  beforeLoad: ({ context }) => {
    const session = context.user;
    if (session.user.role === "admin")
      throw redirect({ to: "/dashboard/admin" });
    else throw redirect({ to: "/dashboard/user" });
  },
});
