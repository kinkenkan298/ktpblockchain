import { Building2, Shield, Check } from "lucide-react";
import { ConnectedService } from "../../types/user-types";

interface ConnectedServicesCardProps {
  services: ConnectedService[];
}

export function ConnectedServicesCard({
  services,
}: ConnectedServicesCardProps) {
  const getServiceIcon = (type: string) => {
    return type === "bank" ? Building2 : Shield;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4">
        Linked Accounts
      </h3>

      <div className="space-y-3 mb-4">
        {services.map((service, index) => {
          const Icon = getServiceIcon(service.service_type);
          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {service.service_name}
                  </p>
                  {service.service_identifier && (
                    <p className="text-xs text-gray-500 font-mono">
                      {service.service_identifier}
                    </p>
                  )}
                </div>
              </div>
              {service.is_connected && (
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <span className="text-sm font-medium">Manage Connections</span>
      </button>

      <p className="text-xs text-gray-500 text-center mt-3">
        Control third-party access
      </p>
    </div>
  );
}
