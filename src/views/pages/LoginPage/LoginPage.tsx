import CustomInput from "@/components/atoms/CustomInput";
import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useLogin } from "@/hooks/query/useLogin";
import { loginSchema, LoginSchema, defaultValues } from "@/schemas/login.schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const { login, isLoading } = useLogin();

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues
    });

    const onSubmit = (formData: LoginSchema) => {
        login(formData);
    };

    return (
        <>
            <div className="w-10/12 max-w-sm">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <CustomInput
                            name="email"
                            label="Email"
                            placeholder="ejemplo@correo.com"
                            control={form.control}
                        />
                        <CustomInput
                            name="password"
                            label={
                                <span className="flex justify-between w-full items-baseline">
                                    <span>Contraseña</span>
                                    <Link to="/forgot-password" className="text-xs underline"> ¿Olvidaste tu contraseña? </Link>
                                </span>
                            }
                            type="password"
                            placeholder="••••••••"
                            control={form.control}
                        />

                        <div className="grid gap-4 my-4">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                                loading={isLoading}
                            >
                                Iniciar sesión
                            </Button>

                        </div>
                    </form>
                </Form>
            </div>

            <div className="mb-2 text-center text-sm">
                ¿No tienes una cuenta?{' '}
                <Link to="/register" className={badgeVariants({ variant: "secondary" })}> Regístrate </Link>
            </div>
        </>
    );
}