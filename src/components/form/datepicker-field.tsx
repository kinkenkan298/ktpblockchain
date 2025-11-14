import { useFieldContext } from "@/hooks/form";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Calendar } from "../ui/calendar";

export default function DatePickerField({ label }: { label: string }) {
	const field = useFieldContext<string>();
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

	const [open, setOpen] = useState<boolean>();
	const [date, setDate] = useState<Date>();

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel>{label}</FieldLabel>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant={"outline"}
						data-empty={!date}
						className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
					>
						<CalendarIcon />
						{field.state.value ? (
							format(field.state.value, "yyyy-MM-dd")
						) : (
							<span>Pilih Tanggal</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto  p-0">
					<Calendar
						mode={"single"}
						selected={date}
						captionLayout="dropdown"
						onSelect={(date) => {
							if (!date) return;
							setDate(date);
							field.handleChange(format(date, "yyyy-MM-dd"));
						}}
						autoFocus
					/>
				</PopoverContent>
			</Popover>
			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</Field>
	);
}
