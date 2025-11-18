import { Badge } from "@/components/ui/badge";
import { BlockchainTransaction } from "../types/blockchain-user";
import { getActionLabel } from "../lib/function";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog";
import { Button } from "@/components/animate-ui/components/buttons/button";

interface TransactionDetailModalProps {
  transaction: BlockchainTransaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  privacyMode: boolean;
}

export function TransactionDetailModal({
  transaction,
  open,
  onOpenChange,
  privacyMode,
}: TransactionDetailModalProps) {
  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl"
        from="top"
        transition={{ type: "keyframes" }}
      >
        <DialogHeader>
          <DialogTitle>Detail Transaksi Blockchain</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Jenis Aksi
              </label>
              <div className="mt-1">
                {getActionLabel(transaction.actionType)}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Status
              </label>
              <div className="mt-1">
                <Badge
                  variant={
                    transaction.status === "completed"
                      ? "default"
                      : transaction.status === "pending"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {transaction.status}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Hash Transaksi
            </label>
            <div className="mt-1 font-mono text-sm bg-gray-100 p-2 rounded">
              {privacyMode
                ? `${transaction.transactionHash.substring(0, 16)}...`
                : transaction.transactionHash}
            </div>
          </div>

          {!privacyMode && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Block Number
                  </label>
                  <div className="mt-1">#{transaction.blockNumber}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Network
                  </label>
                  <div className="mt-1 capitalize">
                    {transaction.blockchainNetwork}
                  </div>
                </div>
              </div>

              {transaction.gasUsed && (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Gas Used
                  </label>
                  <div className="mt-1">{transaction.gasUsed} ETH</div>
                </div>
              )}
            </>
          )}

          <div>
            <label className="text-sm font-medium text-gray-600">
              Data yang Diakses
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {transaction.dataFields.map((field, index) => (
                <Badge key={index} variant="secondary">
                  {field}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Privasi Terjaga:</strong> Identitas pribadi Anda tidak
              tersimpan di blockchain. Hash anonim digunakan untuk melacak
              aktivitas tanpa mengungkap identitas.
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline">Salin Hash</Button>
            <Button>Lihat di Block Explorer</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
