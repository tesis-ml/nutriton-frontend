import Icon from '@/components/atoms/Icon';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CircleUser } from "lucide-react";
import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu: React.FC<{ onLogout: () => void, user: string }> = ({ onLogout, user }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
                <Icon icon={CircleUser} size={20} />
                <span className="sr-only">Toggle user menu</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>
                {user}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/profile">
                <DropdownMenuItem>Perfil</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className='rounded'>
                <button
                    onClick={onLogout}
                    className='w-full text-left text-destructive hover:text-destructive-foreground hover:bg-destructive/90 hover:bg-opacity-10'
                >
                    Cerrar sesión
                </button>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

export default UserMenu;