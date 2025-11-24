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
import { CheckCircle, Clock, Filter, Search, Users } from "lucide-react";
import { useState } from "react";
import {
  mockRegistrants,
  Registrant,
} from "@/features/dashboard/admin/types/user-admin";

export const Route = createFileRoute("/(authenticated)/admin/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [data, setData] = useState<Registrant[]>(mockRegistrants);
  const [selectedRegistrant, setSelectedRegistrant] =
    useState<Registrant | null>(null);
  const [search, setSearch] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.nik.includes(search)
  );

  const stats = {
    total: data.length,
    pending: data.filter((d) => d.status === "PENDING").length,
    verified: data.filter((d) => d.status === "VERIFIED").length,
  };

  const handleVerificationComplete = (
    id: string,
    newStatus: "VERIFIED" | "REJECTED"
  ) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    setSelectedRegistrant(null);
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
          <div className="flex gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari Nama atau NIK..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>
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
              {filteredData.map((row) => (
                <TableRow key={row.id} className="hover:bg-slate-50">
                  <TableCell className="font-mono text-xs">
                    {row.submittedAt}
                  </TableCell>
                  <TableCell className="font-medium">{row.nik}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <StatusBadgeAdmin status={row.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    {row.status === "PENDING" ? (
                      <Button
                        size="sm"
                        onClick={() => setSelectedRegistrant(row)}
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
              {filteredData.length === 0 && (
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
          data={selectedRegistrant}
          onClose={() => setSelectedRegistrant(null)}
          onComplete={handleVerificationComplete}
        />
      )}
    </div>
  );
}
