import { BadgeAlert, FileText, User } from "lucide-react";
import {
	AccountInfoSchema,
	AgreementSchema,
	DocumentUploadSchema,
	PersonalInfoSchema,
	StepFormData,
	Steps,
} from "../types/registerSchema";
import { useState } from "react";
import { formOptions } from "@tanstack/react-form";

const stepSchemas = [
	AccountInfoSchema,
	PersonalInfoSchema,
	DocumentUploadSchema,
	AgreementSchema,
];

export const steps: Steps[] = [
	{ id: "account", name: "Akun", icon: User },
	{ id: "personal", name: "Data Diri", icon: User },
	{ id: "documents", name: "Dokumen", icon: FileText },
	{ id: "agreement", name: "Persetujuan", icon: BadgeAlert },
];
export const multiForm = () => {
	const [currentStep, setCurrentStep] = useState<number>(0);
	const [formData, setFormData] = useState<Partial<StepFormData>>({});
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

	const isFirstStep = currentStep === 0;
	const isLastStep = currentStep === steps.length - 1;

	const getCurrentStepSchema = () => stepSchemas[currentStep];

	const goToNextStep = () => {
		if (!isLastStep) setCurrentStep((prev) => prev + 1);
	};
	const goToPreviousStep = () => {
		if (!isFirstStep) setCurrentStep((prev) => prev - 1);
	};
	const updateFormData = (newData: Partial<StepFormData>) => {
		setFormData((prev) => ({ ...prev, ...newData }));
	};

	const submitForm = (data: StepFormData) => {
		console.log(data);
		setIsSubmitted(true);
	};
	const resetForm = () => {
		setFormData({});
		setCurrentStep(0);
		setIsSubmitted(false);
	};
	const formDataOpts = formOptions({
		defaultValues: formData,
	});

	return {
		currentStep,
		formData,
		formDataOpts,

		isSubmitted,
		isFirstStep,
		isLastStep,
		steps,
		goToNextStep,
		goToPreviousStep,
		updateFormData,
		submitForm,
		resetForm,
		getCurrentStepSchema,
	};
};
