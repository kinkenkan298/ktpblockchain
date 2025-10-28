import { Button } from "./ui/button";
import heroIlustration from "@/assets/hero-illustration.png"

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6" style={{ background: 'var(--gradient-hero)' }}>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Identitas Anda,<br />Kendali Anda
            </h2>
            <p className="text-xl text-muted-foreground max-w-lg">
              Sistem identitas digital yang aman dan dilengkapi dengan teknologi blockchain
            </p>
            <Button size="lg" className="rounded-full text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
              Pelajari Lebih Lanjut
            </Button>
          </div>

          <div className="flex justify-center">
            <img
              src={heroIlustration}
              alt="Digital Identity Card"
              className="w-full max-w-md drop-shadow-2xl animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
