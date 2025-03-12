import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const profileSchema = z.object({
    first_name: z.string().min(1, "El nombre es requerido"),
    last_name: z.string().min(1, "El apellido es requerido"),
    email: z.string().email("Email inválido")
});

type ProfileSchema = z.infer<typeof profileSchema>;

export default function UpdateProfileForm({ user }: { user: User }) {

    const [loading, setLoading] = useState(false);

    const form = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            email: user?.email || ""
        },
    });

    const onSubmit = async (data: ProfileSchema) => {
        setLoading(true);
        try {

            // TODO Aquí iría la lógica para actualizar el perfil

            toast.promise(
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("ok");
                        console.log("Perfil actualizado:", data);
                    }, 1000);
                }),
                {
                    loading: 'Guardando cambios...',
                    success: 'Perfil actualizado',
                    error: 'Error al actualizar el perfil'
                }
            )

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
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellido</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" disabled />
                            </FormControl>
                            <p className="text-xs font-medium text-gray-400 px-2">
                                Si deseas cambiar tu email, por favor contacta al soporte.
                            </p>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit" loading={loading}>
                    Actualizar información
                </Button>
            </form>
        </Form>
    )
}
