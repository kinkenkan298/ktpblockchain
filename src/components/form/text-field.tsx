import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/hooks/form";
import { forwardRef, useMemo } from "react";
import { cn } from "@/lib/utils";

export interface TextFieldProps
  extends Omit<
    React.ComponentPropsWithoutRef<"input">,
    "value" | "onChange" | "onBlur" | "name" | "id"
  > {
  label: string;
  description?: string;
  required?: boolean;
  error?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      type = "text",
      placeholder,
      description,
      required = false,
      error,
      disabled,
      readOnly,
      className,
      onBlur,
      ...props
    },
    ref
  ) => {
    const field = useFieldContext<string>();

    // Determine if field is invalid
    const isInvalid = useMemo(
      () => field.state.meta.isTouched && !field.state.meta.isValid,
      [field.state.meta.isTouched, field.state.meta.isValid]
    );

    // Get error message (from props or field state)
    const errorMessage = error || field.state.meta.errors?.[0]?.message;

    // Handle value - ensure it's always a string
    const value = field.state.value ?? "";

    // Handle change event
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      field.handleChange(e.target.value);
    };

    // Handle blur event
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      field.handleBlur();
      onBlur?.(e);
    };

    // Determine if field should be disabled
    const isDisabled = disabled;

    return (
      <Field
        data-invalid={isInvalid}
        data-disabled={isDisabled}
        data-readonly={readOnly}
      >
        <FieldLabel htmlFor={field.name}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </FieldLabel>
        <Input
          {...props}
          ref={ref}
          id={field.name}
          name={field.name}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={readOnly}
          aria-invalid={isInvalid}
          aria-required={required}
          aria-describedby={cn(
            description && `${field.name}-description`,
            (isInvalid || errorMessage) && `${field.name}-error`
          )}
          autoComplete={props.autoComplete ?? "off"}
          className={cn(isInvalid && "border-destructive", className)}
        />
        {description && (
          <FieldDescription id={`${field.name}-description`}>
            {description}
          </FieldDescription>
        )}
        {(isInvalid || errorMessage) && (
          <FieldError
            id={`${field.name}-error`}
            errors={field.state.meta.errors}
          >
            {errorMessage}
          </FieldError>
        )}
      </Field>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
