import z from "zod";

export const LoginSchema = z.object({
  UsernameOrEmail: z.string("Masukan username atau email"),
  password: z.string("Masukan password"),
});
export type LoginSchema = z.infer<typeof LoginSchema>;
