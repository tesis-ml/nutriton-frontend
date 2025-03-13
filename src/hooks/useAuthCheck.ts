import { useEffect, useState } from 'react';
import AuthService from '@/services/auth.service.ts';
import useAuthStore from '@/stores/auth.store.ts';

export const useAuthCheck = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useAuthStore(state => state.user);
    const setUser = useAuthStore(state => state.setUser);
    
    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            
            try {
                if (user) {
                    setIsLoading(false);
                    return;
                }
                
                if (AuthService.isAuthenticated()) {
                    const currentUser = await AuthService.getCurrentUser();
                    if (currentUser) {
                        setUser(currentUser);
                    }
                }
            } catch (error) {
                console.error('Error verificando autenticación:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        checkAuth();
    }, [user, setUser]);
    
    return {
        isAuthenticated: !!user,
        isLoading,
        user
    };
};