import { CheckCircle2, Clock, Hash } from "lucide-react";
import { TxType } from "../types/blockchain-user";

export const getActionLabel = (action: string) => {
  const labels: { [key: string]: string } = {
    STORE: "Penyimpanan Data",
    CONSENT: "Permintaan Data",
    VERIFY: "Verifikasi Identitas",
    ACCESS: "Akses Diberikan",
  };
  return labels[action] || action;
};

export const getStatusIcon = (status: TxType) => {
  switch (status) {
    case "STORE":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "CONSENT":
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case "VERIFY":
      return <CheckCircle2 className="h-4 w-4 text-red-500" />;
    default:
      return <Hash className="h-4 w-4 text-gray-500" />;
  }
};
