import { useFieldContext } from "@/hooks/form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import React from "react";

interface TextareaFieldProps extends React.ComponentPropsWithRef<"textarea"> {
	label: string;
	description?: string;
}

export default function TextareaField({
	label,
	placeholder,
	description,
	rows,
}: TextareaFieldProps) {
	const { name, state, handleChange, handleBlur } = useFieldContext<string>();
	const isInvalid = state.meta.isTouched && !state.meta.isValid;

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={name}>{label}</FieldLabel>
			<Textarea
				id={name}
				name={name}
				value={state.value}
				onBlur={handleBlur}
				onChange={(e) => handleChange(e.target.value)}
				aria-invalid={isInvalid}
				placeholder={placeholder}
				autoComplete="off"
				rows={rows}
			/>
			{description && <FieldDescription>{description}</FieldDescription>}
			{isInvalid && <FieldError errors={state.meta.errors} />}
		</Field>
	);
}
