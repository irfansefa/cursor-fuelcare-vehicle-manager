'use client';

import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/data-display/avatar";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/navigation/dropdown-menu";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const initials = user.fullName
    ? user.fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user.email[0].toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatarUrl || undefined} alt={user.fullName || user.email} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {user.avatarUrl ? <FiUser size={16} /> : initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.fullName || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer">
          <FiUser size={16} />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
          <FiSettings size={16} />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <FiLogOut size={16} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 