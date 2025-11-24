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
import { authClient } from "@/lib/auth/client";
import { createKtpRecord } from "@/services/ktp.services";

import { registerUserKtp } from "@/services/auth.api";

const stepSchemas = [
  AccountInfoSchema,
  PersonalInfoSchema,
  DocumentUploadSchema,
  AgreementSchema,
] as const;

const steps: Steps[] = [
  { id: "account", name: "Akun", icon: User },
  { id: "personal", name: "Data", icon: Contact },
  { id: "documents", name: "Dokumen", icon: FileText },
  { id: "agreement", name: "Persetujuan", icon: CheckSquare },
];

const $registerUser = async (data: AllFormSchema) => {
  const {
    username,
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

  const personalInfoData = {
    nama_lengkap,
    nik,
    tempat_lahir,
    tanggal_lahir,
    alamat,
    rt_rw,
    kota,
    kelurahan,
    jenis_kelamin,
    kecamatan,
    provinsi,
    kode_pos,
    phone,
  };

  const { error: error_data } = PersonalInfoSchema.safeParse(personalInfoData);

  if (error_data) throw new Error(error_data.message);

  const {
    ipfsCid,
    ipfsUrl,
    generateHash,
    txHash,
    contractRecordId,
    blockNumber,
    metadata,
    blockchainDate,
  } = await createKtpRecord({
    data: personalInfoData,
  });

  if (!contractRecordId) throw new Error("Contract Record ID tidak ada");

  const { error, data: signUpData } = await authClient.signUp.email({
    email,
    password,
    name: nama_lengkap,
    username,
  });

  if (error) throw new Error(error.message);

  if (!signUpData.user?.id) {
    throw new Error("Berhasil membuat akun user namun user id tidak ada");
  }

  const recordId = await registerUserKtp({
    data: {
      userId: signUpData.user.id,
      blockchainHash: generateHash,
      txHash,
      ipfsCid,
      ipfsUrl,
      contractRecordId,
      blockNumber,
      metadata,
      blockchainDate,
    },
  });

  return {
    user: signUpData.user,
    personalInfo: personalInfoData,
    recordId,
  };
};

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
    mutationFn: $registerUser,
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
