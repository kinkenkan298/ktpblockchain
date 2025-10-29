import { useState } from "react";
import { StepIndicator } from "./StepIndicator";

export function RegisterForm() {
	const [currentStep, setCurrentStep] = useState<number>(1);

	const steps = [
		{ number: 1, title: "Account", subtitle: "Info" },
		{ number: 2, title: "Personal", subtitle: "Data" },
		{ number: 3, title: "Document", subtitle: "Upload" },
	];
	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<div className="w-full max-w-lg">
				<div className="bg-card rounded-3xl shadow-xl p-8 md:p-12">
					<StepIndicator steps={steps} currentStep={currentStep} />
					<h1 className="text-4xl font-bold text-foreground mb-8 mt-8">
						Registration
					</h1>
				</div>
			</div>
		</div>
	);
}
