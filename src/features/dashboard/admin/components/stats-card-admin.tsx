import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function StatsCardAdmin({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="p-3 bg-slate-100 rounded-full">{icon}</div>
      </CardContent>
    </Card>
  );
}
export function StatusBadgeAdmin({ status }: { status: string }) {
  if (status === "VERIFIED")
    return (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
        Terverifikasi
      </Badge>
    );
  if (status === "REJECTED")
    return <Badge variant="destructive">Ditolak</Badge>;
  return (
    <Badge
      variant="secondary"
      className="bg-orange-100 text-orange-700 hover:bg-orange-100"
    >
      Menunggu Review
    </Badge>
  );
}
