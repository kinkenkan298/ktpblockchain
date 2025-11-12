import { CardTitle } from "@/components/ui/card";
import { withForm } from "@/hooks/form";
import { StepFormData } from "../../types/auth-schema";
import { FieldGroup } from "@/components/ui/field";

export const AccountInfoFields = withForm({
  defaultValues: {} as Partial<StepFormData>,

  render: function Render({ form }) {
    return (
      <div className="space-y-4">
        <CardTitle className="text-xl">Informasi Akun</CardTitle>
        <FieldGroup>
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
          <form.AppField
            name="phone"
            children={(field) => (
              <field.TextField
                label="No Telp"
                placeholder="+6285112331234"
                maxLength={12}
                type="tel"
              />
            )}
          />
        </FieldGroup>
      </div>
    );
  },
});
