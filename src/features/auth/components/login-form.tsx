import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppForm } from "@/hooks/form";
import { Link, useNavigate } from "@tanstack/react-router";
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

export function LoginForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const LoginMutation = useMutation({
    mutationKey: ["auth", "sign-in"],
    mutationFn: Login,
    onSuccess: (resp) => {
      toast.success(`${resp.user.name} Selamat datang!`);
      queryClient.resetQueries();
      navigate({ to: "/dashboard" });
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
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Login kedalam akun anda
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" form="loginForm">
          Login
        </Button>
      </CardFooter>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or
        </span>
      </div>
      <div className="text-sm text-center">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="underline underline-offset-4 text-primary"
        >
          Daftar disini
        </Link>
      </div>
    </Card>
  );
}
