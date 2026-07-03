import { z } from "zod";

export const RequestResetPasswordSchema = z.object({
  email: z.string().email("Email inválido")
});

export type RequestResetPasswordType = z.infer<typeof RequestResetPasswordSchema>;