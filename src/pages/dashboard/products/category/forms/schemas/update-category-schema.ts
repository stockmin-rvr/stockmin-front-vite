import { z } from 'zod';

export const UpdateCategorySchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string(),
    active: z.boolean(),
})

export type UpdateCategoryType = z.infer<typeof UpdateCategorySchema>