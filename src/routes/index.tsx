import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItsWorks } from "@/components/HowItsWorks";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <HowItsWorks />
      <Footer />
    </div>
  )
}
