import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/(auth)/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/register" });

  const handleRegisterSuccess = () => {
    toast.success("Berhasil input");
    setTimeout(() => {
      navigate({ to: "/login" });
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <RegisterForm />
    </div>
  );
}
