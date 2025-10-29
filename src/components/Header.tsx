import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import logoPng from "@/assets/logo.png"
import { Image } from "@unpic/react"


export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src={logoPng} alt="Logo E-KTP" width={90} height={90} layout="fixed" />
            <div>
              <h1 className="text-xl font-bold text-foreground uppercase">Digital ID</h1>
              <p className="text-sm text-muted-foreground">Blockchain</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/auth/login" className="text-foreground hover:text-primary transition-colors">
              Masuk
            </Link>
            <Button size="lg" className="rounded-full" asChild>
              <Link to="/auth/register">
                Daftar
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
