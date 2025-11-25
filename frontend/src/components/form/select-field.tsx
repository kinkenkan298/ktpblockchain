import { useFieldContext } from "@/hooks/form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { forwardRef, useMemo } from "react";
import { cn } from "@/lib/utils";

export interface SelectFieldProps {
  label: string;
  selectLabel?: string;
  data: { label: string; value: string }[];
  description?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
}

const SelectField = forwardRef<HTMLButtonElement, SelectFieldProps>(
  (
    {
      label,
      selectLabel,
      data,
      description,
      required = false,
      error,
      disabled,
      placeholder,
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

    const handleValueChange = (newValue: string) => {
      field.handleChange(newValue);
    };

    const handleBlur = () => {
      field.handleBlur();
    };

    const isDisabled = disabled;

    const placeholderText = placeholder || selectLabel || label;

    return (
      <Field data-invalid={isInvalid} data-disabled={isDisabled}>
        <FieldLabel htmlFor={field.name}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </FieldLabel>
        <Select
          value={value}
          onValueChange={handleValueChange}
          disabled={isDisabled}
        >
          <SelectTrigger
            ref={ref}
            id={field.name}
            onBlur={handleBlur}
            aria-invalid={isInvalid}
            aria-required={required}
            aria-describedby={cn(
              description && `${field.name}-description`,
              (isInvalid || errorMessage) && `${field.name}-error`
            )}
            className={cn(isInvalid && "border-destructive")}
          >
            <SelectValue placeholder={placeholderText} />
          </SelectTrigger>
          <SelectContent>
            {data.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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

SelectField.displayName = "SelectField";

export default SelectField;
