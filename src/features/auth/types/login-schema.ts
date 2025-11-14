import z from "zod";

export const LoginSchema = z
  .object({
    UsernameOrEmail: z
      .string("Masukan username atau email")
      .min(1, { error: "Email atau username wajib di isi" }),
    password: z.string("Masukan password"),
  })
  .refine(
    (data) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.UsernameOrEmail) ||
      /^[a-zA-Z0-9_.]+$/.test(data.UsernameOrEmail),
    {
      message: "Provide a valid email or username",
      path: ["emailOrUsername"],
    }
  );
export type LoginSchema = z.infer<typeof LoginSchema>;
