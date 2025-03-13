import CustomInput from "@/components/atoms/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRegister } from "@/hooks/query/useRegister";
import { registerSchema, RegisterSchema } from "@/schemas/register.schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";

export default function RegisterPage() {

    const { register, isLoading, isSuccess } = useRegister();

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema), defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (formData: RegisterSchema) => {
        register(formData);
        if (isSuccess)
            form.reset();
    }

    return (
        <div className="w-full">
            <div className="w-10/12 max-w-sm mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">

                        <CustomInput
                            name="first_name"
                            label="Nombre(s)"
                            control={form.control}
                        />

                        <CustomInput
                            name="last_name"
                            label="Apellido(s)"
                            control={form.control}
                        />

                        <CustomInput
                            name="email"
                            label="Email"
                            control={form.control}
                        />

                        <CustomInput
                            name="password"
                            label="Contraseña"
                            type="password"
                            control={form.control}
                        />

                        <CustomInput
                            name="confirmPassword"
                            label="Confirmar Contraseña"
                            type="password"
                            control={form.control}
                        />

                        <div className="grid gap-4 my-4">
                            <Button type="submit" className="w-full" loading={isLoading} > Registrarse </Button>
                        </div>

                    </form>

                </Form>

            </div>

        </div>
    )
}
