import { RegisterForm } from "@/features/auth/components/register-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

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
