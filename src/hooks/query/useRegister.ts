import { useMutation } from '@tanstack/react-query';
import AuthService from '@/services/auth.service';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { RegisterSchema } from '@/schemas/register.schema';

export const useRegister = () => {

    const mutation = useMutation({
        mutationFn: (credentials: RegisterSchema) => AuthService.register(credentials),
        onSuccess: (message) => {
            toast.success(message);
        },
        onError: (error) => {
            console.error(error);
            if (error instanceof AxiosError) {
                if (error.response?.status === 403) toast.error('Email ya en uso');
                else toast.error('Error al registrar el usuario');
            }
        }
    });

    return {
        register: mutation.mutate,
        registerAsync: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
    };
};