import { z } from 'zod';

export const UpdateProductSchema = z.object({
    brandId: z.string(),
    categoryId: z.string(),
    measurementUnitCode: z.string(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string(),
    active: z.boolean(),
})

export type UpdateProductType = z.infer<typeof UpdateProductSchema>