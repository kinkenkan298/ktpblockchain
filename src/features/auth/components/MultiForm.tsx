import { CheckSquare, Contact, FileText, User } from "lucide-react";
import {
  AccountInfoSchema,
  AgreementSchema,
  DocumentUploadSchema,
  PersonalInfoSchema,
  StepFormData,
  Steps,
} from "../types/auth-schema";
import { useState } from "react";

const stepSchemas = [
  AccountInfoSchema,
  PersonalInfoSchema,
  DocumentUploadSchema,
  AgreementSchema,
];

export const steps: Steps[] = [
  { id: "account", name: "Akun", icon: User },
  { id: "personal", name: "Data", icon: Contact },
  { id: "documents", name: "Dokumen", icon: FileText },
  { id: "agreement", name: "Persetujuan", icon: CheckSquare },
];
export const useMultiForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<Partial<StepFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const getCurrentStepSchema = () => stepSchemas[currentStep];

  const isCompleteFormData = (
    data: Partial<StepFormData>
  ): data is StepFormData => {
    try {
      stepSchemas.forEach((schema) => schema.parse(data));
      return true;
    } catch {
      return false;
    }
  };

  const goToNextStep = () => {
    if (!isLastStep) setCurrentStep((prev) => prev + 1);
  };
  const goToPreviousStep = () => {
    if (!isFirstStep) setCurrentStep((prev) => prev - 1);
  };
  const updateFormData = (newData: Partial<StepFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const submitForm = async (data: StepFormData) => {
    // const { signUp } = authClient;
    console.log();
    // const { api } = auth;
    // await api.signUpEmail({
    //   body: {
    //     email: data
    //   }
    // })

    setIsSubmitted(true);
  };
  const resetForm = () => {
    setFormData({});
    setCurrentStep(0);
    setIsSubmitted(false);
  };

  return {
    isCompleteFormData,
    currentStep,
    formData,
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
