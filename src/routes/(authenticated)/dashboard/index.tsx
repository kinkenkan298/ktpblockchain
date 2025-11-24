import { AccessHistoryUser } from "@/features/dashboard/user/components/access-history-user";
import { ProfileCardUser } from "@/features/dashboard/user/components/profile-user";
import StatsCard from "@/features/dashboard/user/components/stats-card";
import {
  AccessLog,
  ActiveConsent,
} from "@/features/dashboard/user/types/user-types";

import { createFileRoute } from "@tanstack/react-router";
import { Activity, FileCheck, Shield, Users } from "lucide-react";
import { useState } from "react";

import { ktpQueries } from "@/services/queries";
import { BlockchainTraceTool } from "@/features/dashboard/user/components/blockchain-trace";

import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/(authenticated)/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  const { data: data_ktp } = useSuspenseQuery(
    ktpQueries.getDataKtp(user?.user?.id ?? "")
  );
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  const [consents, setConsents] = useState<ActiveConsent[]>([]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 mb-5">
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
          value="0%"
          icon={FileCheck}
          color="green"
        />
      </div>
      <div className="grid grid-cols-1 gap-5 mb-5">
        <div className="md:col-span-2">
          <ProfileCardUser personal_info={data_ktp} user={user?.user} />
        </div>

        <div className="md:col-span-2">
          <AccessHistoryUser logs={accessLogs.slice(0, 3)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <BlockchainTraceTool />
      </div>
    </>
  );
}
