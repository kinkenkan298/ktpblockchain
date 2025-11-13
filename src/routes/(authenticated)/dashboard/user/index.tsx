import StatsCard from "@/features/dashboard/user/components/stats-card";
import {
  AccessLog,
  ActiveConsent,
} from "@/features/dashboard/user/types/user-types";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, FileCheck, Shield, Users } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/(authenticated)/dashboard/user/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  const [consents, setConsents] = useState<ActiveConsent[]>([]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Akses"
        value={accessLogs.length}
        icon={Activity}
        trend="+3 bulan ini"
        trendUp={true}
        color="blue"
      />
      <StatsCard
        title="Persetujuan Aktif"
        value={consents.filter((c) => c.status === "active").length}
        icon={Shield}
        color="green"
      />
      <StatsCard
        title="Organisasi Terhubung"
        value={new Set(consents.map((c) => c.organization)).size}
        icon={Users}
        color="purple"
      />
      <StatsCard
        title="Data Terverifikasi"
        value="100%"
        icon={FileCheck}
        color="green"
      />
    </div>
  );
}
