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
  const styles = {
    PENDING: "bg-orange-100 text-orange-700 hover:bg-orange-100",
    VERIFIED: "bg-green-100 text-green-700 hover:bg-green-100",
    REJECTED: "bg-red-100 text-red-700 hover:bg-red-100",
  };
  return (
    <Badge className={styles[status as keyof typeof styles] || ""}>
      {status}
    </Badge>
  );
}
