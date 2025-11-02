import { Activity, useState } from "react";
import { StepIndicator, FormSteps, FormDataType } from "./StepIndicator";
import { AccountInfoStep } from "./steps/AccountInfo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PersonalDataSteps } from "./steps/PersonalData";
import { DocumentUploadSteps } from "./steps/DocumentUpload";
import { AgreementInfo } from "./steps/AgreementInfo";

export function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
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

	const handleSubmit = () => {
		if (
			!formData.account ||
			!formData.personal ||
			!formData.documents ||
			!formData.agreement
		) {
			return;
		}
		onSuccess();
	};

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
						<Activity mode={currentStep === "account" ? "visible" : "hidden"}>
							<AccountInfoStep
								defaultValues={formData.account}
								onNext={(data) => {
									setFormData((prev) => ({ ...prev, account: data }));
									setCurrentStep("personal");
								}}
							/>
						</Activity>
						<Activity mode={currentStep === "personal" ? "visible" : "hidden"}>
							<PersonalDataSteps
								defaultValues={formData.personal}
								onBack={() => setCurrentStep("account")}
								onNext={(data) => {
									setFormData((prev) => ({ ...prev, personal: data }));
									setCurrentStep("documents");
								}}
							/>
						</Activity>
						<Activity mode={currentStep === "documents" ? "visible" : "hidden"}>
							<DocumentUploadSteps
								defaultValues={formData.documents}
								onBack={() => setCurrentStep("personal")}
								onNext={(data) => {
									setFormData((prev) => ({ ...prev, documents: data }));
									setCurrentStep("agreement");
								}}
							/>
						</Activity>
						<Activity mode={currentStep === "agreement" ? "visible" : "hidden"}>
							<AgreementInfo
								defaultValues={formData.agreement}
								onBack={() => setCurrentStep("agreement")}
								onSubmit={handleSubmit}
							/>
						</Activity>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
