import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { lazy } from "react";

const TextField = lazy(() => import("@/components/form/text-field"));
const DatePickerField = lazy(
  () => import("@/components/form/datepicker-field")
);
const SelectField = lazy(() => import("@/components/form/select-field"));
const TextareaField = lazy(() => import("@/components/form/textarea-field"));
const FileField = lazy(() => import("@/components/form/file-field"));
const CheckboxField = lazy(() => import("@/components/form/checkbox-field"));

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
