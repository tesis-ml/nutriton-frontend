import { useNavigate } from 'react-router-dom';
import AuthService from '@/services/auth.service';
import useAuthStore from '@/stores/auth.store';

export const useLogout = () => {
    const navigate = useNavigate();
    const resetData = useAuthStore(state => state.resetData);

    const logout = () => {
        AuthService.logout();
        resetData();
        navigate('/login', { replace: true });
    };

    return { logout };
};