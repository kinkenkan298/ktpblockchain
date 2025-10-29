interface Step {
  number: number;
  title: string;
  subtitle: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300 ${step.number === currentStep
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-step-inactive text-step-text-inactive"
                }`}
            >
              {step.number}
            </div>
            <div className="text-center mt-2">
              <div
                className={`font-semibold text-sm ${step.number === currentStep ? "text-foreground" : "text-step-text-inactive"
                  }`}
              >
                {step.title}
              </div>
              <div
                className={`text-xs ${step.number === currentStep ? "text-foreground" : "text-step-text-inactive"
                  }`}
              >
                {step.subtitle}
              </div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 bg-step-inactive mx-2 -mt-12" />
          )}
        </div>
      ))}
    </div>
  );
}
