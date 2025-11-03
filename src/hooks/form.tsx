import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { lazy } from "react";

const TextField = lazy(() => import("@/components/form/TextField"));

export const { fieldContext, useFieldContext, formContext, useFormContext } =
	createFormHookContexts();
export const { useAppForm, withFieldGroup, withForm } = createFormHook({
	fieldComponents: {
		TextField,
	},
	formComponents: {},
	fieldContext,
	formContext,
});
