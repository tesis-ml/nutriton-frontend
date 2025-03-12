import CustomInput from "@/components/atoms/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { registerSchema, RegisterSchema } from "@/schemas/register.schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function RegisterPage() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        // Mock API call to simulate user registration
        const mockApiCall = (formData: RegisterSchema) => {
            return new Promise<{ data?: any, error?: any }>((resolve) => {
            setTimeout(() => {
                if (formData.email === "error@example.com") {
                resolve({ error: { message: "Mock error: Email already in use" } });
                } else {
                resolve({ data: { message: "Mock success: User registered" } });
                }
            }, 1000);
            });
        };

        const { data, error } = await mockApiCall(formData);

        if (error) {
            toast.error(error.message);
            console.log({ data, error });
            setLoading(false); return;
        }

        console.log(data);
        toast.success('Se ha enviado un correo de confirmación a tu email!');
        setLoading(false);
        setTimeout(() => navigate('/login'), 1000);
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
                            <Button type="submit" className="w-full" loading={loading} > Registrarse </Button>
                        </div>

                    </form>

                </Form>

            </div>

            <div className="mb-8 text-center text-sm">
                Ya tienes una cuenta?{' '}
                <Link to="/login" className="underline"> Inicia sesión </Link>
            </div>
        </div>
    )
}
