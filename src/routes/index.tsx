import {
  RippleButton,
  RippleButtonRipples,
} from "@/components/animate-ui/components/buttons/ripple";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HowItsWorks } from "@/components/how-its-works";
import { Button } from "@/components/ui/button";
import { authQueryOptions } from "@/services/queries";
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
      <RippleButton variant={"link"} className="rounded-full" asChild>
        <Link to="/login">
          Masuk
          <RippleButtonRipples />
        </Link>
      </RippleButton>
      <RippleButton variant={"default"} className="rounded-full" asChild>
        <Link to="/register">
          Daftar
          <RippleButtonRipples />
        </Link>
      </RippleButton>
    </nav>
  );
}
