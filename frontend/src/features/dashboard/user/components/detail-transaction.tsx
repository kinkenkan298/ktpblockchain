import { Badge } from "@/components/ui/badge";
import { TxItem } from "../types/blockchain-user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog";

export function DetailTransaction({
  tx,
  onClose,
}: {
  tx: TxItem | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!tx} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Transaksi</DialogTitle>
          <DialogDescription>
            Snapshot data immutability dari Local Blockchain.
          </DialogDescription>
        </DialogHeader>

        {tx && (
          <div className="grid gap-4 py-4 text-sm">
            <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
              <span className="font-medium text-muted-foreground">Status</span>
              <Badge className="w-fit bg-green-500 hover:bg-green-600">
                Success
              </Badge>
            </div>
            <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
              <span className="font-medium text-muted-foreground">Tx Hash</span>
              <code className="col-span-3 text-xs bg-slate-100 p-2 rounded break-all font-mono select-all">
                {tx.hash}
              </code>
            </div>
            <div className="grid grid-cols-4 items-center gap-4 border-b pb-2">
              <span className="font-medium text-muted-foreground">Actor</span>
              <code className="col-span-3 text-xs bg-slate-100 p-2 rounded font-mono select-all">
                {tx.actor}
              </code>
            </div>

            <div className="mt-2 grid grid-cols-1 items-center">
              <span className="font-medium text-muted-foreground mb-2 block">
                Raw Event Data (On-Chain)
              </span>
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-md text-sm overflow-x-auto w-full">
                {JSON.stringify(
                  tx.rawEvent,
                  (key, value) =>
                    typeof value === "bigint" ? value.toString() : value,
                  2
                )}
              </pre>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
