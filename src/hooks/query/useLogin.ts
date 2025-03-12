// src/hooks/useLogin.ts
import { LoginSchema } from '@/schemas/login.schema';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AuthService from '@/services/auth.service';
import useAuthStore from '@/stores/auth.store';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useLogin = () => {
    const navigate = useNavigate();
    const setUser = useAuthStore(state => state.setUser);

    const mutation = useMutation({
        mutationFn: (credentials: LoginSchema) => AuthService.login(credentials),
        onSuccess: (user) => {
            setUser(user);
            navigate('/dashboard', { replace: true });
        },
        onError: (error) => {
            console.error(error);
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) toast.error('Credenciales incorrectas');
                else toast.error('Error al iniciar sesión');
            }
        }
    });

    return {
        login: mutation.mutate,
        loginAsync: mutation.mutateAsync,
        isLoading: mutation.isPending,
        error: mutation.error,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
        user: mutation.data,
    };
};