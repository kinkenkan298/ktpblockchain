import { useFieldContext } from "@/hooks/form";
import { useState, useMemo, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { format, parseISO, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Field, FieldError, FieldLabel, FieldDescription } from "../ui/field";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";

export interface DatePickerFieldProps {
  label: string;
  description?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
}

export default function DatePickerField({
  label,
  description,
  required = false,
  error,
  disabled,
  placeholder = "Pilih Tanggal",
}: DatePickerFieldProps) {
  const field = useFieldContext<string>();

  const isInvalid = useMemo(
    () => field.state.meta.isTouched && !field.state.meta.isValid,
    [field.state.meta.isTouched, field.state.meta.isValid]
  );

  const errorMessage = error || field.state.meta.errors?.[0]?.message;

  const parsedDate = useMemo(() => {
    if (!field.state.value) return undefined;
    try {
      const date = parseISO(field.state.value);
      return isValid(date) ? date : undefined;
    } catch {
      return undefined;
    }
  }, [field.state.value]);

  const [open, setOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    parsedDate
  );

  useEffect(() => {
    setSelectedDate(parsedDate);
  }, [parsedDate]);

  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      setSelectedDate(undefined);
      field.handleChange("");
      return;
    }

    setSelectedDate(date);
    const formattedDate = format(date, "yyyy-MM-dd");
    field.handleChange(formattedDate);
    setOpen(false);
  };

  const handleBlur = () => {
    field.handleBlur();
  };

  const isDisabled = disabled;

  return (
    <Field data-invalid={isInvalid} data-disabled={isDisabled}>
      <FieldLabel htmlFor={field.name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={isDisabled}
            onBlur={handleBlur}
            aria-invalid={isInvalid}
            aria-required={required}
            aria-describedby={cn(
              description && `${field.name}-description`,
              (isInvalid || errorMessage) && `${field.name}-error`
            )}
            data-empty={!selectedDate}
            className={cn(
              "data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal",
              isInvalid && "border-destructive"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              format(selectedDate, "yyyy-MM-dd")
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            captionLayout="dropdown"
            disabled={isDisabled}
            autoFocus
          />
        </PopoverContent>
      </Popover>
      {description && (
        <FieldDescription id={`${field.name}-description`}>
          {description}
        </FieldDescription>
      )}
      {(isInvalid || errorMessage) && (
        <FieldError id={`${field.name}-error`} errors={field.state.meta.errors}>
          {errorMessage}
        </FieldError>
      )}
    </Field>
  );
}
