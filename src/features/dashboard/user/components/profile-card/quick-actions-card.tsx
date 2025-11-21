import { Button } from "@/components/animate-ui/components/buttons/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, ToOptions } from "@tanstack/react-router";
import { Edit, FileText, Lock, Settings, Download } from "lucide-react";
import React from "react";

interface ActionsMenu extends ToOptions {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}

export function QuickActionsCard() {
  const actions: ActionsMenu[] = [
    {
      icon: Edit,
      label: "Ubah Informasi Pribadi",
      color: "blue",
      to: "/dashboard/profile/edit",
    },
    {
      icon: FileText,
      label: "Update Dokumen",
      color: "blue",
      to: "/dashboard/dokument-wallet",
    },
    {
      icon: Lock,
      label: "Ganti Password",
      color: "blue",
      to: "/dashboard/profile/password",
    },
    {
      icon: Settings,
      label: "Pengaturan Privasi",
      color: "blue",
      to: "/dashboard/settings",
    },
    {
      icon: Download,
      label: "Unduh Digital ID",
      color: "blue",
      to: "/dashboard/profile/download",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aksi Cepat</CardTitle>
        <CardDescription>Manajemen Profil</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full flex items-center space-x-3"
              asChild
            >
              <Link to={action.to}>
                <action.icon className="w-4 h-4 text-blue-600" />
                {action.label}
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
