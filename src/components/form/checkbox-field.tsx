import { useFieldContext } from "@/hooks/form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldDescription,
} from "../ui/field";
import { Checkbox } from "../ui/checkbox";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxFieldProps {
  label: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function CheckboxField({
  label,
  description,
  error,
  disabled,
  required = false,
}: CheckboxFieldProps) {
  const field = useFieldContext<boolean>();

  const isInvalid = useMemo(
    () => field.state.meta.isTouched && !field.state.meta.isValid,
    [field.state.meta.isTouched, field.state.meta.isValid]
  );

  const errorMessage = error || field.state.meta.errors?.[0]?.message;

  const handleCheckedChange = (checked: boolean) => {
    field.handleChange(checked);
  };

  // Handle blur event
  const handleBlur = () => {
    field.handleBlur();
  };

  const isDisabled = disabled;

  const checked = field.state.value ?? false;

  return (
    <Field data-invalid={isInvalid} data-disabled={isDisabled}>
      <div className="flex items-start gap-2">
        <Checkbox
          id={field.name}
          checked={checked}
          onCheckedChange={handleCheckedChange}
          onBlur={handleBlur}
          disabled={isDisabled}
          aria-invalid={isInvalid}
          aria-required={required}
          aria-describedby={cn(
            description && `${field.name}-description`,
            (isInvalid || errorMessage) && `${field.name}-error`
          )}
          className={cn(isInvalid && "border-destructive")}
        />
        <FieldContent>
          <FieldLabel htmlFor={field.name}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FieldLabel>
          {description && (
            <FieldDescription id={`${field.name}-description`}>
              {description}
            </FieldDescription>
          )}
        </FieldContent>
      </div>
      {(isInvalid || errorMessage) && (
        <FieldError id={`${field.name}-error`} errors={field.state.meta.errors}>
          {errorMessage}
        </FieldError>
      )}
    </Field>
  );
}
