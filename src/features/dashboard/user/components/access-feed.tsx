import { useState } from "react";
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Ban,
  Link2,
} from "lucide-react";

type AccessStatus = "approved" | "rejected" | "pending";
type ActivityLog = {
  id: string;
  title: string;
  actor: string;
  details: string;
  timestamp: Date;
  status: AccessStatus;
};

interface ActivityItem {
  id: string;
  orgName: string;
  orgLogo: string;
  isVerified: boolean;
  timestamp: string;
  purpose: string;
  dataAccessed: string[];
  duration: string;
  status: AccessStatus;
  txHash: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    orgName: "Bank BCA Digital",
    orgLogo: "BCA",
    isVerified: true,
    timestamp: "2 hours ago",
    purpose: "Account opening verification (KYC Level 2)",
    dataAccessed: ["Full Name", "NIK", "E-KTP Photo", "Facial Biometrics"],
    duration: "24 hours",
    status: "approved",
    txHash: "0x7f8a...3b21",
  },
];

// --- Helper Components ---

const StatusBadge = ({ status }: { status: AccessStatus }) => {
  const config = {
    approved: {
      icon: <CheckCircle2 className="w-4 h-4" />,
      text: "Approved",
      classes: "bg-green-50 text-green-700 border-green-200",
    },
    rejected: {
      icon: <XCircle className="w-4 h-4" />,
      text: "Rejected",
      classes: "bg-red-50 text-red-700 border-red-200",
    },
    pending: {
      icon: <Clock className="w-4 h-4" />,
      text: "Waiting Approval",
      classes: "bg-yellow-50 text-yellow-700 border-yellow-200",
    },
  };

  const current = config[status];

  return (
    <span
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${current.classes}`}
    >
      {current.icon}
      {current.text}
    </span>
  );
};

const OrgLogoPlaceholder = ({ name, code }: { name: string; code: string }) => (
  <div
    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm ${
      code === "BCA"
        ? "bg-blue-600"
        : code === "BPJS"
          ? "bg-green-600"
          : code === "TSEL"
            ? "bg-red-600"
            : "bg-gray-500"
    }`}
  >
    {code}
  </div>
);

// --- Main Component ---

export default function ActivityFeed() {
  const [items, setItems] = useState(ACTIVITIES);

  const handleRevoke = (id: string) => {
    if (
      confirm(
        "Are you sure you want to revoke access? This may affect your services with this provider."
      )
    ) {
      alert("Access revoked successfully via Smart Contract.");
    }
  };

  return (
    <div>
      {/* Header Section */}
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Data Access Activity
        </h2>
        <p className="text-gray-500 mt-1">
          Monitor who accesses your Digital ID data. Your privacy is protected
          by blockchain transparency.
        </p>
      </header>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
          >
            <div className="p-5 border-b border-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <OrgLogoPlaceholder name={item.orgName} code={item.orgLogo} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {item.orgName}
                      </h3>
                      {item.isVerified && (
                        <ShieldCheck className="w-4 h-4 text-blue-500 fill-blue-50" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{item.timestamp}</p>
                  </div>
                </div>
                <StatusBadge status={item.status} />
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Purpose
                </p>
                <p className="text-sm text-gray-800">{item.purpose}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Data Accessed
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.dataAccessed.map((data, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {data}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs text-gray-500 mt-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Duration: {item.duration}</span>
                </div>
                {item.status === "approved" && (
                  <div className="flex items-center gap-1.5 text-green-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>You approved this request</span>
                  </div>
                )}
              </div>
            </div>

            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-blue-600 transition-colors cursor-pointer">
                <Link2 className="w-3.5 h-3.5" />
                <span className="font-mono bg-gray-200/50 px-1 rounded">
                  {item.txHash}
                </span>
              </div>

              <div className="flex items-center gap-3 justify-end">
                {item.status === "approved" && (
                  <button
                    onClick={() => handleRevoke(item.id)}
                    className="text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    Revoke Access
                  </button>
                )}

                {item.status === "pending" ? (
                  <button className="text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 px-4 py-1.5 rounded-lg transition-colors shadow-sm">
                    Review Request
                  </button>
                ) : (
                  <button className="text-xs font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1">
                    View Details <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Your privacy is cryptographically secured.</span>
          <a href="#" className="underline hover:text-gray-600">
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
