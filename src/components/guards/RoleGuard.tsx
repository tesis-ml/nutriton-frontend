// src/components/guards/RoleGuard.tsx
import useAuthStore from "@/stores/auth.store";
import ForbbidenPage from "@/views/pages/ForbbidenPage";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface RoleGuardProps {
    allowedRoles: Role[];
}

export default function RoleGuard({ allowedRoles }: RoleGuardProps) {
    const user = useAuthStore(state => state.user);
    const navigate = useNavigate();
    const [hasAccess, setHasAccess] = useState<boolean | null>(null);

    useEffect(() => {
        if (!user) {
            navigate("/login", { replace: true });
            return;
        }

        const hasAllowedRole = allowedRoles.includes(user.role as Role);

        setHasAccess(hasAllowedRole);
    }, [user, allowedRoles, navigate]);

    if (hasAccess === null) {
        return null;
    }

    if (!hasAccess) {
        return (
            <ForbbidenPage />
        );
    }

    return <Outlet />;
}