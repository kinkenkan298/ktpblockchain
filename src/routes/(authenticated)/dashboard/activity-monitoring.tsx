import ActivityFeed from "@/features/dashboard/user/components/access-feed";
import { DataAccessActivity } from "@/features/dashboard/user/components/data-access-activity";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(authenticated)/dashboard/activity-monitoring"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <DataAccessActivity />
    </div>
  );
}
