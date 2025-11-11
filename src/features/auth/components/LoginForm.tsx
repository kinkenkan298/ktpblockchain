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
import { Link } from "@tanstack/react-router";
import { z } from "zod";

export function LoginForm() {
  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: z.object({
        email: z.email({
          error: "Email tidak valid",
        }),
        password: z
          .string({
            error: "Password wajib di isi!",
          })
          .trim()
          .min(8, {
            error: "Panjang password minimal 6",
          }),
      }),
    },
    onSubmit: ({ value }) => {
      console.log(value);
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
              name="email"
              children={(field) => (
                <field.TextField
                  label="Email"
                  placeholder="email@example.com"
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
            <div>
              <Button variant={"link"} asChild>
                <Link to="/register">Belum punya akun? Daftar disini</Link>
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" form="loginForm">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
