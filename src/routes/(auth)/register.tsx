import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen">
      <RegisterForm />
    </div>
  );
}
