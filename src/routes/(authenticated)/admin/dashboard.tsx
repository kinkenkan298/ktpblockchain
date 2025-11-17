import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/admin/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(authenticated)/dashboard/admin/"!</div>;
}
