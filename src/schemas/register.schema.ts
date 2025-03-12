import { z } from "zod";

export const registerSchema = z.object({
    first_name: z
        .string()
        .min(1, { message: "El nombre no puede ir vacío. " }),
    last_name: z
        .string()
        .min(1, { message: "El apellido no puede ir vacío. " }),
    email: z
        .string()
        .min(1, { message: "El email no puede ir vacío. " })
        .email({ message: "El formato del email no es correto." }),
    password: z
        .string()
        .min(1, { message: "La contraseña no puede ir vacía. " })
        .regex(/^[a-zA-Z0-9]{6,30}$/, { message: "La contraseña debe tener al menos 6 caracteres y no puede contener caracteres especiales." }),
    confirmPassword: z
        .string()
        .min(1, { message: "La confirmación de la contraseña no puede estar vacía." }),
})
    .refine((data) => data.confirmPassword === data.password, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export type RegisterSchema = z.infer<typeof registerSchema>;
