import {z} from 'zod';

export const UpdatePasswordSchema = z.object({
    password: z.string().min(1, "La contraseña es requerida"),
    rePassword: z.string().min(1, "Confirma tu contraseña")
})
.refine((data) => data.password === data.rePassword, {
    message: "Las contraseñas no coinciden",
    path: ["rePassword"]
})

export type UpdatePasswordType = z.infer<typeof UpdatePasswordSchema>