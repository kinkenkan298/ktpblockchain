import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: "blue" | "green" | "yellow" | "purple";
}

const colorClasses = {
  blue: "bg-primary-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  yellow: "bg-yellow-50 text-yellow-600",
  purple: "bg-purple-50 text-purple-600",
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  color = "blue",
}: StatsCardProps) {
  return (
    <Card className="shadow-md border-slate-200 hover:shadow-lg transition-all duration-300">
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-500 mb-1 font-medium">{title}</p>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            {trend && (
              <p
                className={cn(
                  "text-sm mt-2 font-semibold",
                  trendUp ? "text-green-600" : "text-red-600"
                )}
              >
                {trendUp ? "↑" : "↓"} {trend}
              </p>
            )}
          </div>
          <div className={cn("p-3 rounded-lg shrink-0", colorClasses[color])}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
