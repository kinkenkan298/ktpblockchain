import { CardTitle } from "@/components/ui/card";
import { withForm } from "@/hooks/form";
import { multiForm } from "../MultiForm";

const { formDataOpts } = multiForm();

export const AccountInfoFields = withForm({
	...formDataOpts,
	render: ({ form }) => {
		return (
			<div className="space-y-4">
				<CardTitle className="text-xl">Informasi Akun</CardTitle>
				<div className="grid grid-cols-2 gap-4">
					<form.AppField
						name="email"
						children={(field) => <field.TextField label="email" />}
					/>
				</div>
			</div>
		);
	},
});
