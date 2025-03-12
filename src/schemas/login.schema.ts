import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "El email no puede ir vacío. " })
        .email({ message: "El formato del email no es correto." }),
    password: z
        .string()
        .min(1, { message: "La contraseña no puede ir vacía. " })
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const defaultValues: LoginSchema = {
    email: "",
    password: "",
};
