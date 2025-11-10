import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { lazy } from "react";

const TextField = lazy(() => import("@/components/form/TextField"));
const DatePickerField = lazy(() => import("@/components/form/DatePickerField"));
const SelectField = lazy(() => import("@/components/form/SelectField"));
const TextareaField = lazy(() => import("@/components/form/TextareaField"));
const FileField = lazy(() => import("@/components/form/FileField"));
const CheckboxField = lazy(() => import("@/components/form/CheckboxField"));

export const { fieldContext, useFieldContext, formContext, useFormContext } =
	createFormHookContexts();
export const { useAppForm, withFieldGroup, withForm } = createFormHook({
	fieldComponents: {
		TextField,
		DatePickerField,
		SelectField,
		TextareaField,
		FileField,
		CheckboxField,
	},
	formComponents: {},
	fieldContext,
	formContext,
});
