import CustomInput from "@/components/atoms/CustomInput";
import {Button} from "@/components/ui/button.tsx";
import {Form} from "@/components/ui/form.tsx";
import {useRegister} from "@/hooks/query/useRegister.ts";
import {registerSchema, RegisterSchema} from "@/schemas/register.schema.ts";
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from "react-hook-form";

export default function RegisterForm() {

    const {registerAsync, isLoading} = useRegister();

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
        try {
            await registerAsync(formData);
            form.reset(); // Si llegamos aquí, la operación fue exitosa
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="w-full">
            <div className="w-11/12 max-w-2xl mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        </div>

                        <CustomInput
                            name="email"
                            label="Email"
                            control={form.control}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="md:min-w-[200px]"
                                loading={isLoading}
                            >
                                Registrar
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
