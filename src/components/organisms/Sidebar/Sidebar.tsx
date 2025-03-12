import Logo from '@/components/molecules/Logo';
import NavItem from '@/components/molecules/NavItem';
import { navigationConfig } from '@/config/nav';

import React from 'react';

const Sidebar: React.FC = () => {
    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Logo />
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navigationConfig.map((item) => (
                            <NavItem
                                key={item.to}
                                to={item.to}
                                icon={item.icon}
                                label={item.label}
                                variant="sidebar"
                            />
                        ))}
                    </nav>
                </div>
            </div>
        </div>

    );
};

export default Sidebar;