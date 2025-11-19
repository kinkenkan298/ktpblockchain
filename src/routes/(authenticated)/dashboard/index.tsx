import { AccessHistoryUser } from "@/features/dashboard/user/components/access-history-user";
import { ActiveConsentsUser } from "@/features/dashboard/user/components/active-consents-user";
import { ProfileCardUser } from "@/features/dashboard/user/components/profile-user";
import StatsCard from "@/features/dashboard/user/components/stats-card";
import {
  AccessLog,
  ActiveConsent,
} from "@/features/dashboard/user/types/user-types";

import { createFileRoute } from "@tanstack/react-router";
import { Activity, FileCheck, Shield, Users } from "lucide-react";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { ktpQueries } from "@/services/queries";
import { BlockchainTraceTool } from "@/features/dashboard/user/components/blockchain-trace";

export const Route = createFileRoute("/(authenticated)/dashboard/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const { user } = context;

    const data_ktp = context.queryClient.ensureQueryData(
      ktpQueries.getDataKtp(user?.user?.id ?? "")
    );
    return data_ktp;
  },
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const data = Route.useLoaderData();

  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  const [consents, setConsents] = useState<ActiveConsent[]>([]);

  const handleRevokeConsent = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin mencabut persetujuan ini?")) {
      setConsents(
        consents.map((c) => (c.id === id ? { ...c, status: "revoked" } : c))
      );
    }
  };
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
          value="100%"
          icon={FileCheck}
          color="green"
        />
      </div>
      <div className="grid grid-cols-1 gap-5 mb-5">
        <div className="md:col-span-2">
          <ProfileCardUser data_ktp={data} user={user?.user} />
        </div>

        <div className="md:col-span-2">
          <AccessHistoryUser logs={accessLogs.slice(0, 3)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:gap-6 mb-5">
        {/* <ActiveConsentsUser
          consents={consents}
          onRevoke={handleRevokeConsent}
        /> */}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <BlockchainTraceTool />
      </div>
    </>
  );
}
