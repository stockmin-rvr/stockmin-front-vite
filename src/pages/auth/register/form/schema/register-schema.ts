import {z} from 'zod';

export const RegisterSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    lastname: z.string().min(1, "El apellido es requerido"),
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "La contraseña es requerida"),
    rePassword: z.string().min(1, "Confirma tu contraseña")
})
.refine((data) => data.password === data.rePassword, {
    message: "Las contraseñas no coinciden",
    path: ["rePassword"]
})

export type RegisterType = z.infer<typeof RegisterSchema>