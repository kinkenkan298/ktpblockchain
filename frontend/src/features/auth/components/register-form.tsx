import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useMultiForm } from "./multi-form";
import { StepsIndicator } from "./steps-indicator";
import { useMemo, useEffect, useCallback } from "react";
import { useAppForm } from "@/hooks/form";
import { AccountInfoFields } from "./steps/AccountInfo";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PersonalInfoFields } from "./steps/PersonalInfo";
import { AgreementInfoFields } from "./steps/AgreementInfo";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { AllFormSchema } from "../types/auth-schema";

const STEP_COMPONENTS = [
  AccountInfoFields,
  PersonalInfoFields,
  AgreementInfoFields,
] as const;

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
    isSubmitting,
  } = useMultiForm();

  const currentStepValidator = useMemo(() => {
    return getCurrentStepSchema();
  }, [currentStep, getCurrentStepSchema]);

  const handleSubmit = useCallback(
    async ({ value }: { value: Partial<AllFormSchema> }) => {
      const updatedData = { ...formData, ...value };
      updateFormData(updatedData);

      if (isLastStep) {
        if (!isCompleteFormData(updatedData)) {
          toast.error("Mohon lengkapi semua field yang diperlukan");
          return;
        }

        try {
          await submitForm(updatedData as AllFormSchema);
        } catch (error) {
          console.error("Registration submission error:", error);
        }
      } else {
        goToNextStep();
      }
    },
    [
      formData,
      isLastStep,
      isCompleteFormData,
      updateFormData,
      submitForm,
      goToNextStep,
    ]
  );

  const form = useAppForm({
    defaultValues: formData as Partial<AllFormSchema>,
    validators: {
      onChange: currentStepValidator,
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    form.reset(formData as Partial<AllFormSchema>);
  }, [currentStep, form, formData]);

  const handlePrevious = useCallback(() => {
    const currentValues = form.state.values;
    updateFormData({ ...formData, ...currentValues });
    goToPreviousStep();
  }, [form, formData, updateFormData, goToPreviousStep]);

  const CurrentStepComponent = STEP_COMPONENTS[currentStep];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg">
        <Card className="rounded-3xl shadow-xl">
          <CardHeader>
            <StepsIndicator currentStep={currentStep} steps={steps} />
          </CardHeader>
          <CardContent>
            {CurrentStepComponent && <CurrentStepComponent form={form} />}

            <form.Subscribe
              selector={(state) => ({
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
              })}
            >
              {({ canSubmit, isSubmitting: formIsSubmitting }) => {
                const isLoading = formIsSubmitting || isSubmitting;
                const isDisabled = !canSubmit || isLoading;

                return (
                  <div
                    className={`flex mt-5 pt-4 gap-2 ${
                      isFirstStep ? "justify-end" : "justify-between"
                    }`}
                  >
                    {!isFirstStep && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={isLoading}
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Kembali
                      </Button>
                    )}

                    <Button
                      type="submit"
                      disabled={isDisabled}
                      variant={canSubmit ? "default" : "destructive"}
                      onClick={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                      }}
                    >
                      {isLoading ? (
                        "Memproses..."
                      ) : isLastStep ? (
                        "Submit data"
                      ) : (
                        <>
                          Lanjut
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </Button>
                  </div>
                );
              }}
            </form.Subscribe>
          </CardContent>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Atau
            </span>
          </div>
          <div className="text-sm text-center pb-4">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="underline underline-offset-4 text-primary hover:text-primary/80 transition-colors"
            >
              Login disini
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
