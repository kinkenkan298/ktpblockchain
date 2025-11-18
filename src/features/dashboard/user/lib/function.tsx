import { CheckCircle2, Clock, Hash, XCircle } from "lucide-react";

export const getActionLabel = (action: string) => {
  const labels: { [key: string]: string } = {
    data_share: "Berbagi Data",
    consent_given: "Memberikan Persetujuan",
    identity_verify: "Verifikasi Identitas",
    access_granted: "Akses Diberikan",
  };
  return labels[action] || action;
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "failed":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Hash className="h-4 w-4 text-gray-500" />;
  }
};
