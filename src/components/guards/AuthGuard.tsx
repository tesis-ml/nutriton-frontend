import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "@/views/pages/LoadingPage";
import useAuthStore from "@/stores/auth.store";
import AuthService from "@/services/auth.service";

export default function AuthGuard({ inverted = false }: { inverted?: boolean }) {
    const [loading, setLoading] = useState(true);
    const user = useAuthStore(state => state.user);
    const setUser = useAuthStore(state => state.setUser);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (user) {
                    setLoading(false);
                    return;
                }

                const isAuth = AuthService.isAuthenticated();

                if (isAuth) {
                    const currentUser = await AuthService.getCurrentUser();
                    if (currentUser) setUser(currentUser);
                }
            } catch (error) {
                console.error("Error verificando autenticación:", error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [user, setUser]);

    if (loading) {
        return <LoadingPage />;
    }

    return inverted
        ? (user ? <Navigate to="/dashboard" replace /> : <Outlet />)
        : (user ? <Outlet /> : <Navigate to="/login" replace />);
}