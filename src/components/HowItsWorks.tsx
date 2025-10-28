import { UserPlus, CheckCircle, CreditCard } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Daftar",
  },
  {
    icon: CheckCircle,
    title: "Verifikasi",
  },
  {
    icon: CreditCard,
    title: "Gunakan",
  },
];

export function HowItsWorks() {
  return (
    <section className="py-20 px-6 bg-accent/30">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-foreground mb-16">
          Cara Kerja
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-soft">
                  <step.icon className="w-12 h-12 text-primary-foreground" />
                </div>
                <p className="mt-4 text-xl font-bold text-foreground">{step.title}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block w-16 h-0.5 bg-muted mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
