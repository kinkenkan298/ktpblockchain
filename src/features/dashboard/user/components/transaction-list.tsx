import { Card, CardContent } from "@/components/ui/card";
import { TxItem } from "../types/blockchain-user";
import { CheckCircle, Clock, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/animate-ui/components/buttons/button";

export function TransactionList({
  data,
  privacy,
  onDetail,
}: {
  data: TxItem[];
  privacy: boolean;
  onDetail: (tx: TxItem) => void;
}) {
  return (
    <div className="grid gap-3">
      {data.map((tx: TxItem) => (
        <Card
          key={tx.hash}
          className="hover:shadow-md transition-all border-l-4 border-l-blue-500/50 group"
        >
          <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 bg-green-100 text-green-700 rounded-full group-hover:scale-110 transition-transform">
                <CheckCircle size={18} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm md:text-base">
                    {tx.title}
                  </h4>
                  <Badge variant="secondary" className="text-[10px] h-5">
                    Confirmed
                  </Badge>
                </div>

                <div className="text-xs md:text-sm text-muted-foreground font-mono bg-slate-50 w-fit px-1 rounded">
                  {privacy ? `${tx.hash.substring(0, 8)}...****` : tx.hash}
                </div>

                <div className="flex gap-2 mt-1">
                  {tx.metadata.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-[10px] bg-white"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 w-full md:w-auto pl-12 md:pl-0">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock size={12} />
                {tx.timestamp.toLocaleString("id-ID", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs"
                onClick={() => onDetail(tx)}
              >
                <FileText size={12} className="mr-2" />
                Detail
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
