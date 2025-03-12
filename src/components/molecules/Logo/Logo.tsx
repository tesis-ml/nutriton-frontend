import Icon from '@/components/atoms/Icon';
import Text from '@/components/atoms/Text';
import { HandPlatter } from 'lucide-react';
import React from 'react';

const Logo: React.FC = () => {
    return (
        <span className="flex items-center gap-2 font-semibold">
            <Icon icon={HandPlatter} size={24} />
            <Text className="text-lg">Nutriton</Text>
        </span>
    );
};

export default Logo;