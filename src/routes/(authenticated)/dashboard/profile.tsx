import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { AddressCard } from "@/features/dashboard/user/components/profile-card/address-info-card";
import { ConnectedServicesCard } from "@/features/dashboard/user/components/profile-card/connected-services-card";
import { ContactInfoCard } from "@/features/dashboard/user/components/profile-card/contact-info-card";
import { DocumentPreviewCard } from "@/features/dashboard/user/components/profile-card/document-preview-card";
import { IdentityCard } from "@/features/dashboard/user/components/profile-card/identity-card";
import { PersonalDataCard } from "@/features/dashboard/user/components/profile-card/personal-data-card";
import { QuickActionsCard } from "@/features/dashboard/user/components/profile-card/quick-actions-card";
import { SecurityStatusCard } from "@/features/dashboard/user/components/profile-card/security-status-card";
import {
  ConnectedService,
  UserDocument,
  UserSecurity,
} from "@/features/dashboard/user/types/user-types";

import { ktpQueries } from "@/services/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/dashboard/profile")({
  component: RouteComponent,
  pendingComponent: () => <DashboardSkeleton />,
  pendingMs: 0,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const { data: ktp_data } = useSuspenseQuery(
    ktpQueries.getDataKtp(user?.user?.id ?? "")
  );

  const { data: cid_data } = useSuspenseQuery(
    ktpQueries.getCidData(ktp_data.ipfsCid ?? "")
  );

  const mockDocuments: UserDocument[] = [
    {
      id: "1",
      document_type: "ktp_front",
      document_url: "/placeholder-ktp-front.jpg",
    },
    {
      id: "2",
      document_type: "ktp_back",
      document_url: "/placeholder-ktp-back.jpg",
    },
    {
      id: "3",
      document_type: "selfie",
      document_url: "/placeholder-selfie.jpg",
    },
  ];

  const mockSecurity: UserSecurity = {
    password_updated_at: new Date(
      Date.now() - 5 * 24 * 60 * 60 * 1000
    ).toISOString(),
    two_factor_enabled: true,
    biometric_enabled: true,
    suspicious_activity_monitoring: true,
  };

  const mockServices: ConnectedService[] = [
    {
      service_type: "bank",
      service_name: "BCA",
      service_identifier: "****1234",
      is_connected: true,
    },
    {
      service_type: "government",
      service_name: "e-KTP Digital",
      service_identifier: "",
      is_connected: true,
    },
  ];

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6 lg:col-span-2">
          <IdentityCard profile={ktp_data} />
          <PersonalDataCard
            profile={cid_data}
            createAt={ktp_data.createdAt?.toLocaleString() || ""}
          />
          <ContactInfoCard
            profile={cid_data}
            walletAddress={ktp_data.blockchainHash ?? ""}
            UserInfo={user?.user || { email: "", emailVerified: false }}
          />
          <AddressCard address={cid_data} />
        </div>

        <div className="space-y-6">
          <SecurityStatusCard security={mockSecurity} />
          <QuickActionsCard />
          <DocumentPreviewCard documents={mockDocuments} />
          <ConnectedServicesCard services={mockServices} />
        </div>
      </div>
    </div>
  );
}
