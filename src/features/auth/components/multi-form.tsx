import { CheckSquare, Contact, FileText, User } from "lucide-react";
import {
  AccountInfoSchema,
  AgreementSchema,
  AllFormFields,
  DocumentUploadSchema,
  PersonalInfoSchema,
  StepFormData,
  Steps,
} from "../types/auth-schema";
import { useState } from "react";
import { authClient } from "@/lib/auth/client";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

const stepSchemas = [
  AccountInfoSchema,
  PersonalInfoSchema,
  DocumentUploadSchema,
  AgreementSchema,
];

const Register = async (data: AllFormFields) => {
  const {
    email,
    password,
    phone,
    nama_lengkap,
    nik,
    tempat_lahir,
    tanggal_lahir,
    jenis_kelamin,
    alamat,
    rt_rw,
    kelurahan,
    kecamatan,
    kota,
    provinsi,
    kode_pos,
  } = data;

  const { error } = await authClient.signUp.email({
    email,
    password,
    nik,
    kelurahan,
    kecamatan,
    name: nama_lengkap,
    phoneNumber: phone,
    placeOfBirth: tempat_lahir,
    dateOfBirth: tanggal_lahir,
    gender: jenis_kelamin,
    address: alamat,
    rtRw: rt_rw,
    city: kota,
    province: provinsi,
    postalCode: kode_pos,
    status: "PENDING",
  });

  if (error) throw new Error(error.message);

  return data;
};

export const steps: Steps[] = [
  { id: "account", name: "Akun", icon: User },
  { id: "personal", name: "Data", icon: Contact },
  { id: "documents", name: "Dokumen", icon: FileText },
  { id: "agreement", name: "Persetujuan", icon: CheckSquare },
];

export const useMultiForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<Partial<AllFormFields>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const getCurrentStepSchema = () => stepSchemas[currentStep];

  const isCompleteFormData = (
    data: Partial<AllFormFields>
  ): data is AllFormFields => {
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

  const registerMutation = useMutation({
    mutationKey: ["auth", "sign-up"],
    mutationFn: Register,
    onSuccess: () => {
      toast.success(`Berhasil membuat akun! Silakan login`);
      queryClient.resetQueries();
      navigate({ to: "/login" });
    },
  });

  const submitForm = async (data: AllFormFields) => {
    await registerMutation.mutateAsync(data);
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
