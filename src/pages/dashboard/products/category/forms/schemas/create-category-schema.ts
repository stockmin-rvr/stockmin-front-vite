import { z } from 'zod';

export const CreateCategorySchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string(),
    active: z.boolean(),
})

export type CreateCategoryType = z.infer<typeof CreateCategorySchema>