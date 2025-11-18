import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/dashboard/edit-profile")(
  {
    component: RouteComponent,
  }
);

function RouteComponent() {
  return <div>Hello "/(authenticated)/dashboard/edit-profile"!</div>;
}
