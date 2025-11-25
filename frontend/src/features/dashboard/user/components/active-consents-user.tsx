import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Shield,
  Calendar,
  X,
  Building2,
  CheckCircle,
  Badge,
} from "lucide-react";
import { ActiveConsent } from "../types/user-types";

interface ActiveConsentsProps {
  consents: ActiveConsent[];
  onRevoke: (id: string) => void;
}

const getExpiryStatus = (expiresAt: string | null) => {
  if (!expiresAt) return { text: "Tidak terbatas", color: "text-gray-600" };

  const expiryDate = new Date(expiresAt);
  const now = new Date();
  const diffDays = Math.ceil((expiryDate.getTime() - now.getTime()) / 86400000);

  if (diffDays < 0) return { text: "Kedaluwarsa", color: "text-red-600" };
  if (diffDays === 0) return { text: "Hari ini", color: "text-yellow-600" };
  if (diffDays < 7)
    return { text: `${diffDays} hari lagi`, color: "text-yellow-600" };
  if (diffDays < 30)
    return { text: `${diffDays} hari lagi`, color: "text-blue-600" };

  return { text: `${diffDays} hari lagi`, color: "text-green-600" };
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export function ActiveConsentsUser({
  consents,
  onRevoke,
}: ActiveConsentsProps) {
  const activeConsents = consents.filter((c) => c.status === "active");

  return (
    <Card className="shadow-md border-slate-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Persetujuan Aktif</CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              Kelola izin akses data Anda
            </p>
          </div>
          <Badge className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            <span>{activeConsents.length} Aktif</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {activeConsents.length === 0 ? (
          <div className="text-center py-8">
            <Shield className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">
              Tidak ada persetujuan aktif saat ini
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {activeConsents.map((consent) => {
                const expiryStatus = getExpiryStatus(consent.expires_at);

                return (
                  <div
                    key={consent.id}
                    className="border border-slate-200 rounded-lg p-5 hover:border-blue-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3 flex-1 min-w-0">
                        <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-semibold text-slate-900 truncate">
                            {consent.organization}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {consent.organization_type}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => onRevoke(consent.id)}
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-slate-400 hover:text-red-600 hover:bg-red-50"
                        title="Cabut persetujuan"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="space-y-3 ml-15">
                      <div>
                        <p className="text-xs text-slate-500 mb-2 font-medium">
                          Data yang dibagikan:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {consent.data_shared.map((data, idx) => (
                            <Badge key={idx} className="text-xs">
                              {data}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500 mb-1 font-medium">
                          Tujuan:
                        </p>
                        <p className="text-sm text-slate-700">
                          {consent.purpose}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <Calendar className="w-4 h-4 shrink-0" />
                          <span>
                            Diberikan: {formatDate(consent.granted_at)}
                          </span>
                        </div>
                        {consent.expires_at && (
                          <div
                            className={cn(
                              "text-xs font-semibold",
                              expiryStatus.color
                            )}
                          >
                            Berakhir: {expiryStatus.text}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Alert className="mt-4">
              <AlertDescription>
                <strong className="block mb-1">Catatan Penting:</strong>
                <span className="text-sm">
                  Anda dapat mencabut persetujuan kapan saja. Pencabutan akan
                  menghentikan akses pihak ketiga.
                </span>
              </AlertDescription>
            </Alert>
          </>
        )}
      </CardContent>
    </Card>
  );
}
