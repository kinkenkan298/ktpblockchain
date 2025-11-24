import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/animate-ui/components/radix/dialog";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, CheckCircle, ShieldAlert } from "lucide-react";
import { Registrant } from "../types/user-admin";

interface ModalProps {
  isOpen: boolean;
  data: Registrant;
  onClose: () => void;
  onComplete: (id: string, status: "VERIFIED" | "REJECTED") => void;
}

export function VerificationModal({
  isOpen,
  data,
  onClose,
  onComplete,
}: ModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      console.log("🚀 MINTING DATA KE BLOCKCHAIN...");

      // --------------------------------------------------
      // DISINI KAMU PANGGIL 'storeHash' / 'registerKTP'
      // --------------------------------------------------
      // await walletClient.writeContract({
      //    address: CONTRACT_ADDRESS,
      //    abi: ABI,
      //    functionName: 'storeHash', // Atau registerKTP
      //    args: [data.ipfsHash, JSON.stringify(data)]
      // });

      // Simulasi delay blockchain 2 detik
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("✅ Data on-chain confirmed!");
      onComplete(data.id, "VERIFIED"); // Update state parent
    } catch (error) {
      console.error("Gagal verifikasi:", error);
      alert("Gagal menulis ke blockchain!");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!confirm("Yakin ingin menolak data ini?")) return;
    onComplete(data.id, "REJECTED");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Tinjau Data Pendaftar</DialogTitle>
          <DialogDescription>
            Validasi kelengkapan data sebelum melakukan pencatatan di Blockchain
            (Immutable).
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2 text-sm text-slate-500 uppercase tracking-wider">
              <CheckCircle size={16} /> Data Diri
            </h4>
            <div className="grid gap-4 border p-4 rounded-lg bg-slate-50">
              <div className="grid gap-1">
                <Label className="text-xs text-muted-foreground">
                  Nomor Induk Kependudukan (NIK)
                </Label>
                <div className="font-mono font-medium text-lg">{data.nik}</div>
              </div>
              <div className="grid gap-1">
                <Label className="text-xs text-muted-foreground">
                  Nama Lengkap
                </Label>
                <div className="font-medium">{data.name}</div>
              </div>
              <div className="grid gap-1">
                <Label className="text-xs text-muted-foreground">Alamat</Label>
                <div>{data.address}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2 text-sm text-slate-500 uppercase tracking-wider">
              <ShieldAlert size={16} /> Lampiran Dokumen
            </h4>
            <div className="border-2 border-dashed rounded-lg h-[250px] flex flex-col items-center justify-center bg-slate-50 text-muted-foreground">
              {/* Nanti disini render Image dari IPFS */}
              {/* <img src={`https://ipfs.io/ipfs/${data.ipfsHash}`} /> */}
              <p className="text-sm">Preview Dokumen (Foto/Scan)</p>
              <p className="text-xs font-mono mt-2 bg-slate-200 px-2 py-1 rounded">
                CID: {data.ipfsHash.substring(0, 15)}...
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <DialogFooter className="flex justify-between gap-4 sm:gap-0 sm:justify-between">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={isProcessing}
            className="min-w-[150px]"
          >
            Tolak Permohonan
          </Button>
          <Button
            onClick={handleApprove}
            disabled={isProcessing}
            className="bg-blue-600 hover:bg-blue-700 min-w-[150px]"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Minting...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Verifikasi & Mint
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
