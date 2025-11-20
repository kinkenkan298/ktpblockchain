import ActivityFeed from "@/features/dashboard/user/components/access-feed";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated)/dashboard/access-history"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <ActivityFeed />;
}
