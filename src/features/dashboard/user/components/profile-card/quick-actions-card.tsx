import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Manage Your Profile</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full flex items-center space-x-3"
            >
              <action.icon className="w-4 h-4 text-blue-600" />
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
