import MobileNavTrigger from '@/components/molecules/MobileNavTrigger';
import UserMenu from '@/components/molecules/UserMenu';
import { useLogout } from '@/hooks/useLogout.ts';
import useAuthStore from '@/stores/auth.store';
import React from 'react';

export const Header: React.FC = () => {
    const { user } = useAuthStore();
    const { logout } = useLogout();

    const { firstName, lastName } = user || { first_name: 'User', last_name: 'Name' };

    return (
        <header className="flex justify-between md:justify-end h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <MobileNavTrigger />
            <UserMenu onLogout={() => { logout() }} user={`${firstName} ${lastName}`} />
        </header>
    );
};

export default Header;