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
import { PersonalInfo } from "@/features/auth/types/register-schema";
import { ActiveConsentsUser } from "@/features/dashboard/user/components/active-consents-user";
import { DeleteConsenst } from "@/features/dashboard/user/components/delete-dialog";
import { toast } from "sonner";
import { mockupAccessLog, mockupConsenst } from "@/types/mockup-data";

export const Route = createFileRoute("/(authenticated)/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  const [accessLogs, setAccessLogs] = useState<AccessLog[]>(mockupAccessLog);
  const [consents, setConsents] = useState<ActiveConsent[]>(mockupConsenst);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [selectedConsentId, setSelectedConsentId] = useState<string | null>(
    null
  );

  const { data: data_ktp } = useSuspenseQuery({
    ...ktpQueries.getDataKtp(user?.user?.id ?? ""),
    refetchInterval: (query) => {
      const data = query.state.data;

      if (!data) return 1000;

      const hasPending = (doc: PersonalInfo) => doc.status === "PENDING";

      if (hasPending(data)) {
        return 2000;
      }

      return false;
    },
  });

  const handleRevokeConsent = async (id: string) => {
    setSelectedConsentId(id);
    setAlertOpen(true);
  };

  const handleConfirmRevoke = async () => {
    if (!selectedConsentId) return;

    console.log("Revoking consent:", selectedConsentId);

    toast.success("Persetujuan telah dicabut dengan sukses.");
    setConsents((prev) =>
      prev.map((consent) =>
        consent.id === selectedConsentId
          ? { ...consent, status: "revoked" }
          : consent
      )
    );

    setSelectedConsentId(null);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
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
          value={data_ktp?.isVerified ? "100%" : "0%"}
          icon={FileCheck}
          color="green"
        />
      </div>
      <div className="grid grid-cols-1 gap-5">
        <div className="md:col-span-2">
          <ProfileCardUser personal_info={data_ktp} user={user?.user} />
        </div>

        <div className="md:col-span-2">
          <AccessHistoryUser logs={accessLogs} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <ActiveConsentsUser
          consents={consents}
          onRevoke={handleRevokeConsent}
        />
        <BlockchainTraceTool />
      </div>

      <DeleteConsenst
        isOpen={alertOpen}
        setIsOpen={setAlertOpen}
        consentOrganization={
          consents.find((c) => c.id === selectedConsentId)?.organization
        }
        onConfirm={handleConfirmRevoke}
      />
    </div>
  );
}
