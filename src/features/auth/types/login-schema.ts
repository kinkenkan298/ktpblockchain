import z from "zod";

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
export type LoginSchema = z.infer<typeof LoginSchema>;
