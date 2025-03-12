import Icon from '@/components/atoms/Icon';
import Text from '@/components/atoms/Text';
import { LucideIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface NavItemProps {
    to: string;
    icon: LucideIcon;
    label: string;
    variant?: 'sidebar' | 'sheet';
    onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
    to,
    icon,
    label,
    variant = 'sidebar',
    onClick
}) => {
    const location = useLocation();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(location.pathname.startsWith(to));
    }, [location, to]);

    const baseClasses = "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary";
    const variantClasses = {
        sidebar: isActive
            ? "bg-muted/70 text-primary border-l-4 border-primary translate-x-1 shadow-md"
            : "text-muted-foreground",
        sheet: isActive
            ? "bg-muted text-primary"
            : "text-muted-foreground hover:text-foreground"
    };
    const sizeClasses = {
        sidebar: "text-base",
        sheet: "text-lg"
    };

    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={
                `${baseClasses} ${variantClasses[variant]} ${sizeClasses[variant]}`
            }
        >
            <Icon icon={icon} size={variant === 'sidebar' ? 16 : 20} />
            <Text>{label}</Text>
        </NavLink>
    );
};

export default NavItem;