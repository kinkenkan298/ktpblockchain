import { Button } from "@/components/animate-ui/components/buttons/button";
import { IdentityDocumentCard } from "@/features/dashboard/user/components/document/identity-card-document";
import { DocumentData } from "@/features/dashboard/user/types/blockchain-user";

import { ktpQueries } from "@/services/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";

export const Route = createFileRoute(
  "/(authenticated)/dashboard/dokument-wallet"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  const { data: ktpRecordUserId } = useSuspenseQuery(
    ktpQueries.getDataKtp(user?.user.id ?? "")
  );

  let colorTheme = "from-slate-600 to-slate-900";
  const metadata = JSON.parse(ktpRecordUserId?.metadata) as {
    id: string;
    fullName: string;
    nik: string;
  };

  let docType = metadata?.id || "Dokumen";

  if (metadata?.id === "E-KTP") {
    colorTheme = "from-blue-600 to-blue-900";
  } else if (docType === "KK") {
    colorTheme = "from-emerald-600 to-teal-900";
  } else if (docType === "NPWP") {
    colorTheme = "from-yellow-500 to-orange-700";
  }

  const documents: DocumentData = {
    id: ktpRecordUserId?.id,
    hash: ktpRecordUserId?.txHash,
    rawTimestamp: ktpRecordUserId?.blockchainDate,
    type: docType,
    name: metadata?.fullName || "Tanpa Nama",
    number: metadata?.nik || "---",
    color: colorTheme,
  };

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
        <IdentityDocumentCard key={documents.id} doc={documents} />

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
