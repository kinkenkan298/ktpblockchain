import { CheckSquare, Contact, FileText, User } from "lucide-react";
import {
  AccountInfoSchema,
  AgreementSchema,
  AllFormSchema,
  DocumentUploadSchema,
  PersonalInfoSchema,
  Steps,
} from "../types/auth-schema";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { $registerUser } from "@/lib/auth/functions";

const stepSchemas = [
  AccountInfoSchema,
  PersonalInfoSchema,
  DocumentUploadSchema,
  AgreementSchema,
] as const;

export const steps: Steps[] = [
  { id: "account", name: "Akun", icon: User },
  { id: "personal", name: "Data", icon: Contact },
  { id: "documents", name: "Dokumen", icon: FileText },
  { id: "agreement", name: "Persetujuan", icon: CheckSquare },
];

export const useMultiForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<Partial<AllFormSchema>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const getCurrentStepSchema = () => stepSchemas[currentStep];

  const isCompleteFormData = (
    data: Partial<AllFormSchema>
  ): data is AllFormSchema => {
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

  const updateFormData = (newData: Partial<AllFormSchema>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const registerMutation = useMutation({
    mutationKey: ["auth", "sign-up"],
    mutationFn: async (data: AllFormSchema) => {
      return await $registerUser({ data });
    },
    onSuccess: () => {
      toast.success("Berhasil membuat akun! Silakan login");
      queryClient.invalidateQueries();
      navigate({ to: "/login" });
      setIsSubmitted(true);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal membuat akun. Silakan coba lagi.");
    },
  });

  const submitForm = async (data: AllFormSchema) => {
    try {
      await registerMutation.mutateAsync(data);
    } catch (error) {
      // Error handling is done in onError callback
      console.error("Registration error:", error);
    }
  };

  const resetForm = () => {
    setFormData({});
    setCurrentStep(0);
    setIsSubmitted(false);
    registerMutation.reset();
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
    isSubmitting: registerMutation.isPending,
  };
};
