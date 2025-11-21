import { Button } from "@/components/animate-ui/components/buttons/button";
import { IdentityDocumentCard } from "@/features/dashboard/user/components/document/identity-card-document";
import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";

export const Route = createFileRoute(
  "/(authenticated)/dashboard/dokument-wallet"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const myDocs = [
    {
      id: 1,
      type: "E-KTP",
      name: "Budi Santoso",
      number: "3201123456789000",
      issued: "12-01-2024",
      hash: "0x8a3b...9c4d",
      color: "from-blue-600 to-blue-900",
      status: "verified",
    },
    {
      id: 2,
      type: "Kartu Keluarga",
      name: "Kel. Budi Santoso",
      number: "3201000000000001",
      issued: "10-01-2020",
      hash: "0x7b2c...8d1e",
      color: "from-emerald-600 to-teal-900",
      status: "verified",
    },
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Dompet Identitas
          </h2>
          <p className="text-muted-foreground">
            Dokumen resmi Anda yang tersimpan aman di jaringan Blockchain.
          </p>
        </div>
        <Button>+ Tambah Dokumen</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {myDocs.map((doc) => (
          <IdentityDocumentCard key={doc.id} doc={doc} />
        ))}

        <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center h-[240px] text-slate-400 hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer group">
          <div className="p-4 rounded-full bg-slate-100 group-hover:scale-110 transition-transform mb-3">
            <FileText className="w-6 h-6" />
          </div>
          <span className="font-medium">Request Dokumen Baru</span>
        </div>
      </div>
    </div>
  );
}
