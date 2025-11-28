import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function DeleteConsenst({
  isOpen,
  setIsOpen,
  consentOrganization,
  onConfirm,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  consentOrganization?: string;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog open={!!isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cabut Persetujuan Akses Data?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin mencabut persetujuan akses data untuk{" "}
            <strong>{consentOrganization || "organisasi ini"}</strong>?
            <br />
            <br />
            Setelah persetujuan dicabut, organisasi ini tidak akan lagi dapat
            mengakses data KTP Anda. Tindakan ini akan tercatat di blockchain
            dan dapat dilihat di riwayat akses.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              setIsOpen(false);
            }}
            className="bg-destructive hover:bg-destructive/90"
          >
            Ya, Cabut Persetujuan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
