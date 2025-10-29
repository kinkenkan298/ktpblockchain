
import logoIcon from "@/assets/logo.png";
import { Image } from "@unpic/react";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src={logoIcon} alt="Logo E-KTP" width={90} height={90} layout="fixed" />
            <div>
              <h3 className="font-bold text-foreground">Digital ID</h3>
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
