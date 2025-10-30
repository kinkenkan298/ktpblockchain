import {
  type AccountInfoData,
  AccountInfoSchema,
} from "../../types/registerSchema";
import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface AccountInfoStepsPros {
  defaultValues?: AccountInfoData | null;
  onNext: (data: AccountInfoData) => void;
}

const defaultData: AccountInfoData = {
  email: "",
  password: "",
  confirm_password: "",
  phone: "",
};

export function AccountInfoStep({
  defaultValues,
  onNext,
}: AccountInfoStepsPros) {
  const form = useForm({
    defaultValues: defaultValues || defaultData,
    validators: {
      onSubmit: AccountInfoSchema,
    },
    onSubmit: async ({ value }) => {
      onNext(value);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Informasi Akun
        </h3>
        <FieldGroup>
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Email"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="password"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Password"
                    autoComplete="off"
                    type="password"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="confirm_password"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Confirm Password"
                    autoComplete="off"
                    type="password"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="phone"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>No Telp</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="No Telp"
                      autoComplete="off"
                      type="number"
                    />
                    <InputGroupAddon>
                      <span className="">+62</span>
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </div>
      <div className="flex justify-end mt-5">
        <form.Subscribe
          selector={(state) => [state.isValid, state.isSubmitting]}
          children={([isValid, isSubmitting]) => (
            <Button
              variant={isValid ? "default" : "destructive"}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Lanjut ke data diri
            </Button>
          )}
        />
      </div>
    </form>
  );
}
