
import logoIcon from "@/assets/logo-icon.png";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="Digital KTP" className="w-10 h-10" />
            <div>
              <h3 className="font-bold text-foreground">Digital KTP</h3>
              <p className="text-sm text-muted-foreground">Blockchain</p>
            </div>
          </div>

          <p className="text-muted-foreground text-sm">
            © 2024 Digital KTP Blockchain. Semua hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
