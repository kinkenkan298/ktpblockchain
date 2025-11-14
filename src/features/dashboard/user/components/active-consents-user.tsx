import { Shield, Calendar, X, Building2, CheckCircle } from "lucide-react";
import { ActiveConsent } from "../types/user-types";
import { cn } from "@/lib/utils";

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Persetujuan Aktif
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Kelola izin akses data Anda
          </p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">
            {activeConsents.length} Aktif
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {activeConsents.length === 0 ? (
          <div className="text-center py-8">
            <Shield className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">
              Tidak ada persetujuan aktif saat ini
            </p>
          </div>
        ) : (
          activeConsents.map((consent) => {
            const expiryStatus = getExpiryStatus(consent.expires_at);

            return (
              <div
                key={consent.id}
                className="border border-gray-200 rounded-lg p-5 hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">
                        {consent.organization}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {consent.organization_type}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onRevoke(consent.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Cabut persetujuan"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 ml-15">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">
                      Data yang dibagikan:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {consent.data_shared.map((data, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                        >
                          {data}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Tujuan:</p>
                    <p className="text-sm text-gray-700">{consent.purpose}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Diberikan: {formatDate(consent.granted_at)}</span>
                    </div>
                    {consent.expires_at && (
                      <div
                        className={cn(
                          "text-xs font-medium",
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
          })
        )}
      </div>

      {activeConsents.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Catatan:</strong> Anda dapat mencabut persetujuan kapan
            saja. Pencabutan akan segera menghentikan akses pihak ketiga ke data
            Anda.
          </p>
        </div>
      )}
    </div>
  );
}
