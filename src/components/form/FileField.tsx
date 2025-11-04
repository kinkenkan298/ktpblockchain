import { useFieldContext } from "@/hooks/form";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
	FieldSet,
} from "../ui/field";
import { Badge } from "../ui/badge";
import { AlertCircle, CheckCircle2, FileText, Loader2 } from "lucide-react";
import FileUploadCard from "./FileUploadCard";

export interface UploadState {
	file: File | null;
	status: "empty" | "uploading" | "uploaded" | "error";
	previewUrl: string | null;
	error?: string;
}

interface FileFieldProps {
	id: string;
	label: string;
	description?: string;
	uploadStatus: UploadState;
	uploadProgress: number;
	onRemove: () => void;
	onFileChange: (file: File) => void;
	required?: boolean;
}

export default function FileField({
	id,
	label,
	description,
	uploadStatus,
	onRemove,
	onFileChange,
	uploadProgress,
	required = false,
}: FileFieldProps) {
	const field = useFieldContext<File>();

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	const getStatusIcon = (status: UploadState["status"]) => {
		switch (status) {
			case "uploaded":
				return <CheckCircle2 className="h-4 w-4" />;
			case "uploading":
				return <Loader2 className="h-4 w-4 animate-spin" />;
			case "error":
				return <AlertCircle className="h-4 w-4" />;
			default:
				return <FileText className="h-4 w-4" />;
		}
	};

	const getStatusColor = (status: UploadState["status"]) => {
		switch (status) {
			case "uploaded":
				return "text-green-600 bg-green-50 border-green-200";
			case "uploading":
				return "text-blue-600 bg-blue-50 border-blue-200";
			case "error":
				return "text-red-600 bg-red-50 border-red-200";
			default:
				return "text-gray-600 bg-gray-50 border-gray-200";
		}
	};

	return (
		<FieldSet>
			<FieldContent>
				<FieldLabel htmlFor={field.name}>
					<span>{label}</span>
					<Badge
						variant="outline"
						className={getStatusColor(uploadStatus.status)}
					>
						<span className="flex items-center gap-1">
							{getStatusIcon(uploadStatus.status)}
							{uploadStatus.status === "uploaded"
								? "Terupload"
								: uploadStatus.status === "uploading"
									? "Mengupload"
									: uploadStatus.status === "error"
										? "Error"
										: "Belum diupload"}
						</span>
					</Badge>
				</FieldLabel>
				<FieldDescription>{description}</FieldDescription>
			</FieldContent>
			<Field>
				<FileUploadCard
					id={id}
					name={field.name}
					uploadStatus={uploadStatus}
					uploadProgress={uploadProgress}
					onFileChange={(file) => {
						field.handleChange(file);
						onFileChange(file);
					}}
					onRemove={onRemove}
					accept="image/jpeg,image/jpg,image/png"
					required={required}
				/>
			</Field>
			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</FieldSet>
	);
}
