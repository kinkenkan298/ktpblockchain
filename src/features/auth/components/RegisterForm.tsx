import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { multiForm } from "./MultiForm";
import { StepsIndicator } from "./StepsIndicator";
import { useEffect } from "react";
import { useAppForm } from "@/hooks/form";
import { AccountInfoFields } from "./steps/akuninfo";

export function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
	const {
		currentStep,
		getCurrentStepSchema,
		isFirstStep,
		isLastStep,
		isSubmitted,
		updateFormData,
		steps,
		goToNextStep,
		goToPreviousStep,
		resetForm,
		formData,
		formDataOpts,
		submitForm,
	} = multiForm();
	const form = useAppForm({
		...formDataOpts,
		validators: {
			onChange: getCurrentStepSchema(),
		},
	});

	// useEffect(() => {
	// 	reset(formData);
	// }, [currentStep, formData, reset]);
	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<div className="w-full max-w-lg">
				<Card className="rounded-3xl shadow-xl">
					<CardHeader>
						<StepsIndicator currentStep={currentStep} steps={steps} />
					</CardHeader>
					<CardContent>
						{currentStep === 0 && <AccountInfoFields form={form} />}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
