import { z } from "zod";

export const RegisterBranchSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  nit: z.string().min(1, "El nit es requerido"),
  location: z.string().min(1, "La ubicación es requerida"),
  contacts: z.string().min(1, "Los números de contacto son requeridos"),
});

export type RegisterBranchType = z.infer<typeof RegisterBranchSchema>;