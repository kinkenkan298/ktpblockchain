import { AccessHistoryUser } from "@/features/dashboard/user/components/access-history-user";
import { ActiveConsentsUser } from "@/features/dashboard/user/components/active-consents-user";
import { DynamicQRCodeUser } from "@/features/dashboard/user/components/dynamic-qr-user";
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
import Loader from "@/components/kokonutui/loader";

export const Route = createFileRoute("/(authenticated)/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  const [consents, setConsents] = useState<ActiveConsent[]>([]);

  const {
    data: ktp_data,
    isLoading,
    isError,
  } = useQuery({
    ...ktpQueries.getDataKtp(user?.user?.id ?? ""),
    enabled: Boolean(user?.user?.id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  if (isError || !ktp_data) {
    return <div>Gagal memuat data KTP.</div>;
  }

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
          <ProfileCardUser data_ktp={ktp_data} user={user?.user} />
        </div>

        <div className="md:col-span-2">
          <DynamicQRCodeUser />
        </div>

        <div className="md:col-span-2">
          <AccessHistoryUser logs={accessLogs.slice(0, 3)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:gap-6 mb-5">
        <ActiveConsentsUser
          consents={consents}
          onRevoke={handleRevokeConsent}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <BlockchainTraceTool />
      </div>
    </>
  );
}
