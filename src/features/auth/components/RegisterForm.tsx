import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMultiForm } from "./MultiForm";
import { StepsIndicator } from "./StepsIndicator";
import { Activity, useEffect } from "react";
import { useAppForm } from "@/hooks/form";
import { AccountInfoFields } from "./steps/AccountInfo";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PersonalInfoFields } from "./steps/PersonalInfo";
import { DocumentInfoFields } from "./steps/documentInfo";

export function RegisterForm() {
	const {
		currentStep,
		getCurrentStepSchema,
		isCompleteFormData,
		isFirstStep,
		isLastStep,
		updateFormData,
		steps,
		goToNextStep,
		goToPreviousStep,
		formData,
		submitForm,
	} = useMultiForm();

	const form = useAppForm({
		defaultValues: formData,
		validators: {
			onChange: getCurrentStepSchema(),
		},
		onSubmit: async ({ value }) => {
			const updateData = { ...formData, ...value };
			updateFormData(updateData);

			if (isLastStep) {
				try {
					if (isCompleteFormData(updateData)) {
						submitForm(updateData);
					} else {
						console.error("Form field ada yang kosong!");
					}
				} catch (error) {
					console.error(error);
				}
			} else {
				goToNextStep();
			}
		},
	});

	const onPrevious = () => goToPreviousStep();

	useEffect(() => {
		form.reset(formData);
	}, [currentStep, form.reset]);

	// useEffect(() => {
	// 	Object.entries(formData).forEach(([key, value]) => {
	// 		if (value !== undefined) {
	// 			form.setFieldValue(key as any, value);
	// 		}
	// 	});
	// }, [formData]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<div className="w-full max-w-lg">
				<Card className="rounded-3xl shadow-xl">
					<CardHeader>
						<StepsIndicator currentStep={currentStep} steps={steps} />
					</CardHeader>
					<CardContent>
						{currentStep === 0 && <AccountInfoFields form={form} />}
						{currentStep === 1 && <PersonalInfoFields form={form} />}
						{currentStep === 2 && <DocumentInfoFields form={form} />}

						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
						>
							{([canSubmit, isSubmitting]) => {
								return (
									<div
										className={`flex mt-5 pt-4 ${isFirstStep ? "justify-end" : "justify-between"}`}
									>
										<Activity mode={isFirstStep ? "hidden" : "visible"}>
											<Button variant="outline" onClick={onPrevious}>
												<ChevronLeft className="w-4 h-4 mr-1" />
												Kembali
											</Button>
										</Activity>

										<Button
											type="submit"
											disabled={!canSubmit || isSubmitting}
											variant={canSubmit ? "default" : "destructive"}
											onClick={form.handleSubmit}
										>
											{isLastStep ? "Submit data" : "Lanjut"}
											{!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
										</Button>
									</div>
								);
							}}
						</form.Subscribe>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
