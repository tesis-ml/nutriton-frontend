import {LoginSchema} from '@/schemas/login.schema';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import AuthService from '@/services/auth.service';
import useAuthStore from '@/stores/auth.store';
import {toast} from 'sonner';
import {AxiosError} from 'axios';
import {foodAssignmentKeys} from "@/hooks/query/useAssignFood.ts";

export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const setUser = useAuthStore(state => state.setUser);

    const mutation = useMutation({
        mutationFn: (credentials: LoginSchema) => AuthService.login(credentials),
        onSuccess: async (user) => {
            setUser(user);
            navigate('/dashboard', {replace: true});
            await queryClient.invalidateQueries({queryKey: foodAssignmentKeys.main});
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