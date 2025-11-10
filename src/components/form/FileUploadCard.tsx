import React, { useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { AlertCircle, Eye, Loader2, Upload, X } from "lucide-react";
import { Progress } from "../ui/progress";
import { Alert, AlertDescription } from "../ui/alert";
import { UploadState } from "./FileField";

interface FileUploadCardProps {
	id: string;
	name: string;
	uploadStatus: UploadState;
	uploadProgress: number;
	onFileChange: (file: File) => void;
	onRemove: () => void;
	accept: string;
	required: boolean;
}

export default function FileUploadCard({
	id,
	name,
	uploadStatus,
	uploadProgress,
	onFileChange,
	onRemove,
	accept,
	required,
}: FileUploadCardProps) {
	const [isDragOver, setIsDragOver] = useState<boolean>(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);

		const file = e.dataTransfer.files[0];
		if (file && file.type.startsWith("image/")) {
			onFileChange(file);
		}
	};

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			onFileChange(file);
		}
	};

	if (uploadStatus.status === "uploaded" && uploadStatus.previewUrl) {
		return (
			<Card className="border-2 border-green-200">
				<CardContent className="p-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="w-16 h-16 bg-muted rounded-md overflow-hidden border">
								<img
									src={uploadStatus.previewUrl}
									alt="Preview"
									className="w-full h-full object-cover"
								/>
							</div>
							<div>
								<p className="text-sm font-medium">Preview</p>
								<p className="text-xs text-muted-foreground">
									{uploadStatus.file?.name}
								</p>
								<p className="text-xs text-green-600">
									✓ Siap untuk verifikasi
								</p>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<Dialog>
								<DialogTrigger asChild>
									<Button variant="outline" size="sm">
										<Eye className="h-4 w-4 mr-1" />
										Lihat
									</Button>
								</DialogTrigger>
								<DialogContent
									className="max-w-3xl"
									aria-describedby="Preview Image"
								>
									<DialogHeader>
										<DialogTitle>Preview Dokumen</DialogTitle>
									</DialogHeader>
									<div className="flex justify-center">
										<img
											src={uploadStatus.previewUrl}
											alt="Document preview"
											className="max-w-full max-h-[70vh] object-contain rounded-md"
										/>
									</div>
								</DialogContent>
							</Dialog>

							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={onRemove}
								className="text-red-600 border-red-200 hover:bg-red-50"
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}
	if (uploadStatus.status === "uploading") {
		return (
			<Card className="border-2 border-blue-200">
				<CardContent className="p-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
							<div>
								<p className="text-sm font-medium">Mengupload file...</p>
								<p className="text-xs text-muted-foreground">
									{uploadStatus.file?.name}
								</p>
							</div>
						</div>
						<span className="text-sm font-medium text-blue-600">
							{uploadProgress}%
						</span>
					</div>
					<Progress value={uploadProgress} className="mt-2" />
				</CardContent>
			</Card>
		);
	}
	return (
		<Card
			className={`border-2 border-dashed ${
				isDragOver ? "border-blue-400 bg-blue-50" : "border-muted-foreground/25"
			} transition-colors hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer`}
		>
			<CardContent className="p-6">
				<div
					className="flex flex-col items-center justify-center space-y-3 text-center"
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					<input
						id={id}
						name={name}
						ref={fileInputRef}
						type="file"
						accept={accept}
						onChange={handleFileInput}
						className="hidden"
						required={required}
					/>

					<label htmlFor={id} className="cursor-pointer">
						<div className="flex flex-col items-center justify-center space-y-3">
							<div className="p-3 bg-muted rounded-full">
								<Upload className="h-6 w-6 text-muted-foreground" />
							</div>

							<div className="space-y-1">
								<p className="text-sm font-medium">
									<span className="text-blue-600 hover:text-blue-700">
										Klik untuk upload atau drag and drop
									</span>
								</p>
								<p className="text-xs text-muted-foreground">
									{accept.split(",").join(", ")} (Maks. 2MB)
								</p>
								{required && (
									<p className="text-xs text-red-600 font-medium">
										* Dokumen wajib
									</p>
								)}
							</div>

							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => fileInputRef.current?.click()}
							>
								Pilih File
							</Button>
						</div>
					</label>
				</div>

				{uploadStatus.status === "error" && uploadStatus.error && (
					<Alert variant="destructive" className="mt-4 py-2">
						<AlertCircle className="h-4 w-4" />
						<AlertDescription className="text-sm">
							{uploadStatus.error}
						</AlertDescription>
					</Alert>
				)}
			</CardContent>
		</Card>
	);
}
