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
    validators: {},
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
                  placeholder="Email@example.com"
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
