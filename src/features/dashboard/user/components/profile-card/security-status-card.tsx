import { Shield, Check } from "lucide-react";
import { UserSecurity } from "../../types/user-types";

interface SecurityStatusCardProps {
  security: UserSecurity;
}

export function SecurityStatusCard({ security }: SecurityStatusCardProps) {
  const securityChecks = [
    {
      label: "Password updated recently",
      checked: security.password_updated_at,
    },
    {
      label: "Two-factor authentication enabled",
      checked: security.two_factor_enabled,
    },
    { label: "Biometric login active", checked: security.biometric_enabled },
    {
      label: "Suspicious activity monitoring",
      checked: security.suspicious_activity_monitoring,
    },
  ];

  const activeChecks = securityChecks.filter((check) => check.checked).length;
  const securityLevel =
    activeChecks === 4 ? "Strong" : activeChecks >= 2 ? "Medium" : "Weak";

  const getLevelStyles = () => {
    if (securityLevel === "Strong") {
      return {
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        iconBg: "bg-emerald-100",
        iconText: "text-emerald-600",
        text: "text-emerald-700",
      };
    }
    if (securityLevel === "Medium") {
      return {
        bg: "bg-amber-50",
        border: "border-amber-200",
        iconBg: "bg-amber-100",
        iconText: "text-amber-600",
        text: "text-amber-700",
      };
    }
    return {
      bg: "bg-red-50",
      border: "border-red-200",
      iconBg: "bg-red-100",
      iconText: "text-red-600",
      text: "text-red-700",
    };
  };

  const styles = getLevelStyles();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
        <h2 className="text-lg font-semibold text-gray-900">
          Security & Actions
        </h2>
      </div>

      <div
        className={`${styles.bg} border ${styles.border} rounded-lg p-4 mb-6`}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`w-12 h-12 ${styles.iconBg} rounded-lg flex items-center justify-center`}
          >
            <Shield className={`w-6 h-6 ${styles.iconText}`} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Security Level</p>
            <p className={`text-lg font-bold ${styles.text}`}>
              {securityLevel}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {securityChecks.map((check, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                check.checked ? "bg-emerald-100" : "bg-gray-100"
              }`}
            >
              {check.checked && <Check className="w-3 h-3 text-emerald-600" />}
            </div>
            <p
              className={`text-sm ${check.checked ? "text-gray-900" : "text-gray-500"}`}
            >
              {check.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
