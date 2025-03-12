import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconProps {
    icon: LucideIcon;
    size?: number;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ icon: LucideIcon, size = 24, className }) => {
    return <LucideIcon size={size} className={className} />;
};

export default Icon;