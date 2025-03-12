// src/hooks/useLogin.ts
import { LoginSchema } from '@/schemas/login.schema';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AuthService from '@/services/auth.service';
import useAuthStore from '@/stores/auth.store';

export const useLogin = () => {
    const navigate = useNavigate();
    const setUser = useAuthStore(state => state.setUser);

    const mutation = useMutation({
        mutationFn: (credentials: LoginSchema) => AuthService.login(credentials),
        onSuccess: (user) => {
            setUser(user);
            navigate('/dashboard', { replace: true });
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