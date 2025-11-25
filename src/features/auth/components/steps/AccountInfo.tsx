import { CardTitle } from "@/components/ui/card";
import { withForm } from "@/hooks/form";
import { AllFormSchema } from "../../types/auth-schema";
import { FieldGroup } from "@/components/ui/field";
import { authClient } from "@/lib/auth/client";
import { useState } from "react";

export const AccountInfoFields = withForm({
  defaultValues: {} as Partial<AllFormSchema>,

  render: function Render({ form }) {
    return (
      <div className="space-y-4">
        <CardTitle className="text-xl">Informasi Akun</CardTitle>
        <FieldGroup>
          <form.AppField
            name="username"
            validators={{
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                if (!value) {
                  return { username: "Username dibutuhkan!" };
                }
                const { data: response, error } =
                  await authClient.isUsernameAvailable({
                    username: value,
                  });
                if (error) {
                  return {
                    username: "Terjadi kesalahan saat memeriksa username!",
                  };
                }
                if (response?.available) {
                  return undefined;
                }
                return { username: "Username tidak tersedia!" };
              },
            }}
            children={(field) => (
              <field.TextField
                label="Username"
                placeholder="Username"
                error={field.state.meta.errors?.[0]?.username}
              />
            )}
          />
          <form.AppField
            name="email"
            children={(field) => (
              <field.TextField label="Email" placeholder="Email" />
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
          <form.AppField
            name="confirm_password"
            children={(field) => (
              <field.TextField
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
              />
            )}
          />
        </FieldGroup>
      </div>
    );
  },
});
