import { useState } from "react";
import { StepIndicator, FormSteps, FormDataType } from "./StepIndicator";
import { AccountInfoStep } from "./steps/accountInfo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function RegisterForm() {
	const [currentStep, setCurrentStep] = useState<FormSteps>("account");

	const [formData, setFormData] = useState<FormDataType>({
		account: null,
		personal: null,
		documents: null,
		agreement: null,
	});

	const steps: { number: number; id: FormSteps; title: string }[] = [
		{ number: 1, id: "account", title: "Akun" },
		{ number: 2, id: "personal", title: "Data diri" },
		{ number: 3, id: "documents", title: "Dokumen" },
		{ number: 4, id: "agreement", title: "Persetujuan" },
	];
	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<div className="w-full max-w-lg">
				<Card className="rounded-3xl shadow-xl">
					<CardHeader>
						<StepIndicator
							steps={steps}
							currentStep={currentStep}
							formData={formData}
						/>
					</CardHeader>
					<CardContent>
						{currentStep === "account" && (
							<AccountInfoStep
								defaultValues={formData.account}
								onNext={(data) => {
									setFormData((prev) => ({ ...prev, account: data }));
									setCurrentStep("personal");
								}}
							/>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
