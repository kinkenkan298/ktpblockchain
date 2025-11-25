import * as React from "react";
import {
  AccountInfoSchema,
  AgreementSchema,
  DocumentUploadSchema,
  PersonalInfoSchema,
} from "./register-schema";
import z from "zod";

export { LoginSchema } from "./login-schema";
export {
  AccountInfoSchema,
  AgreementSchema,
  DocumentUploadSchema,
  FileSchema,
  PersonalInfoSchema,
} from "./register-schema";

export type StepFormData =
  | AccountInfoSchema
  | PersonalInfoSchema
  | DocumentUploadSchema
  | AgreementSchema;

export type AllFormFields = AccountInfoSchema &
  PersonalInfoSchema &
  DocumentUploadSchema &
  AgreementSchema;

export interface Steps {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export type RegisterFromSteps = {
  accountInfo: AccountInfoSchema;
  personalInfo: PersonalInfoSchema;
  documentUpload: DocumentUploadSchema;
  agreementData: AgreementSchema;
};

export const AllFormSchema = z.object({
  ...AccountInfoSchema.shape,
  ...PersonalInfoSchema.shape,
  ...DocumentUploadSchema.shape,
  ...AgreementSchema.shape,
});

export type AllFormSchema = z.infer<typeof AllFormSchema>;

export type AllFormInput = AccountInfoSchema &
  PersonalInfoSchema &
  DocumentUploadSchema &
  AgreementSchema;
