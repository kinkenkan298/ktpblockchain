import { useFieldContext } from "@/hooks/form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";

interface TextareaFieldProps {
	label: string;
	placeholder?: string;
	row?: number;
	description?: string;
}

export default function TextareaField({
	label,
	placeholder,
	row = 3,
	description,
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
				rows={row}
			/>
			{description && <FieldDescription>{description}</FieldDescription>}
			{isInvalid && <FieldError errors={state.meta.errors} />}
		</Field>
	);
}
