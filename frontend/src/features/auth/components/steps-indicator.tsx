import type { Steps } from "@/features/auth/types/auth-schema";
import { Check } from "lucide-react";

export function StepsIndicator({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: Steps[];
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;

        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg  font-semibold duration-300 shadow-lg transition-colors ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <div className="text-center mt-2">
                <span
                  className={`font-semibold text-sm ${
                    isCurrent ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {step.name}
                </span>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-colors ${
                  isCompleted ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
