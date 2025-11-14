import {
  Clock,
  Building2,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { AccessLog } from "../types/user-types";
import { cn } from "@/lib/utils";

interface AccessHistoryProps {
  logs: AccessLog[];
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "denied":
      return <XCircle className="w-5 h-5 text-red-500" />;
    case "pending":
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    default:
      return <Clock className="w-5 h-5 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-700";
    case "denied":
      return "bg-red-100 text-red-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays < 7) return `${diffDays} hari yang lalu`;

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export function AccessHistoryUser({ logs }: AccessHistoryProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Riwayat Akses</h3>
          <p className="text-sm text-gray-500 mt-1">
            Aktivitas akses data terbaru oleh pihak ketiga
          </p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Lihat Semua
        </button>
      </div>

      <div className="space-y-4">
        {logs.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">Belum ada riwayat akses</p>
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      {log.accessor_name}
                    </h4>
                    <p className="text-xs text-gray-500">{log.accessor_type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(log.status)}
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      getStatusColor(log.status)
                    )}
                  >
                    {log.status === "approved"
                      ? "Disetujui"
                      : log.status === "denied"
                        ? "Ditolak"
                        : "Pending"}
                  </span>
                </div>
              </div>

              <div className="space-y-2 ml-13">
                <div className="flex items-start">
                  <span className="text-xs text-gray-500 w-24">
                    Data diakses:
                  </span>
                  <span className="text-xs font-medium text-gray-900">
                    {log.data_accessed}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-xs text-gray-500 w-24">Tujuan:</span>
                  <span className="text-xs text-gray-700">{log.purpose}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-xs text-gray-500 w-24">Waktu:</span>
                  <span className="text-xs text-gray-700">
                    {formatDate(log.access_time)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
