import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { User as UserIcon, MapPin, Phone, Mail } from "lucide-react";
import { ProfileCardProps } from "../types/user-types";

export function ProfileCardUser({ user, personal_info }: ProfileCardProps) {
  return (
    <Card className="shadow-md border-slate-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">Profil Pengguna</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary hover:bg-blue-50"
            asChild
          >
            <Link to="/dashboard/edit-profile">Edit Profile</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center space-x-4 mb-6 pb-6">
          <div className="shrink-0 w-20 h-20 bg-primary rounded-full flex items-center justify-center overflow-hidden shadow-md">
            {user?.image ? (
              <img
                src={user?.image}
                alt={user?.name || "User Avatar"}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="w-10 h-10 text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xl font-bold text-slate-900">
              {user?.name || personal_info?.nama_lengkap || "User"}
            </h4>
            <p className="text-sm text-slate-500">
              Status:{" "}
              <Badge
                className={
                  personal_info?.status.toLowerCase() === "verified"
                    ? "bg-green-500 text-white"
                    : personal_info?.status.toLowerCase() === "pending"
                      ? "bg-yellow-500 text-white"
                      : personal_info?.status.toLowerCase() === "rejected"
                        ? "bg-red-500 text-white"
                        : "bg-gray-500 text-white"
                }
                variant={"default"}
              >
                {personal_info?.status.toLowerCase().charAt(0).toUpperCase() +
                  personal_info?.status.toLowerCase().slice(1)}
              </Badge>
            </p>
          </div>
        </div>

        <Separator className="mb-6" />

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className="shrink-0 w-5 h-5 text-slate-400 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500 mb-1">Kota</p>
              <p className="text-sm font-medium text-slate-900">
                {personal_info.kota ?? "Kota Tidak Diketahui"}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Phone className="shrink-0 w-5 h-5 text-slate-400 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500 mb-1">Provinsi</p>
              <p className="text-sm font-medium text-slate-900">
                {personal_info.provinsi ?? "Provinsi Tidak Diketahui"}
              </p>
            </div>
          </div>

          {user?.email && (
            <div className="flex items-start space-x-3">
              <Mail className="shrink-0 w-5 h-5 text-slate-400 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 mb-1">Email</p>
                <p className="text-sm font-medium text-slate-900 break-all">
                  {user?.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
