import axiosClient from '@/config/axios.config';
import { LoginSchema } from '@/schemas/login.schema';
import { RegisterSchema } from '@/schemas/register.schema';

interface LoginResponse {
    access_token: string;
}

export const AuthService = {
    async login(credentials: LoginSchema): Promise<User> {
        const response = await axiosClient.instance.post<LoginResponse>('/auth/signin', credentials);

        axiosClient.setToken(response.data.access_token);

        localStorage.setItem('auth_token', response.data.access_token);

        const user = await this.getCurrentUser();

        return user!;
    },

    async register(credentials: RegisterSchema): Promise<string> {

        await axiosClient.instance.post('/auth/signup', {
            "fisrtName": credentials.first_name,
            "lastName": credentials.last_name,
            "email": credentials.email,
            "password": credentials.password
        });

        return "Usuario registrado correctamente";
    },

    async getCurrentUser(): Promise<User | null> {
        try {
            const token = localStorage.getItem('auth_token');

            if (!token) {
                return null;
            }

            axiosClient.setToken(token);

            const response = await axiosClient.instance.get<User>('/users/me');
            return response.data;
        } catch (error) {
            console.warn('Error al obtener el usuario actual', error);
            localStorage.removeItem('auth_token');
            return null;
        }
    },

    logout(): void {
        localStorage.removeItem('auth_token');
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('auth_token');
    }
};

export default AuthService;