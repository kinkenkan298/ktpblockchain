import { useFieldContext } from "@/hooks/form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { forwardRef, useMemo } from "react";
import { cn } from "@/lib/utils";

export interface TextareaFieldProps
  extends Omit<
    React.ComponentPropsWithoutRef<"textarea">,
    "value" | "onChange" | "onBlur" | "name" | "id"
  > {
  label: string;
  description?: string;
  required?: boolean;
  error?: string;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  (
    {
      label,
      placeholder,
      description,
      required = false,
      error,
      disabled,
      readOnly,
      className,
      onBlur,
      rows,
      ...props
    },
    ref
  ) => {
    const field = useFieldContext<string>();

    const isInvalid = useMemo(
      () => field.state.meta.isTouched && !field.state.meta.isValid,
      [field.state.meta.isTouched, field.state.meta.isValid]
    );

    const errorMessage = error || field.state.meta.errors?.[0]?.message;

    const value = field.state.value ?? "";

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      field.handleChange(e.target.value);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      field.handleBlur();
      onBlur?.(e);
    };

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
        <Textarea
          {...props}
          ref={ref}
          id={field.name}
          name={field.name}
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
          rows={rows}
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

TextareaField.displayName = "TextareaField";

export default TextareaField;
