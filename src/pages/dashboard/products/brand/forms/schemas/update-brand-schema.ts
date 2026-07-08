import { z } from 'zod';

export const UpdateBrandSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    origin: z.string(),
    active: z.boolean(),
})

export type UpdateBrandType = z.infer<typeof UpdateBrandSchema>