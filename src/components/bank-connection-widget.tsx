import {
  Building2,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

type ConnectionStatus = "disconnected" | "connected" | "incomplete";

interface BankWidgetProps {
  status?: ConnectionStatus;
  bankName?: string;
  progress?: number;
  onAction?: () => void;
}

export function BankConnectionWidget({
  status = "disconnected",
  bankName = "Bank Account",
  progress = 50,
  onAction,
}: BankWidgetProps) {
  if (status === "disconnected") {
    return (
      <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-4 relative overflow-hidden group">
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-50 rounded-full z-0 group-hover:scale-125 transition-transform duration-500" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3" /> Secure
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 text-sm">
            Connect Your Bank
          </h3>
          <p className="text-xs text-gray-500 mt-1 mb-4 leading-relaxed">
            Link your account to speed up future KYC verifications
            automatically.
          </p>

          <button
            onClick={onAction}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-all shadow-sm hover:shadow"
          >
            Connect Now <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  if (status === "connected") {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
              <Building2 className="w-5 h-5 text-gray-600" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
              <CheckCircle2 className="w-4 h-4 text-green-500 fill-white" />
            </div>
          </div>

          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">
              Linked Account
            </p>
            <h3 className="text-sm font-bold text-gray-900">{bankName}</h3>
          </div>
        </div>

        <button
          onClick={onAction}
          className="text-xs font-medium text-gray-500 hover:text-blue-600 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
        >
          Manage
        </button>
      </div>
    );
  }

  if (status === "incomplete") {
    return (
      <div className="bg-amber-50/50 rounded-xl border border-amber-200 p-4 relative overflow-hidden">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-1.5 bg-amber-100 text-amber-600 rounded-md mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-900">
              Verification Paused
            </h3>
            <p className="text-xs text-amber-700/80 mt-0.5">
              Your connection to {bankName} is incomplete.
            </p>
          </div>
        </div>

        <div className="w-full bg-amber-100 h-1.5 rounded-full mb-3 overflow-hidden">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={onAction}
          className="w-full flex items-center justify-between bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 text-xs font-medium py-1.5 px-3 rounded-lg transition-colors"
        >
          <span>Continue Setup</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return null;
}
