'use client';

import { ModeToggle } from "@/components/mode-toggle";
import { UserMenu } from "@/features/auth/components/UserMenu";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "./navbar";

export function MainNavbar() {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Navbar fixed>
      <NavbarContent className="flex w-full justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button - always first */}
          <div className="block md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2.5 text-foreground hover:bg-accent hover:text-foreground/80"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo - always visible */}
          <NavbarBrand>
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold">FuelCare</span>
            </Link>
          </NavbarBrand>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
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
        </div>

        {/* Right side with theme toggle and profile */}
        <div className="flex items-center space-x-2">
          <NavbarItem>
            <ModeToggle />
          </NavbarItem>
          {isAuthenticated ? (
            <NavbarItem>
              <UserMenu />
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Link
                href="/login"
                className="text-sm font-medium transition-colors hover:text-foreground/80"
              >
                Sign In
              </Link>
            </NavbarItem>
          )}
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-[-1rem] w-[80%] bg-background border border-border rounded-br-lg shadow-lg md:hidden">
            <div className="flex flex-col space-y-4 p-4">
              {isAuthenticated && (
                <>
                  <NavbarItem className="w-full">
                    <Link href="/dashboard" className="block w-full transition-colors hover:text-foreground/80">
                      Dashboard
                    </Link>
                  </NavbarItem>
                  <NavbarItem className="w-full">
                    <Link href="/vehicles" className="block w-full transition-colors hover:text-foreground/80">
                      Vehicles
                    </Link>
                  </NavbarItem>
                  <NavbarItem className="w-full">
                    <Link href="/categories" className="block w-full transition-colors hover:text-foreground/80">
                      Categories
                    </Link>
                  </NavbarItem>
                  <NavbarItem className="w-full">
                    <Link href="/fuel-types" className="block w-full transition-colors hover:text-foreground/80">
                      Fuel Types
                    </Link>
                  </NavbarItem>
                  <NavbarItem className="w-full">
                    <Link href="/showcase" className="block w-full transition-colors hover:text-foreground/80">
                      Showcase
                    </Link>
                  </NavbarItem>
                </>
              )}
            </div>
          </div>
        )}
      </NavbarContent>
    </Navbar>
  );
} 