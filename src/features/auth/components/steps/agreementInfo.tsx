import { useForm } from "@tanstack/react-form";
import { AgreementData, AgreementSchema } from "../../types/registerSchema";

interface AgreementInfoProps {
  defaultValues?: AgreementData | null;
  onBack: () => void;
}

const defaultData: AgreementData = {
  terms_agreement: false,
  data_consent: false,
};

export function AgreementInfo({ defaultValues, onBack }: AgreementInfoProps) {
  const form = useForm({
    defaultValues: defaultValues || defaultData,
    validators: {
      onSubmit: AgreementSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <form>
      <div>h2</div>
    </form>
  );
}
