import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


const profileSchema = z.object({
    current_password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    new_password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").optional(),
    confirm_password: z.string().optional()
}).refine((data) => {
    if (data.new_password && data.new_password !== data.confirm_password) {
        return false;
    }
    return true;
}, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_password"],
});

type ProfileSchema = z.infer<typeof profileSchema>;


export default function UpdatePasswordForm({ user }: { user: User }) {

    const [loading, setLoading] = useState(false);

    const form = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            current_password: "",
            new_password: "",
            confirm_password: ""
        },
    });

    const onSubmit = async (data: ProfileSchema) => {
        setLoading(true);
        try {
            // TODO Aquí iría la lógica para actualizar el perfil
            console.log("Perfil actualizado:", data, user);
            toast.success("Perfil actualizado correctamente");
        } catch (error) {
            toast.error("Error al actualizar el perfil");
            console.warn(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="current_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña actual</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="new_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nueva contraseña</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmar nueva contraseña</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit" loading={loading}>
                    Cambiar contraseña
                </Button>
            </form>
        </Form>
    )
}
