import { z } from 'zod';

export const CreateBrandSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    origin: z.string(),
    active: z.boolean().default(true),
})

export type CreateBrandType = z.infer<typeof CreateBrandSchema>