import { Shield, Zap, Sliders } from "lucide-react"
import { Card, CardContent } from "./ui/card";

const features = [
  {
    icon: Shield,
    title: "AMAN",
    description: "Perlindungan data dan transaksi yang aman",
    color: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "PRAKTIS",
    description: "Proses yang mudah dan cepat",
    color: "bg-primary/10",
  },
  {
    icon: Sliders,
    title: "TERKENDALI",
    description: "Kontrol penuh atas identitas Anda",
    color: "bg-primary/10",
  },
];

export function Features() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-8 text-center space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-2xl ${feature.color} flex items-center justify-center`}>
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
