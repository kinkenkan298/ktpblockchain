import { useAppForm } from "@/hooks/form";
import { useNavigate } from "@tanstack/react-router";
import { LoginSchema } from "../types/login-schema";
import { authClient } from "@/lib/auth/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

const Login = async (data: LoginSchema) => {
  const { success } = z.email().safeParse(data.UsernameOrEmail);

  if (!success) {
    const { error, data: response } = await authClient.signIn.username({
      username: data.UsernameOrEmail,
      password: data.password,
    });
    if (error) throw new Error(error.message);
    return response;
  }
  const { error, data: response } = await authClient.signIn.email({
    email: data.UsernameOrEmail,
    password: data.password,
  });

  if (error) throw new Error(error.message);
  return response;
};

export function LoginForm({ redirectUrl }: { redirectUrl?: string }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const LoginMutation = useMutation({
    mutationKey: ["auth", "sign-in"],
    mutationFn: Login,
    onSuccess: async (resp) => {
      toast.success(`${resp.user.name} Selamat datang!`);

      await queryClient.resetQueries();

      navigate({ to: redirectUrl || "/dashboard" });
    },
  });

  const form = useAppForm({
    defaultValues: {
      UsernameOrEmail: "",
      password: "",
    } as LoginSchema,
    validators: {},
    onSubmit: async ({ value }) => {
      await LoginMutation.mutateAsync(value);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      id="loginForm"
    >
      <div className="flex flex-col gap-6">
        <form.AppField
          name="UsernameOrEmail"
          children={(field) => (
            <field.TextField
              label="Username atau Email"
              placeholder="Username atau Email"
            />
          )}
        />
        <form.AppField
          name="password"
          children={(field) => (
            <field.TextField
              label="Password"
              placeholder="Password"
              type="password"
            />
          )}
        />
      </div>
    </form>
  );
}
