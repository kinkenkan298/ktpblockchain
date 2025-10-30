import {
  AccountInfoData,
  AgreementData,
  DocumentUploadData,
  PersonalInfoData,
} from "../types/registerSchema";

export type FormSteps = "account" | "personal" | "documents" | "agreement";
export type FormDataType = {
  account: AccountInfoData | null;
  personal: PersonalInfoData | null;
  documents: DocumentUploadData | null;
  agreement: AgreementData | null;
};

interface Step {
  id: FormSteps;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: string;
  formData: FormDataType;
}

export function StepIndicator({
  steps,
  currentStep,
  formData,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300 shadow ${
                currentStep === step.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : formData[step.id]
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
              }`}
            >
              {formData[step.id] ? "✓" : index + 1}
            </div>
            <div className="text-center mt-2">
              <span
                className={`font-semibold text-sm ${
                  currentStep === step.id ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
            </div>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`w-12 h-0.5 mx-2 ${
                formData[steps[index + 1].id] ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
