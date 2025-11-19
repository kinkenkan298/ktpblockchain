import { Edit, FileText, Lock, Settings, Download } from "lucide-react";

export function QuickActionsCard() {
  const actions = [
    { icon: Edit, label: "Edit Personal Information", color: "blue" },
    { icon: FileText, label: "Update Documents", color: "blue" },
    { icon: Lock, label: "Change Password", color: "blue" },
    { icon: Settings, label: "Privacy Settings", color: "blue" },
    { icon: Download, label: "Download Digital ID", color: "blue" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4">
        Quick Actions
      </h3>
      <p className="text-sm text-gray-600 mb-4">Manage Your Profile</p>

      <div className="space-y-2">
        {actions.map((action, index) => (
          <button
            key={index}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group"
          >
            <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors">
              <action.icon className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
