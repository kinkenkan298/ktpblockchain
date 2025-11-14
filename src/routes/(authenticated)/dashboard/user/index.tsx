import { AccessHistoryUser } from "@/features/dashboard/user/components/access-history-user";
import { ActiveConsentsUser } from "@/features/dashboard/user/components/active-consents-user";
import { DynamicQRCodeUser } from "@/features/dashboard/user/components/dynamic-qr-user";
import { ProfileCardUser } from "@/features/dashboard/user/components/profile-user";
import StatsCard from "@/features/dashboard/user/components/stats-card";
import {
  AccessLog,
  ActiveConsent,
  UserProfile,
} from "@/features/dashboard/user/types/user-types";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, FileCheck, Shield, Users } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/(authenticated)/dashboard/user/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);
  const [consents, setConsents] = useState<ActiveConsent[]>([]);

  useEffect(() => {
    loadDemoData();
  }, []);

  const loadDemoData = async () => {
    const demoProfile: UserProfile = {
      id: "1",
      user_id: "1",
      nik: "3201234567890123",
      full_name: "Budi Santoso",
      address: "Jl. Merdeka No. 123, Jakarta Pusat, DKI Jakarta 10110",
      phone: "+62 812-3456-7890",
      email: "budi.santoso@email.com",
      avatar_url: null,
      qr_code_secret: "demo-secret-key",
      qr_refresh_interval: 60,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const demoAccessLogs: AccessLog[] = [
      {
        id: "1",
        user_id: "1",
        accessor_name: "Bank Mandiri",
        accessor_type: "Institusi Keuangan",
        data_accessed: "NIK, Nama, Alamat",
        purpose: "Verifikasi pembukaan rekening",
        access_time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        status: "approved",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        user_id: "1",
        accessor_name: "Kementerian Kesehatan",
        accessor_type: "Instansi Pemerintah",
        data_accessed: "NIK, Nama",
        purpose: "Registrasi vaksinasi COVID-19",
        access_time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        status: "approved",
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        user_id: "1",
        accessor_name: "PT Tokopedia",
        accessor_type: "Platform E-Commerce",
        data_accessed: "NIK, Nama, Nomor Telepon",
        purpose: "Verifikasi akun merchant",
        access_time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        status: "approved",
        created_at: new Date().toISOString(),
      },
    ];

    const demoConsents: ActiveConsent[] = [
      {
        id: "1",
        user_id: "1",
        organization: "Bank Mandiri",
        organization_type: "Institusi Keuangan",
        data_shared: ["NIK", "Nama Lengkap", "Alamat", "Nomor Telepon"],
        purpose: "Layanan perbankan dan kredit",
        granted_at: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 30
        ).toISOString(),
        expires_at: new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 335
        ).toISOString(),
        status: "active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "2",
        user_id: "1",
        organization: "Kementerian Kesehatan",
        organization_type: "Instansi Pemerintah",
        data_shared: ["NIK", "Nama Lengkap", "Tanggal Lahir"],
        purpose: "Pelayanan kesehatan dan vaksinasi",
        granted_at: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 90
        ).toISOString(),
        expires_at: null,
        status: "active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "3",
        user_id: "1",
        organization: "PT Tokopedia",
        organization_type: "Platform E-Commerce",
        data_shared: ["NIK", "Nama Lengkap", "Nomor Telepon", "Alamat"],
        purpose: "Layanan jual beli online dan pengiriman",
        granted_at: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 7
        ).toISOString(),
        expires_at: new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 358
        ).toISOString(),
        status: "active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    setProfile(demoProfile);
    setAccessLogs(demoAccessLogs);
    setConsents(demoConsents);
    // setLoading(false);
  };

  const handleRevokeConsent = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin mencabut persetujuan ini?")) {
      setConsents(
        consents.map((c) => (c.id === id ? { ...c, status: "revoked" } : c))
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <div className="md:col-span-2">
          {profile && <ProfileCardUser profile={profile} />}
        </div>

        <div className="md:col-span-2">
          {profile && <DynamicQRCodeUser profile={profile} />}
        </div>

        <div className="md:col-span-2">
          <AccessHistoryUser logs={accessLogs.slice(0, 3)} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <ActiveConsentsUser
          consents={consents}
          onRevoke={handleRevokeConsent}
        />
      </div>
    </>
  );
}
