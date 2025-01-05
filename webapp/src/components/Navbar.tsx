'use client';

import { ModeToggle } from "./mode-toggle";
import { UserMenu } from "@/features/auth/components/UserMenu";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Link from "next/link";
import { Navbar as NavbarComponent, NavbarBrand, NavbarContent, NavbarItem } from "@/components/ui/navigation/navbar";

export function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <NavbarComponent
      fixed
      brand={
        <NavbarBrand>
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">FuelCare</span>
          </Link>
        </NavbarBrand>
      }
    >
      <NavbarContent>
        <div className="flex items-center space-x-6 text-sm font-medium">
          {isAuthenticated && (
            <>
              <NavbarItem>
                <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
                  Dashboard
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/vehicles" className="transition-colors hover:text-foreground/80">
                  Vehicles
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/fuel-logs" className="transition-colors hover:text-foreground/80">
                  Fuel Logs
                </Link>
              </NavbarItem>
            </>
          )}
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          </div>
          <div className="flex items-center space-x-2">
            {!isAuthenticated && (
              <NavbarItem>
                <Link
                  href="/login"
                  className="text-sm font-medium transition-colors hover:text-foreground/80"
                >
                  Sign In
                </Link>
              </NavbarItem>
            )}
            <NavbarItem>
              <ModeToggle />
            </NavbarItem>
            {isAuthenticated && (
              <NavbarItem>
                <UserMenu />
              </NavbarItem>
            )}
          </div>
        </div>
      </NavbarContent>
    </NavbarComponent>
  );
} 