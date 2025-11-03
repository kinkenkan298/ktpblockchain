import { withForm } from "@/hooks/form";
import { StepFormData } from "../../types/registerSchema";

export const PersonalInfoFields = withForm({
	defaultValues: {} as Partial<StepFormData>,
	render: ({ form }) => {
		return (
			<div className="grid grid-cols-2 ">
				<form.AppField
					name="nik"
					children={(field) => (
						<field.TextField label="NIK" placeholder="" maxLength={16} />
					)}
				/>
			</div>
		);
	},
});
