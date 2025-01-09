'use client';

import { ModeToggle } from "@/components/mode-toggle";
import { UserMenu } from "@/features/auth/components/UserMenu";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "./navbar";

export function MainNavbar() {
  const { isAuthenticated } = useAuth();

  return (
    <Navbar
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
                <Link href="/categories" className="transition-colors hover:text-foreground/80">
                  Categories
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/fuel-types" className="transition-colors hover:text-foreground/80">
                  Fuel Types
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/showcase" className="transition-colors hover:text-foreground/80">
                  Showcase
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
    </Navbar>
  );
} 