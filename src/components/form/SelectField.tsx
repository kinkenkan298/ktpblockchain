import { useFieldContext } from "@/hooks/form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import React from "react";

interface SelectFieldProps extends React.ComponentPropsWithRef<"select"> {
  label: string;
  selectLabel?: string;
  data: { label: string; value: string }[];
  description?: string;
}

export default function SelectField({
  label,
  selectLabel,
  data,
  description,
}: SelectFieldProps) {
  const { name, state, handleChange, handleBlur } = useFieldContext<string>();

  const isInvalid = state.meta.isTouched && !state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Select
        value={state.value}
        onValueChange={(value) => handleChange(value as string)}
      >
        <SelectTrigger id={name} onBlur={handleBlur}>
          <SelectValue placeholder={selectLabel ? selectLabel : label} />
        </SelectTrigger>
        <SelectContent>
          {data.map((d) => (
            <SelectItem value={d.value}>{d.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {description && <FieldDescription>{description}</FieldDescription>}
      {isInvalid && <FieldError errors={state.meta.errors} />}
    </Field>
  );
}
