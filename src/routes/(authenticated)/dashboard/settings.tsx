import { ProfileSection } from "@/features/settings/components/profile-section";
import { SecuritySection } from "@/features/settings/components/security-section";
import { SessionSection } from "@/features/settings/components/session-section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/dashboard/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-y-6">
      <section id="general">
        <ProfileSection />
      </section>

      <section id="security">
        <SecuritySection />
      </section>

      <section id="sessions">
        <SessionSection />
      </section>
    </div>
  );
}
