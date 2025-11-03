import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/hooks/form";

type TextFieldProps = {
	label: string;
	type?: string;
	maxLength?: number;
};

export default function TextField({
	label,
	type = "text",
	maxLength,
}: TextFieldProps) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Input
				id={field.name}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
				aria-invalid={isInvalid}
				placeholder="Confirm Password"
				autoComplete="off"
				type={type}
				maxLength={maxLength}
			/>

			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</Field>
	);
}
