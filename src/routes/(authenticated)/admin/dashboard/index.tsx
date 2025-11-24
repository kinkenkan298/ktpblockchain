import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  StatsCardAdmin,
  StatusBadgeAdmin,
} from "@/features/dashboard/admin/components/stats-card-admin";
import { VerificationModal } from "@/features/dashboard/admin/components/verification-modal-admin";
import {
  CheckCircle,
  Clock,
  Filter,
  Loader2,
  RefreshCcw,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  mockRegistrants,
  Registrant,
} from "@/features/dashboard/admin/types/user-admin";
import { PersonalInfo } from "@/features/auth/types/register-schema";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { ktpQueries } from "@/services/queries";
import { getAllDataKtp } from "@/services/ktp.services";

export const Route = createFileRoute("/(authenticated)/admin/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedRegistrant, setSelectedRegistrant] = useState<{
    data: PersonalInfo;
    id: string;
  } | null>(null);

  const {
    data: registrants = [],
    isLoading,
    refetch,
  } = useSuspenseQuery(ktpQueries.getAllDataKtp());

  const stats = {
    total: registrants.length,
    pending: registrants.filter((d) => d.status === "PENDING").length,
    verified: registrants.filter((d) => d.status === "VERIFIED").length,
  };

  const handleVerificationComplete = (
    id: string,
    newStatus: "VERIFIED" | "REJECTED" | "SUSPENDED",
    txHash?: string
  ) => {
    setSelectedRegistrant(null);
    refetch();
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCardAdmin
          title="Antrian Pending"
          value={stats.pending}
          icon={<Clock className="text-orange-500" />}
        />
        <StatsCardAdmin
          title="Terverifikasi"
          value={stats.verified}
          icon={<CheckCircle className="text-green-500" />}
        />
        <StatsCardAdmin
          title="Total Pendaftar"
          value={stats.total}
          icon={<Users className="text-blue-500" />}
        />
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">
            Daftar Permohonan E-KTP
          </CardTitle>
          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCcw
              className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh Data
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Waktu Submit</TableHead>
                <TableHead>NIK</TableHead>
                <TableHead>Nama Lengkap</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <div className="flex justify-center items-center gap-2 text-muted-foreground">
                      <Loader2 className="animate-spin" /> Memuat data...
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {!isLoading &&
                registrants.map((row) => (
                  <TableRow key={row.id} className="hover:bg-slate-50">
                    <TableCell className="font-mono text-xs">
                      {new Date(
                        row.createdAt || "2024-01-01"
                      ).toLocaleString() || "-"}
                    </TableCell>
                    <TableCell className="font-medium">{row.nik}</TableCell>
                    <TableCell>{row.nama_lengkap}</TableCell>
                    <TableCell>
                      <StatusBadgeAdmin status={row.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      {row.status === "PENDING" ? (
                        <Button
                          size="sm"
                          onClick={() =>
                            setSelectedRegistrant({ data: row, id: row.id })
                          }
                        >
                          Tinjau Data
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Selesai
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              {!isLoading && registrants.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Tidak ada data ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedRegistrant && (
        <VerificationModal
          isOpen={!!selectedRegistrant}
          data={selectedRegistrant.data}
          id={selectedRegistrant.id}
          onClose={() => setSelectedRegistrant(null)}
          onComplete={handleVerificationComplete}
        />
      )}
    </div>
  );
}
