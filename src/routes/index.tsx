import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItsWorks } from "@/components/HowItsWorks";
import { Button } from "@/components/ui/button";
import { authQueryOptions } from "@/lib/auth/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Header>
        <Suspense fallback={<div className="py-6">Loading user...</div>}>
          <UserAction />
        </Suspense>
      </Header>
      <Hero />
      <Features />
      <HowItsWorks />
      <Footer />
    </div>
  );
}
function UserAction() {
  const { data: user } = useSuspenseQuery(authQueryOptions.user());
  return user ? (
    <div className="flex items-center gap-2">
      <Button type="button" asChild className="mb-2">
        <Link to="/dashboard">Back to Dashboard</Link>
      </Button>
    </div>
  ) : (
    <nav className="hidden md:flex items-center gap-8">
      <Link
        to="/login"
        className="text-foreground hover:text-primary transition-colors"
      >
        Masuk
      </Link>
      <Button size="lg" className="rounded-full" asChild>
        <Link to="/register">Daftar</Link>
      </Button>
    </nav>
  );
}
