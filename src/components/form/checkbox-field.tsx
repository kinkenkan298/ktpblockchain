import { useFieldContext } from "@/hooks/form";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import { Checkbox } from "../ui/checkbox";

export default function CheckboxField({ label }: { label: string }) {
	const field = useFieldContext<boolean>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	return (
		<Field>
			<div className="flex items-center gap-2">
				<Checkbox
					id={field.name}
					checked={field.state.value}
					onCheckedChange={(checked) => field.handleChange(checked === true)}
					onBlur={field.handleBlur}
				/>
				<FieldContent>
					<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
				</FieldContent>
			</div>
			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</Field>
	);
}
