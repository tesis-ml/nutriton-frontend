import Icon from '@/components/atoms/Icon';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navigationConfig } from '@/config/nav';
import { Menu } from "lucide-react";
import { useState } from 'react';
import Logo from "../Logo";
import NavItem from '../NavItem';

const MobileNavTrigger: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                    <Icon icon={Menu} size={20} />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col" aria-describedby={undefined}>
                <div className="px-1 mt-6 mb-2">
                    <Logo />
                    <SheetTitle className='hidden'>Navigation</SheetTitle>
                </div>
                <nav className="grid gap-2">
                    {navigationConfig.map((item) => (
                        <NavItem
                            key={item.to}
                            to={item.to}
                            icon={item.icon}
                            label={item.label}
                            variant="sheet"
                            onClick={() => setIsOpen(false)}
                        />
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNavTrigger;
