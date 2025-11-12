import z from "zod";

export const LoginSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string("Masukan password"),
});
export type LoginSchema = z.infer<typeof LoginSchema>;
