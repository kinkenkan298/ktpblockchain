import { useFieldContext } from "@/hooks/form";
import { Field, FieldError, FieldLabel, FieldSet } from "../ui/field";
import { useState } from "react";
import { RadioGroup } from "../ui/radio-group";
import { RadioGroupItem } from "@radix-ui/react-radio-group";

interface RadioFieldProps {
	label: string;
}

const asad = [
	{
		label: "Laki Laki",
		name: "jk-laki",
	},
];

export default function RadioField({ label }: RadioFieldProps) {
	const [value, setValue] = useState<string>("");

	const field = useFieldContext<string>();
	const isInvalid = !field.state.meta.isValid && field.state.meta.isTouched;

	return (
		<FieldSet>
			<FieldLabel>{label}</FieldLabel>
			<RadioGroup
				value={field.state.value}
				onValueChange={() => field.handleChange}
				name={field.name}
				id={field.name}
				aria-invalid={isInvalid}
			>
				<Field orientation="horizontal" data-invalid={isInvalid}>
					<RadioGroupItem value="male" id="jk-laki" aria-invalid={isInvalid} />
					<FieldLabel htmlFor="jk-laki" className="font-normal">
						Laki Laki
					</FieldLabel>
				</Field>
				<Field orientation="horizontal" data-invalid={isInvalid}>
					<RadioGroupItem
						value="female"
						id="jk-perempuan"
						aria-invalid={isInvalid}
					/>
					<FieldLabel htmlFor="jk-perempuan" className="font-normal">
						Perempuan
					</FieldLabel>
				</Field>
			</RadioGroup>
			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</FieldSet>
	);
}
