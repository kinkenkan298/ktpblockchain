import { DocumentUploadData } from "../../types/registerSchema";

interface DocumentUploadProps {
	defaultValues?: DocumentUploadData;
	onNext: (data: DocumentUploadData) => void;
	onBack: () => void;
}

export function DocumentUploadSteps({
	defaultValues,
	onBack,
	onNext,
}: DocumentUploadProps) {
	return (
		<div>
			<h2>upload</h2>
		</div>
	);
}
